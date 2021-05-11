import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinksPage} from "./layouts/LinksPage";
import {CreatePage} from "./layouts/CreatePage";
import {DetailPage} from "./layouts/DetailPage";
import {AuthPage} from "./layouts/AuthPage";
import MainPage from "./layouts/MainPage";
import TestPage1 from "./layouts/TestPage1";
import TestPage2 from "./layouts/TestPage2";


export const useRoutes = isAuthenticated => {
    // if (isAuthenticated) {
    //     return(
    //         <Switch>
    //             <Route path="/links">
    //                 <LinksPage />
    //             </Route>
    //             <Route path="/create">
    //                 <CreatePage />
    //             </Route>
    //             <Route path="/detail/:id">
    //                 <DetailPage />
    //             </Route>
    //             <Redirect to="/create"/>
    //         </Switch>
    //     );
    // }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/haklahana" exact>
                <MainPage />
            </Route>
            <Route path="/test1" exact>
                <TestPage1 />
            </Route>
            <Route path="/test2" exact>
                <TestPage2 />
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
