import React from 'react';
import {BrowserRouter as Router, useHistory, useLocation} from 'react-router-dom';
import {useRoutes} from "./config/routes";
import {useAuth, useWindowDimensions} from "./hooks";
import {AuthContext} from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loader} from "./components/Loader";
import "./assets/index.scss";
import Main from "./layouts/App/App";


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
                <div className='no-select' >
                    <Main />
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
