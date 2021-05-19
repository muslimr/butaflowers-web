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
import {Link, useLocation} from "react-router-dom";
// import {Carousel} from '3d-react-carousal';

import Carousel from 'react-spring-3d-carousel';
import { config } from "react-spring";
import uuidv4 from "uuid";




const MainPage = () => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        addData: {
            name: '',
            phone: '',
            email: '',
        },
        listData: [],
        count: 0,

        goToSlide: 0,
        offsetRadius: 1,
        // showNavigation: true,
        config: config.gentle
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


    let slides = [
        {
            key: 1,
            content: '/assets/zelen.png',
            title: 'Зелень',
        },
        {
            key: 2,
            content: '/assets/roza.png',
            title: 'Розы',
        },
        {
            key: 3,
            content: '/assets/xrizantema.png',
            title: 'Хризантемы',
        },
    ].map((slide, index) => {

        return {
        ...{
            key: index,
            content:
                <div style={{minWidth: 500, position: 'relative',}}>
                    <div className='d-flex' style={{
                        boxShadow: '0px 42px 84px #DDDCE0',
                        borderRadius: '150px 150px 67px 150px'
                    }}>
                        <div style={{minHeight: 300}}>
                            <img src={slide.content} className='category-image' style={{minHeight: 500, top: -100, left: -150, position: 'absolute'}}/>
                        </div>
                        <div className='d-flex w-100 flex-column align-items-end justify-content-end pb-4 pr-5'>
                            <div className='mb-0'
                                 style={{fontSize: 26, fontWeight: 500, lineHeight: 1, color: '#8E8E8E'}}
                            >
                                {slide.title}
                            </div>
                            <div style={{fontSize: 14, color: '#8E8E8E'}}>54 товара</div>
                        </div>
                    </div>
                </div>
        },
            onClick: () => setState({ goToSlide: index })
        }
    });


    return(
        <div className='d-flex p-4 justify-content-center' style={{minHeight: '100vh'}}>
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
                        <MyModal
                            label={'Получить прайс'}
                            saveBtnLabel={'Отправить'}
                            button={<button className='buta-btn'>Получить Прайс</button>}
                            contentStyle={{padding: 20, minWidth: 500}}
                            onSave={() => {}}
                        >
                            <MyInput label={'Имя'}
                                     value={state.addData.name}
                                     onChange={(e) => setState({...state, addData: {...state.addData, name: e.target.value}})}
                            />
                            <MyInput label={'Телефон'}
                                     value={state.addData.phone}
                                     containerStyle={{paddingTop: 15}}
                                     onChange={(e) => setState({...state, addData: {...state.addData, phone: e.target.value}})}
                            />
                            <MyInput label={'Email'}
                                     value={state.addData.email}
                                     containerStyle={{paddingTop: 15}}
                                     onChange={(e) => setState({...state, addData: {...state.addData, email: e.target.value}})}
                            />
                        </MyModal>
                        <form method="get" action={'https://www.instagram.com/butaflowers24/'}>
                            <button className='buta-btn' type="submit">Букеты</button>
                        </form>
                        <Link className='buta-btn' to={{pathname: `/catalog`}}>
                            Перейти в Каталог
                        </Link>
                    </div>
                </div>


                <Carousel slides={slides}
                          goToSlide={state.goToSlide}
                          offsetRadius={state.offsetRadius}
                          showNavigation={state.showNavigation}
                          animationConfig={state.config}
                />
            </div>
        </div>
    );
}

export default MainPage;

