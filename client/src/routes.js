import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MainPage from "./layouts/MainPage";
import CatalogPage from "./layouts/CatalogPage";
import PriceListPage from "./layouts/PriceListPage";
import DeliveryPage from "./layouts/DeliveryPage";
import ContactsPage from "./layouts/ContactsPage";
import AboutPage from "./layouts/AboutPage";
import CategoryPage from "./layouts/CategoryPage";
import PanelPage from "./layouts/Panel/PanelPage";


export const useRoutes = isAuthenticated => {

    const pageRoutes = [
        {path: '/', component: <MainPage />},
        {path: '/main', component: <MainPage />},
        {path: '/catalog', component: <CatalogPage />},
        {path: '/price_list', component: <PriceListPage />},
        {path: '/delivery', component: <DeliveryPage />},
        {path: '/contacts', component: <ContactsPage />},
        {path: '/about', component: <AboutPage />},
        {path: '/catalog/:category?', component: <CategoryPage />},

        {path: '/adminPanel', component: <PanelPage />},
    ];

    return(
        <Switch>
            {
                pageRoutes.map((page, index) =>
                    <Route key={index} path={page.path} exact>{page.component}</Route>
                )
            }

            <Redirect to="/"/>
        </Switch>
    );
}
