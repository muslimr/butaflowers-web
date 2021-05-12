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

    const pageRoutes = [
        {label: 'Главная', route: '/main'},
        {label: 'Каталог', route: '/catalog'},
        {label: 'Прайс-Лист', route: '/price_list'},
        {label: 'Доставка', route: '/delivery'},
        {label: 'Контакты', route: '/contacts'},
        {label: 'О нас', route: '/about'},
    ];


    return(
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <Router>
                <div className='no-select'>
                    <img src={`/assets/buta_flowers_logo.svg`} style={{position: 'absolute', width: 300, marginLeft: 80, marginTop: 50}}/>
                    <div className='d-flex justify-content-end col p-0' style={{position: 'absolute'}}>
                        <img src={`/assets/buta_large.svg`} style={{width: 620}}/>
                    </div>
                    {/*<div className='d-flex justify-content-center col p-0' style={{position: 'absolute', marginTop: 750, zIndex: -10}}>*/}
                    {/*    <img src={`/assets/buta_group.svg`} style={{width: 600}}/>*/}
                    {/*</div>*/}

                    {
                        dimensions.width <= 1200
                            ? <MySidebar pageRoutes={pageRoutes}/>
                            : <MyNavbar pageRoutes={pageRoutes}/>
                    }

                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
