import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import Container from '@material-ui/core/Container';
import {useHttp} from "../../../hooks";
import {AuthContext} from "../../../context/AuthContext";
import Button from "@material-ui/core/Button";
import MyTable from "../../../components/custom/MyTable";
import {Loader} from "../../../components/Loader";
import MyModal from "../../../components/modals/MyModal";
import MyInput from "../../../components/custom/MyInput";
import {Snackbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {addCategory, deleteCategory, getCategoriesList} from "../../../actions";
import Swal from 'sweetalert2';
import {Alerts} from "../../../plugins/Alerts";
import InlineLoader from "../../../components/custom/InlineLoader";


const PanelCategories = () => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        addData: {
            img: '',
            title: '',
            subtitle: '',
        },
        data: [],
        count: 0
    }

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, initialState);

    const {token} = useContext(AuthContext);

    const refresh = async () => {
        await getCategoriesList(state, setState);
    }

    useEffect(() => {
        refresh();
    }, []);


    const onSave = async () => {
        await addCategory(state, setState);
        await refresh();
    }


    return(
        <div className='overflow-auto p-4'
             style={{height: '100vh', backgroundColor: 'rgb(217 220 226)'}}
        >
            {state.loading && <InlineLoader style={{backgroundColor: 'rgba(255,255,255,0.8)'}}/>}

            <div className='d-flex align-items-center justify-content-end mb-3 mr-2'>
                <MyModal label={'Добавить Новую Категорию'}
                         buttonTitle={'Новая Категория'}
                         contentStyle={{minWidth: 500}}
                         onSave={onSave}
                >
                    <form onSubmit={onSave}>
                        <MyInput label={'Title'}
                                 value={state.addData.title}
                                 containerStyle={{paddingTop: 15}}
                                 onChange={(e) => setState({...state, addData: {...state.addData, title: e.target.value}})}
                        />
                        <MyInput label={'Subtitle'}
                                 value={state.addData.subtitle}
                                 containerStyle={{paddingTop: 15}}
                                 onChange={(e) => setState({...state, addData: {...state.addData, subtitle: e.target.value}})}
                        />
                    </form>
                </MyModal>
            </div>

            <div className='row col p-0 m-0'>
                {
                    state.data?.map((category, index) =>
                        <CategoryBox key={index} state={state} category={category} setState={setState} onClick={() => {}}/>
                    )
                }
            </div>
        </div>
    );
}

export default PanelCategories;



const CategoryBox = ({category, state, setState}) => {

    const deleteThisCategory = async () => {
        Alerts.askModal(
            async () => await deleteCategory(state, setState, category._id),
            () => {
            },
            {
                title: 'Точно хотите удалить ???',
                confirmButtonText: 'Да, точно !!',
                cancelButtonText: 'НЕТ, не удалять !!'
            }
        )
    }


    return(
        <div className='col-lg-6 p-2'>
            <div className='card p-3' style={{borderRadius: 10}}>
                <div className='d-flex'>
                    <div className='d-flex w-100 flex-column justify-content-between'>
                        <Link className='col' to={{pathname: `/adminPanel/category/${category._id}`}}>
                            <div className='mb-0' style={{fontSize: 20, fontWeight: 500, color: '#8E8E8E'}}>
                                {category.title}
                            </div>
                            <div style={{fontSize: 16, color: category.subtitle ? '#8E8E8E' : '#cdcdcd'}}>
                                {category.subtitle || 'нет в наличии'}
                            </div>
                        </Link>

                        <div className='d-flex'>
                            <MyModal
                                label={'Получить прайс'}
                                saveBtnLabel={'Отправить'}
                                button={
                                    <div className='d-flex'>
                                        <span className="material-icons md-24">edit</span>
                                        <div>Редактировать</div>
                                    </div>
                                }
                                contentStyle={{padding: 20, minWidth: 500}}
                                onSave={() => {}}
                            >
                                <MyInput label={'Телефон'}
                                    // value={state.addData.phone}
                                         containerStyle={{paddingTop: 15}}
                                    // onChange={(e) => setState({...state, addData: {...state.addData, phone: e.target.value}})}
                                />
                                <MyInput label={'Email'}
                                    // value={state.addData.email}
                                         containerStyle={{paddingTop: 15}}
                                    // onChange={(e) => setState({...state, addData: {...state.addData, email: e.target.value}})}
                                />

                                {/*<div style={{zIndex: 20}} onClick={() =>*/}
                                {/*    Alerts.askModal(() => deleteCategory(state, setState, category._id), () => {})*/}
                                {/*    // deleteCategory(state, setState, category._id)*/}
                                {/*}>*/}
                                {/*    <span className="material-icons md-24">delete</span>*/}
                                {/*</div>*/}
                            </MyModal>

                            <div
                                className='d-flex'
                                onClick={() =>
                                Alerts.askModal(() => deleteThisCategory(), () => {})
                                // deleteCategory(state, setState, category._id)
                            }>
                                <span className="material-icons md-24">delete</span>
                                <div>Удалить</div>
                            </div>
                        </div>

                    </div>

                    {/*<div>*/}
                    {/*    <img src={'/assets/xrizantema.png'} style={{height: 200}}/>*/}
                    {/*</div>*/}

                    <div>
                        <div className='d-flex align-items-center justify-content-center'
                             style={{width: 150, height: 150, borderRadius: 10, backgroundColor: '#d9d9d9'}}
                        >
                            <span className="material-icons" style={{fontSize: 100, color: '#fff'}}>photo</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

