import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinksPage} from "./layouts/LinksPage";
import {CreatePage} from "./layouts/CreatePage";
import {DetailPage} from "./layouts/DetailPage";
import {AuthPage} from "./layouts/AuthPage";
import {MainPage} from "./layouts/MainPage";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/links">
                    <LinksPage />
                </Route>
                <Route path="/create">
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create"/>
            </Switch>
        );
    }

    return(
        <Switch>
            <Route path="/" exact>
                {/*<MainPage />*/}
                <AuthPage />
            </Route>
            <Route path="/haklahana" exact>
                <AuthPage />
            </Route>
            <Route path="/links">
                <LinksPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    );
}
