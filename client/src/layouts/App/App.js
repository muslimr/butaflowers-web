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
import MyModal from "../../components/modals/MyModal";


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
                        {
                            dimensions.width < 768 &&
                            <div
                                className='d-flex justify-content-between align-items-center'
                                style={{
                                    padding: "0px 70px",
                                    zIndex: 100,
                                    width: '100%',
                                    position: 'fixed',
                                    height: 70,
                                    bottom: 0,
                                    color: '#fff',
                                    backgroundColor: '#00c6ab'
                                }}
                            >
                                <MyModal
                                    label={'Позвонить'}
                                    button={
                                        <div className="back" >
                                            <img src="/assets/phone.svg" alt='' />
                                        </div>
                                    }
                                    hideBtn={true}
                                    contentStyle={{padding: 20, minWidth: 400}}
                                    onClose={() => {}}
                                >
                                    <div className='d-flex flex-column'>
                                        <a href="tel:+789262628282" style={{color: '#00c6ab', fontSize: 20, fontWeight: 500, marginBottom: 20}}>8 (926) 262 82 82</a>
                                        <a href="tel:+784955179595" style={{color: '#00c6ab', fontSize: 20, fontWeight: 500,}}>8 (495) 517 95 95</a>
                                    </div>
                                </MyModal>
                                <div className="back" >
                                    <img src="/assets/location.svg" alt='' />
                                </div>
                            </div>
                        }

                        <div style={{width: '100%', zIndex: 100, position: "fixed"}}>
                            <div className="logo_" >
                                {
                                    dimensions.width > 1200 &&
                                    <img src={`/assets/logo_westflora.svg`} className="img_" />
                                }
                            </div>

                            {
                                dimensions.width <= 1200
                                    ? <MySidebar pageRoutes={pageRoutes}/>
                                    : <MyNavbar pageRoutes={pageRoutes}/>
                            }
                        </div>

                    </>
            }
        </div>
        </AuthContext.Provider>
    );
}

export default Main;
