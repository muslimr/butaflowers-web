import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinksPage} from "./layouts/LinksPage";
import {CreatePage} from "./layouts/CreatePage";
import {DetailPage} from "./layouts/DetailPage";
import {AuthPage} from "./layouts/AuthPage";
import MainPage from "./layouts/MainPage";
import TestPage1 from "./layouts/TestPage1";
import TestPage2 from "./layouts/TestPage2";
import CatalogPage from "./layouts/CatalogPage";
import PriceListPage from "./layouts/PriceListPage";
import DeliveryPage from "./layouts/DeliveryPage";
import ContactsPage from "./layouts/ContactsPage";
import AboutPage from "./layouts/AboutPage";


export const useRoutes = isAuthenticated => {

    const pageRoutes = [
        {path: '/', component: <MainPage />},
        {path: '/main', component: <MainPage />},
        {path: '/catalog', component: <CatalogPage />},
        {path: '/price_list', component: <PriceListPage />},
        {path: '/delivery', component: <DeliveryPage />},
        {path: '/contacts', component: <ContactsPage />},
        {path: '/about', component: <AboutPage />},
    ];

    return(
        <Switch>
            {
                pageRoutes.map((page, item) =>
                    <Route path={page.path} exact>{page.component}</Route>
                )
            }

            <Redirect to="/"/>
        </Switch>
    );
}
