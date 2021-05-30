import React from 'react';
import {useContext, useEffect, useState} from "react";
import {useHttp, useMessage} from "../../../hooks";
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";


const PanelLogin = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const history = useHistory();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        // window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        await axios.post('/api/auth/register', {...form})
            .catch(error => message(error))
            .then(response => console.log('RESP', response));
    }

    const loginHandler = async () => {
        await axios.post('/api/auth/login', {...form})
            .catch(error => message(error))
            .then(response => auth.login(response?.data?.token, response?.data?.userId))
            .then(() => history.push('/adminPanel/categories'))
    }


    return (
        <div className='overflow-auto p-4 d-flex align-items-center justify-content-center'
             style={{height: '100vh', backgroundColor: '#7744BD'}}
        >
            <div className="col-4">
                <div className="card blue darken-1 p-4">
                    <div className="card-content white-text d-flex flex-column align-items-center justify-content-center">
                        <img src={`/assets/buta_flowers_logo.svg`} style={{width: 230, marginBottom: 30}}/>

                        <form onSubmit={loginHandler}>
                            <TextField id="email"
                                       name="email"
                                       label="Логин"
                                       variant="outlined"
                                       className="col mb-3"
                                       value={form.email}
                                       onChange={changeHandler}
                            />
                            <TextField id="password"
                                       name="password"
                                       label="Пароль"
                                       variant="outlined"
                                       className="col mb-4"
                                       value={form.password}
                                       onChange={changeHandler}
                            />
                        </form>
                    </div>
                    <div className="card-action">
                        <Button variant="contained"
                                color="primary"
                                className='col'
                                style={{padding: 13}}
                                disabled={loading}
                                onClick={loginHandler}
                        >
                            Войти
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PanelLogin;
