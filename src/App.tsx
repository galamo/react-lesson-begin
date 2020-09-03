import React, { useState, useEffect } from 'react';
import './App.css';
import ImageComponent, { IImageProps } from './components/image';
import CustomHeader from './components/header';

import MovieList from './components/movie-list';
import { IMovie } from './components/movie';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import axios from "axios";
import { getAllByTestId } from '@testing-library/react';
import Filter from './components/filter';
import { StarColors } from "./components/rank"
import Configuration from './components/configuration';
// jsx element


const images: Array<any> = [
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGnMVTv0j0SVGZtdxSAh2aulvySNcgLHoqwg&usqp=CAU", height: 200, width: 300 },
    { src: "https://media.wired.com/photos/5c6750d23e8add2cdb91724f/125:94/w_2393,h_1800,c_limit/shark-551025353.jpg", height: 300, width: 500 },
    { src: "", height: 200, width: 300 }
]

// create function element
function App() {
    const initialMovies: Array<any> | null = []
    const initialDeletedMovies: Array<any> = []
    const [movies, setMovies] = useState(initialMovies)
    const [deletedMovies, setDeletedMovies] = useState(initialDeletedMovies)
    const [starsColor, setStarsColor] = useState(StarColors.secondary);
    const [alertConfig, setAlertConfig] = useState({ show: false, message: "" })
    // const [getter, setter] = useState(Initial State)
    const [isLoading, setLoader] = useState(true)


    async function getMoviesApi(searchValue: string = "") {
        setLoader(true)
        try {
            const moviesUrl = `http://www.omdbapi.com/?s=${searchValue}&apikey=4f7462e2&page=10`
            const { data } = await axios.get(moviesUrl);
            if (data.Response === "False") throw Error("No Data From Api")
            setMovies(data.Search)


        } catch ({ message }) {
            setAlertConfig({ show: true, message })
            //@ts-ignore
            setMovies([])
            clearErrorMessage()
        } finally {
            setTimeout(() => {
                setLoader(false)
            }, 2000);
        }
    }


    function clearErrorMessage() {
        setTimeout(() => {
            setAlertConfig({ show: false, message: "" })
        }, 2000);
    }
    useEffect(() => {
        //this code will run: cases:
        // on initial render
        // on any chnage in the array params
        getMoviesApi("scream")
    }, [starsColor])

    function clearMovies() {
        setMovies([])
    }

    function revert() {
        const deletedMoviesCopy = [...deletedMovies];
        if (!deletedMoviesCopy.length) return;
        const getLastRevertMovie = deletedMoviesCopy[0];
        deletedMoviesCopy.splice(0, 1)
        setMovies([...movies, getLastRevertMovie])
        setDeletedMovies([...deletedMoviesCopy])
    }

    function addMovie() {
        setMovies([...movies]) //example to show state - data[0] = from FORM
    }


    function deleteMovie(moovieId: string): void {
        const moviesCopy = [...movies]
        const [index, m] = getMoviesData()
        moviesCopy.splice(index, 1);
        setMovies(moviesCopy)
        setDeletedMovies([...deletedMovies, m])
        function getMoviesData(): Array<any> {
            const index = movies.findIndex(m => m.imdbID === moovieId);
            const movie = movies.find(m => m.imdbID === moovieId);
            return [index, movie]

        }
    }
    function filterOperationApi(value: string) {
        getMoviesApi(value)
    }
    function filterOperation(value: string) {
        if (!value) return setMovies(movies);
        const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(value))
        setMovies(filteredMovies)
    }

    const { show, message } = alertConfig;
    return <div className="container">
        <div>
            {show && <Alert key={1} variant={"danger"}>
                {message}
            </Alert>}
        </div>
        <Configuration setColorInGlobalState={setStarsColor} color={starsColor} />
        <Filter filterOperation={filterOperationApi} />
        <CustomHeader style={{ color: "green" }} text={"Movies"} />
        <div className="row">
            <Filter filterOperation={filterOperation} />
            <Button onClick={() => setMovies([])} > clear filter</Button>
        </div>
        <div className="row">
            <Button onClick={clearMovies} > clear Movies</Button>
            <Button onClick={addMovie} > Add movie</Button>
            <Button onClick={revert} > revert</Button>
        </div>
        {isLoading ? < Spinner animation="border" role="status"> </Spinner> : <MovieList noDataMessage="No Data for you firend" movies={moviesAdapter(movies)} configuration={{ starsColor }} />
        }
    </div >

    function moviesAdapter(movies: Array<any>): Array<IMovie> {
        return movies.map((movie: any) => {
            const { Title, Year, rank, Poster, imdbID, Type } = movie;
            return { deleteMovie, baseAdditionalInfoUrl: "http://imdb.com/title", title: Title, year: Year, poster: Poster, type: Type, id: imdbID, rate: rank }
        })
    }

}


interface IProps {
    images: Array<IImageProps>
}
function ImageList(props: IProps): any {
    const { images } = props
    return <div>
        {images.map((imgProps: any) => (<ImageComponent {...imgProps} url={imgProps.src} />))}
    </div>

}


function Details() {
    return <span> Details component </span>
}




// return <React.Fragment>
// <h1> aaa</h1>
// <h1> aaa</h1>
// </React.Fragment>


//also works
// function App2() {
//     return header
// }

export default App;
