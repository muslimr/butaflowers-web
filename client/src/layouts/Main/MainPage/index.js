import React, {useCallback, useContext, useEffect, useReducer} from 'react';
import {useHttp, useWindowDimensions} from "../../../hooks";
import {AuthContext} from "../../../context/AuthContext";
import MyModal from "../../../components/modals/MyModal";
import MyInput from "../../../components/custom/MyInput";
import {Link, useLocation} from "react-router-dom";
import Carousel from 'react-spring-3d-carousel';
import { config } from "react-spring";
import {getCategoriesList} from "../../../actions";
import {sendPriceList} from "../../../actions/nodemail";


const MainPage = () => {

    const [state, setState] = useReducer((prevState, newState) => {
            return {...prevState, ...newState}
        }, {
            loading: false,
            refreshing: false,
            success: false,
            error: false,
            dataToSend: {
                name: "",
                phone: "",
                email: "",
            },
            listData: [],
            count: 0,
            data: [],
            goToSlide: 0,
            offsetRadius: 1,
            config: config.gentle
        }
    );


    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const dimensions = useWindowDimensions();
    const {breakpoint} = useWindowDimensions();

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
                    <div className='d-flex' style={{boxShadow: '0px 42px 84px #DDDCE0', borderRadius: '150px 150px 67px 150px'}}>
                        <div className="images">
                            <img src={slide.content} className='category-image' />
                        </div>
                        <div className='d-flex w-100 flex-column align-items-end justify-content-end pb-5 pr-5'>
                            <div className='mb-0 title'>
                                {slide.title}
                            </div>
                        </div>
                    </div>
                </div>
        },
            onClick: () => setState({ goToSlide: index })
        }
    });


    return(
        <div className='d-flex p-4 justify-content-center' style={{minHeight: '100vh'}}>
            <div className="slogan_" style={{marginTop: dimensions.width <= 768 && 30}}>
                <div className='d-flex justify-content-center h1_' style={{color: '#00c6ab', fontWeight: '400'}}>ДОСТАВКА В ДЕНЬ ЗАКАЗА</div>
                <img src={`/assets/Butaflowers_main.png`}/>

                {
                    breakpoint === "sm"
                        ?
                        <div style={{
                            // width: "100%",
                            display: "flex",
                            position: "absolute",
                            justifyContent: "center",
                            alignItems: "center",
                            opacity: 0.5
                        }}>
                            <img src={`/assets/lotus.svg`} style={{width: 500}}/>
                        </div>
                        :
                        <div style={{
                            width: "100%",
                            display: "flex",
                            position: "absolute",
                            justifyContent: "flex-end",
                            opacity: 0.5
                        }}>
                            <img src={`/assets/lotus.svg`} style={{marginRight: 100, width: 300}}/>
                            <img src={`/assets/lotus.svg`} style={{width: 500}}/>
                        </div>
                }

                <div className='d-flex justify-content-center align-items-center flex-column' style={{zIndex: 5}}>
                    <div className='q_buttons' >
                        <MyModal
                            label={'Получить прайс'}
                            saveBtnLabel={'Отправить'}
                            button={<button className='buta-btn text-center'>Получить Прайс</button>}
                            contentStyle={{padding: 20, width: '80vw', maxWidth: 500}}
                            onSave={() => sendPriceList(state, setState)}
                            onClose={() => setState({...state, dataToSend: {...state.dataToSend, name: '', phone: '', email: ''}})}
                        >
                            <MyInput label={'Имя'}
                                     value={state.dataToSend.name}
                                     onChange={(e) => setState({...state, dataToSend: {...state.dataToSend, name: e.target.value}})}
                            />
                            <MyInput label={'Телефон'}
                                     value={state.dataToSend.phone}
                                     containerStyle={{paddingTop: 15}}
                                     onChange={(e) => setState({...state, dataToSend: {...state.dataToSend, phone: e.target.value}})}
                            />
                            <MyInput label={'Email'}
                                     value={state.dataToSend.email}
                                     containerStyle={{paddingTop: 15}}
                                     onChange={(e) => setState({...state, dataToSend: {...state.dataToSend, email: e.target.value}})}
                            />
                        </MyModal>

                        {
                            breakpoint === "sm"
                                ?
                                <a href="instagram://user?username=westfloraexport">
                                    <button className='buta-btn' type="submit">Букеты</button>
                                </a>
                                :
                                <form method="get" action={'https://www.instagram.com/westfloraexport/'}>
                                    <button className='buta-btn' type="submit">Букеты</button>
                                </form>
                        }

                        <Link className='buta-btn text-center' to={{pathname: `/catalog`}}>
                            Перейти в Каталог
                        </Link>
                    </div>
                </div>

                <div className='carousel_' style={{marginTop: 300}}>
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

