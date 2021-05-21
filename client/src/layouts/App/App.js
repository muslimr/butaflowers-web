import React from 'react';
import {BrowserRouter as Router, useHistory, useLocation} from 'react-router-dom';
import {useAuth, useWindowDimensions} from "../../hooks";
import 'bootstrap/dist/css/bootstrap.min.css';
import MySidebar from "../../components/core/MySidebar";
import MyNavbar from "../../components/core/MyNavbar";
import "../../assets/index.scss";


function Main() {
    const dimensions = useWindowDimensions();

    const pageRoutes = [
        {label: 'Главная', route: '/main'},
        {label: 'Каталог', route: '/catalog'},
        {label: 'Прайс-Лист', route: '/price_list'},
        {label: 'Доставка', route: '/delivery'},
        {label: 'Контакты', route: '/contacts'},
        {label: 'О нас', route: '/about'},
    ];

    let location = useLocation();


    return(
        <div className='no-select'>
            {
                location.pathname.split('/')[1] !== 'adminPanel' &&
                <>
                    <img src={`/assets/buta_flowers_logo.svg`} style={{position: 'absolute', width: 300, marginLeft: 80, marginTop: 50}}/>
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
    );
}

export default Main;
