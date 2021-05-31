import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MainPage from "../layouts/Main/MainPage";
import PriceListPage from "../layouts/Main/PriceListPage";
import DeliveryPage from "../layouts/Main/DeliveryPage";
import ContactsPage from "../layouts/Main/ContactsPage";
import AboutPage from "../layouts/Main/AboutPage";
import PanelCategories from "../layouts/Panel/Categories";
import PanelSubcategories from "../layouts/Panel/Subategories";
import PanelArticles from "../layouts/Panel/Articles";
import PanelLogin from "../layouts/Panel/Login";
import CategoriesPage from "../layouts/Main/CategoriesPage";
import SubcategoriesPage from "../layouts/Main/SubcategoriesPage";
import ArticlesPage from "../layouts/Main/ArticlesPage";
import Article from "../layouts/Main/Article";


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
