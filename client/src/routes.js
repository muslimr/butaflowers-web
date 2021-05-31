import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MainPage from "./layouts/MainPage";
import PriceListPage from "./layouts/PriceListPage";
import DeliveryPage from "./layouts/DeliveryPage";
import ContactsPage from "./layouts/ContactsPage";
import AboutPage from "./layouts/AboutPage";
import PanelCategories from "./layouts/Panel/Categories";
import PanelSubcategories from "./layouts/Panel/Subategories";
import PanelArticles from "./layouts/Panel/Articles";
import PanelLogin from "./layouts/Panel/Login";
import CategoriesPage from "./layouts/CategoriesPage";
import SubcategoriesPage from "./layouts/SubcategoriesPage";
import ArticlesPage from "./layouts/ArticlesPage";
import Article from "./layouts/Article";


export const useRoutes = isAuthenticated => {

    const pageRoutes = [
        {path: '/', component: <MainPage />},
        {path: '/main', component: <MainPage />},
        {path: '/catalog', component: <CategoriesPage />},
        {path: '/price_list', component: <PriceListPage />},
        {path: '/delivery', component: <DeliveryPage />},
        {path: '/contacts', component: <ContactsPage />},
        {path: '/about', component: <AboutPage />},
        {path: '/catalog/category/:categoryId?', component: <SubcategoriesPage />},
        {path: '/catalog/category/:categoryId?/subCategory/:subCategoryId?', component: <ArticlesPage />},
        {path: '/catalog/category/:categoryId?/subCategory/:subCategoryId?/article/:articleId?', component: <Article />},

        {path: '/adminPanel/categories', component: isAuthenticated && <PanelCategories />},
        {path: '/adminPanel/category/:categoryId?', component: !!isAuthenticated && <PanelSubcategories />},
        {path: '/adminPanel/category/:categoryId?/subCategory/:subCategoryId?', component: !!isAuthenticated && <PanelArticles />},
    ];


    const authRoutes = [
        {path: '/adminPanel', component: <PanelLogin />},
    ];


    return(
        <Switch>
            {
                !isAuthenticated &&
                authRoutes.map((page, index) =>
                    <Route key={index} path={page.path} exact>{page.component}</Route>
                )
            }
            {
                pageRoutes.map((page, index) =>
                    <Route key={index} path={page.path} exact>{page.component}</Route>
                )
            }
            <Redirect to="/"/>
        </Switch>
    );
}
