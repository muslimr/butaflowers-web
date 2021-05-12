import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import Container from '@material-ui/core/Container';
import {useHttp} from "../../hooks";
import {AuthContext} from "../../context/AuthContext";
import Button from "@material-ui/core/Button";
import MyTable from "../../components/custom/MyTable";
import {Loader} from "../../components/Loader";
import MyModal from "../../components/modals/MyModal";
import MyInput from "../../components/custom/MyInput";
import {Snackbar} from "@material-ui/core";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";


const MainPage = () => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        addData: {
            img: '',
            title: '',
        },
        listData: [],
        count: 0
    }

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, initialState);


    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const getCategories = useCallback( async () => {
        try {
            const fetched = await request('api/category', "GET", null, {});
            setState({...state, listData: fetched})
        } catch (e) {}
    }, [token, request]);


    useEffect(() => {
        getCategories();
    }, [getCategories]);


    const addCategory = async (state, setState) => {
        try {
            await request('/api/category/add', 'POST', {data: state.addData}, {});
        } catch (e) {

        }
    }

    const editCategory = async (state, setState) => {
        try {
            await request('/api/category/add', 'POST', {data: state.addData}, {});
        } catch (e) {

        }
    }

    const deleteCategory = async (state, setState) => {
        try {
            await request('/api/category/add', 'POST', {data: state.addData}, {});
        } catch (e) {

        }
    }


    return(
        <div className='d-flex p-4 justify-content-center' style={{height: '100vh'}}>
            <div style={{marginTop: 120}}>
                <div className='d-flex justify-content-center' style={{fontSize: 35, fontWeight: 300, color: '#776490'}}>
                    ДОСТАВКА В ДЕНЬ ЗАКАЗА
                </div>
                <img src={`/assets/Butaflowers_main.png`} style={{width: '86vw'}}/>
                <div className='nums-box'>
                    <div className='mr-4'>8 (926) 262 82 82</div>
                    <div className='ml-4'>8 (495) 517 95 95</div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='d-flex justify-content-center col p-0' style={{position: 'absolute', zIndex: -10}}>
                        <img src={`/assets/buta_group.svg`} style={{width: 600}}/>
                    </div>
                    <div className='d-flex py-5'>
                        <button className='buta-btn'>Получить Прайс</button>
                        <form method="get" action={'https://www.instagram.com/butaflowers24/'}>
                            <button className='buta-btn' type="submit">Магазин</button>
                        </form>
                        <button className='buta-btn'>Перейти в Каталог</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

