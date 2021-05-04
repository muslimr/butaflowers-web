import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp, useMessage} from "../hooks";
import {AuthContext} from "../context/AuthContext";


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/test`, 'GET', null, {
                // Authorization: `Bearer ${token}`
            });
            // setLink(fetched);
        } catch (e) {}
    }, [request]);


    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        getLink();
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }



    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {}
    }


    return(
        <div className='row center' style={{display: 'flex', alignItems: 'center', height: '100vh'}}>
            <div className='col s10 offset-s1 l4 offset-l4 center'>
                {/*<div style={{color: '#fff'}}>data</div>*/}
                <div className="card z-depth-4" style={{borderRadius: 15}}>
                    <div className="card-image waves-effect waves-block waves-light activator" style={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ultrafix_bg.png`} className='activator' style={{marginBottom: 20}}/>
                    </div>
                    <div className="card-content activator">
                        <div className='activator' style={{fontSize: 20}}>LOGIN</div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">
                            <i className="material-icons right">close</i>
                        </span>

                        <div className="input-field">
                            <input placeholder="Введите email"
                                   id="email"
                                   type="text"
                                   name="email"
                                   className="yellow-input"
                                   onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Введите пароль"
                                   id="password"
                                   type="password"
                                   name="password"
                                   className="yellow-input"
                                   onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button className='btn yellow darken-4'
                                style={{minHeight: 50, minWidth: '100%'}}
                                disabled={loading}
                                onClick={loginHandler}
                        >
                            Updated aaaaaa
                        </button>
                        <div className="card-action">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
