import React from 'react';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MoviesPage from './components/pages/movies-page';
import AboutPage from './components/pages/about-page';
import ConfigurationPage from './components/pages/configuration-page';
import FavoritePage from './components/pages/favorite-page';
import SearchResultPage from './components/pages/search-result-page';

import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

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
                {/* <Route path="/home" component={MoviesPage} />
                    <Route path="/configuration" component={ConfigurationPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/ugly">
                        <div> The Ugly way </div>
                    </Route> */}
            </Switch>
        </div>
    </Router>
}

function RoutesConfiguration(props: any) {
    return props.routes.map((route: any) => <Route {...route} />)
}

interface IRoute {
    component: any,
    path: string,
    name: string
}






function NavBarApp() {
    return (<Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movies Api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {Routes.map((route) => {
                    const { path, name } = route;
                    return <Link to={path}> {name} </Link>
                })}
                {/* <Link to="/home"> Home </Link>
                <Link to="/configuration"> Configuration </Link>
                <Link to="/about"> About </Link>
                <Link to="/ugly"> ugly </Link> */}
            </Nav>
        </Navbar.Collapse>
    </Navbar>)
}


export default App;
