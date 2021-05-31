import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, useHistory, useLocation} from 'react-router-dom';
import {useAuth, useWindowDimensions} from "../../hooks";
import 'bootstrap/dist/css/bootstrap.min.css';
import MySidebar from "../../components/core/MySidebar";
import MyNavbar from "../../components/core/MyNavbar";
import "../../assets/index.scss";
import {AuthContext} from "../../context/AuthContext";
import {useRoutes} from "../../config/routes";
import MyStaticSidebar from "../../components/core/MyStaticSidebar";


function Main() {
    const dimensions = useWindowDimensions();
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token;
    const [sidebar, setSidebar] = useState(false);

    // const routes = useRoutes(isAuthenticated)

    useEffect(() => {
        setSidebar(isAuthenticated)
    }, [isAuthenticated])

    const pageRoutes = [
        {label: 'Главная', route: '/main'},
        {label: 'Каталог', route: '/catalog'},
        {label: 'Прайс-Лист', route: '/price_list'},
        {label: 'Доставка', route: '/delivery'},
        {label: 'Контакты', route: '/contacts'},
        {label: 'О нас', route: '/about'},
    ];


    const panelRoutes = [
        {label: 'Каталог', route: '/adminPanel/categories'},
        {label: 'Прайс-Лист', route: '/adminPanel/price_list'},
        {label: 'Доставка', route: '/adminPanel/delivery'},
        {label: 'Контакты', route: '/adminPanel/contacts'},
        {label: 'О нас', route: '/adminPanel/about'},
    ];


    let location = useLocation();


    return(
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
        <div className='no-select'>
            {
                location.pathname.split('/')[1] === 'adminPanel'
                    ?
                    <>
                        {
                            location.pathname.split('/').length > 2 &&
                            <MyStaticSidebar pageRoutes={panelRoutes}/>
                        }
                    </>

                    :
                    <>
                        <div className='d-flex justify-content-start'>
                            <div className='nums-box justify-content-between' style={{marginLeft: 40, position: 'absolute'}}>
                                <div>8 (926) 262 82 82</div>
                                <div>8 (495) 517 95 95</div>
                            </div>
                        </div>
                        <img src={`/assets/buta_flowers_logo.svg`} style={{position: 'absolute', width: 300, marginLeft: 80, marginTop: 70}}/>
                        <div className='d-flex justify-content-end col p-0' style={{position: 'absolute'}}>
                            <img src={`/assets/buta_large.svg`} style={{width: 620}}/>
                        </div>
                        {
                            dimensions.width <= 1200
                                ? <MySidebar pageRoutes={pageRoutes}/>
                                : <MyNavbar pageRoutes={pageRoutes}/>
                        }
                    </>
            }
        </div>
        </AuthContext.Provider>
    );
}

export default Main;
