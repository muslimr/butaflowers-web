import React, {useContext, useEffect, useState} from 'react';
import {useHttp, useMessage} from "../hooks";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";


export const MainPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);



    return(
        <div className='row center' style={{display: 'flex', alignItems: 'center', height: '100vh'}}>
            <div className='col s6 offset-s3 center'>
                <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} className='animated-logo'/>
                <div style={{fontSize: 22, color: '#003168', marginTop: 100}} onClick={() => history.push(`/haklahana`)}>COMING SOON!</div>
            </div>
        </div>
    );
}
