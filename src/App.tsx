import React, { useEffect, useState } from 'react';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MoviesPage from './components/pages/movies-page';
import AboutPage from './components/pages/about-page';
import ConfigurationPage from './components/pages/configuration-page';
import FavoritePage from './components/pages/favorite-page';
import SearchResultPage from './components/pages/search-result-page';
import MoviePage from './components/pages/movie-page';
import axios from "axios"
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

// jsx element


const Routes: Array<IRoute> = [{ component: MoviesPage, path: "/home", name: "Movies", isVisible: true },
{ component: ConfigurationPage, path: "/configuration", name: "configuration", isVisible: true },
{ component: AboutPage, path: "/about", name: "about", isVisible: true },
{ component: FavoritePage, path: "/favorites", name: "favorites", isVisible: true },
{ component: SearchResultPage, path: "/search-result", name: "Search Result", isVisible: true },
{ component: MoviePage, path: "/movie/:movieId", name: "movie", isVisible: false }
];
// create function element
function App() {
    return <Router>
        <div className="container">
            <NavBarApp />
            <Switch>
                <RoutesConfiguration routes={Routes} />
            </Switch>
        </div>
    </Router>
}

interface IRoute {
    component: any,
    path: string,
    name: string,
    isVisible: boolean
}
function RoutesConfiguration(props: { routes: Array<IRoute> }) {
    return <>{props.routes.map((route: IRoute) => <Route {...route} />)} </>
}




// let a = "";
// function Mistake() {
//     console.log(user.name.last)
// }

// Mistake();
// a = { name: { last: "Roy" } };
// Mistake();


function NavBarApp() {

    const [userDetails, setUserDetails] = useState(null)
    const [flag, setFlag] = useState(null)

    async function getUserDetailsApi() {
        try {
            const { data } = await axios.get("https://randomuser.me/api/?results=1")
            const user = data.results[0]
            setUserDetails(user)
            const res = await axios.get(`https://restcountries.eu/rest/v2/name/${user.location.country}`)
            const country = res.data[0];
            setFlag(country.flag);
        } catch{
            // alert no details
        } finally {
            // cancel loader
        }
    }
    useEffect(() => {
        getUserDetailsApi()
    }, [])

    // if (!userDetails) return null
    return (<Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movies Api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {Routes.filter((route) => route.isVisible).map((route: any) => {
                    const { path, name } = route;
                    return <Link to={path}> {name} </Link>
                })}
            </Nav>
        </Navbar.Collapse>

        {userDetails ? <UserDetails user={userDetails} /> : < Spinner animation="border" role="status"> </Spinner>}
        {flag ? <Flagush f={flag} /> : < Spinner animation="border" role="status"> </Spinner>}
    </Navbar>)
}

function UserDetails(props: any) {
    return <div> {props?.user?.name?.last} </div>
}

function Flagush(props: any) {
    return <img src={props.f} height="50" width="50" />
}

export default App;
