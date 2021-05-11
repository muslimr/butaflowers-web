import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";
import {useAuth, useWindowDimensions} from "./hooks";
import {AuthContext} from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loader} from "./components/Loader";
import MySidebar from "./components/core/MySidebar";
import MyNavbar from "./components/core/MyNavbar";
import "./assets/index.scss";


function App() {
    const {token, login, logout, userId, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    const dimensions = useWindowDimensions();

    if (!ready) {
        return <Loader />
    }

    return(
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <Router>
                {/*{dimensions.width <= 1200 ? <MySidebar/> : <MyNavbar/>}*/}
                {routes}
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
