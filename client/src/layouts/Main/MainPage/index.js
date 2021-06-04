import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import {useHttp} from "../../../hooks";
import {AuthContext} from "../../../context/AuthContext";
import MyModal from "../../../components/modals/MyModal";
import MyInput from "../../../components/custom/MyInput";
import {Link, useLocation} from "react-router-dom";
import Carousel from 'react-spring-3d-carousel';
import { config } from "react-spring";
import {getCategoriesList} from "../../../actions";




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
        data: [],
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


    useEffect(() => {
        getCategoriesList(state, setState);
    }, []);


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


    // [
    //     {
    //         key: 1,
    //         content: '/assets/zelen.png',
    //         title: 'Зелень',
    //     },
    //     {
    //         key: 2,
    //         content: '/assets/roza.png',
    //         title: 'Розы',
    //     },
    //     {
    //         key: 3,
    //         content: '/assets/xrizantema.png',
    //         title: 'Хризантемы',
    //     },
    // ]

    let slides =
        // state.data
    [
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
                <div className="c__item">
                    <div className='d-flex' style={{
                        boxShadow: '0px 42px 84px #DDDCE0',
                        borderRadius: '150px 150px 67px 150px'
                    }}>
                        <div className="images">
                            <img src={slide.content} className='category-image' />
                        </div>
                        <div className='d-flex w-100 flex-column align-items-end justify-content-end pb-5 pr-5'>
                            <div className='mb-0 title'>
                                {slide.title}
                            </div>
                            {/*<div style={{fontSize: 14, color: '#8E8E8E'}}>54 товара</div>*/}
                        </div>
                    </div>
                </div>
        },
            onClick: () => setState({ goToSlide: index })
        }
    });


    return(
        <div className='d-flex p-4 justify-content-center' style={{minHeight: '100vh'}}>
            <div className="slogan_">
                <div className='d-flex justify-content-center h1_'>
                    ДОСТАВКА В ДЕНЬ ЗАКАЗА
                </div>

                <img src={`/assets/Butaflowers_main.png`} />

                {/*<div className='nums-box'>*/}
                {/*    <div className='mr-4'>8 (926) 262 82 82</div>*/}
                {/*    <div className='ml-4'>8 (495) 517 95 95</div>*/}
                {/*</div>*/}

                <div className='d-flex justify-content-center'>
                    <div className='d-flex justify-content-center col p-0' style={{position: 'absolute', zIndex: -10, overflow:'hidden'}}>
                        <img src={`/assets/buta_group.svg`} style={{width: 600}}/>
                    </div>
                    <div className='q_buttons' >
                        <MyModal
                            label={'Получить прайс'}
                            saveBtnLabel={'Отправить'}
                            button={<button className='buta-btn text-center'>Получить Прайс</button>}
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
                        <Link className='buta-btn text-center' to={{pathname: `/catalog`}}>
                            Перейти в Каталог
                        </Link>
                    </div>
                </div>


                <div className='carousel_' >
                    <Carousel slides={slides}
                              goToSlide={state.goToSlide}
                              offsetRadius={state.offsetRadius}
                              showNavigation={state.showNavigation}
                              animationConfig={state.config}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPage;

