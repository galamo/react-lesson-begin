import React, { useEffect, useState } from 'react';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MoviesPage from './components/pages/movies-page';
import AboutPage from './components/pages/about-page';
import ConfigurationPage from './components/pages/configuration-page';
import FavoritePage from './components/pages/favorite-page';
import SearchResultPage from './components/pages/search-result-page';
import axios from "axios"
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

// jsx element


const Routes: Array<IRoute> = [{ component: MoviesPage, path: "/home", name: "Movies" },
{ component: ConfigurationPage, path: "/configuration", name: "configuration" },
{ component: AboutPage, path: "/about", name: "about" },
{ component: FavoritePage, path: "/favorites", name: "favorites" },
{ component: SearchResultPage, path: "/search-result", name: "Search Result" }
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
    name: string
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

    async function getUserApi() {
        const { data } = await axios.get("https://randomuser.me/api/?results=1")
        const user = data.results[0]
        setUserDetails(user)
    }


    useEffect(() => {
        getUserApi()
    }, [])

    // if (!userDetails) return null
    return (<Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movies Api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {Routes.map((route) => {
                    const { path, name } = route;
                    return <Link to={path}> {name} </Link>
                })}
            </Nav>
        </Navbar.Collapse>

        {userDetails ? <UserDetails user={userDetails} /> : < Spinner animation="border" role="status"> </Spinner>}
    </Navbar>)
}

function UserDetails(props: any) {
    return <div> {props?.user?.name?.last} </div>
}

export default App;
