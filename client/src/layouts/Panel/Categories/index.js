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
import {addCategory, deleteCategory, editCategory, getCategoriesList, getCategoryInfo} from "../../../actions";
import Swal from 'sweetalert2';
import {Alerts} from "../../../plugins/Alerts";
import InlineLoader from "../../../components/custom/InlineLoader";


const PanelCategories = () => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        id: '',
        addData: {
            img: '',
            title: '',
            subtitle: '',
            description: '',
        },
        data: [],
        category_info: false,
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

    useEffect(() => {
        getCategoryInfo(state, setState)
    }, [state.id]);


    const onSave = async () => {
        await addCategory(state, setState);
        refresh();
    }


    return(
        <div className='overflow-auto p-4'
             style={{height: '100vh', backgroundColor: 'rgb(217 220 226)'}}
        >
            {state.loading && <InlineLoader style={{backgroundColor: 'rgba(255,255,255,0.8)'}}/>}

            <div className='d-flex align-items-center justify-content-end mb-3 mr-2'>
                <MyModal label={'Добавить Новую Категорию'}
                         buttonTitle={'Новая Категория'}
                         contentStyle={{padding: 25, minWidth: 500}}
                         onSave={onSave}
                >
                    <form onSubmit={onSave}>
                        <MyInput label={'Название'}
                                 value={state.addData.title}
                                 containerStyle={{paddingTop: 5}}
                                 onChange={(e) => setState({...state, addData: {...state.addData, title: e.target.value}})}
                        />
                        <MyInput label={'Количество'}
                                 value={state.addData.subtitle}
                                 containerStyle={{paddingTop: 15}}
                                 onChange={(e) => setState({...state, addData: {...state.addData, subtitle: e.target.value}})}
                        />
                        <MyInput label={'Описание'}
                                 multiline={true}
                                 value={state.addData.description}
                                 containerStyle={{paddingTop: 15}}
                                 onChange={(e) => setState({...state, addData: {...state.addData, description: e.target.value}})}
                        />
                    </form>
                </MyModal>
            </div>

            <div className='row col p-0 m-0'>
                {
                    state.data?.map((category, index) =>
                        <CategoryBox key={index} state={state} category={category} setState={setState} refresh={refresh} onClick={() => {}}/>
                    )
                }
            </div>
        </div>
    );
}

export default PanelCategories;



const CategoryBox = ({category, state, setState, refresh}) => {

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


    const editThisCategory = async () => {
        await editCategory(state, setState);
        refresh();
    }


    return(
        <div className='col-lg-6 p-2'>
            <div className='card p-3' style={{borderRadius: 10}}>
                <div className='d-flex'>
                    <div className='d-flex w-100 flex-column justify-content-between' style={{maxHeight: 170}}>
                        <Link className='col p-2 touchable-text' to={{pathname: `/adminPanel/category/${category._id}`}}>
                            <div className='mb-0 touchable-title' style={{fontSize: 20, lineHeight: 1, fontWeight: 500}}>
                                {category.title}
                            </div>
                            <div className='touchable-subtitle' style={{fontSize: 16}}>
                                {
                                    !!category.articles_count
                                        ? `${category.articles_count} товара`
                                        : 'нет в наличии'
                                }
                            </div>
                            <div className='touchable-subtitle' style={{fontSize: 14, overflow: 'hidden', maxHeight: 60, wordBreak: 'break-all', color: '#cdcdcd'}}>
                                {!!category.description && category.description}
                            </div>
                        </Link>

                        <div className='d-flex'>
                            <MyModal
                                label={'Отредактировать'}
                                saveBtnLabel={'Сохранить'}
                                button={
                                    <Button className='m-2' variant="contained" color="primary" onClick={() => setState({...state, id: category._id})}>
                                        <span className="material-icons md-24">edit</span>
                                        <div>Редактировать</div>
                                    </Button>
                                }
                                contentStyle={{padding: 25, minWidth: 500}}
                                onSave={editThisCategory}
                            >
                                <form onSubmit={editThisCategory}>
                                    <MyInput label={'Название'}
                                             defaultValue={state.category_info?.title}
                                             value={state.category_info?.title}
                                             containerStyle={{paddingTop: 5}}
                                             onChange={(e) => setState({...state,
                                                 category_info: {...state.category_info, title: e.target.value}
                                             })}
                                    />
                                    <MyInput label={'Количество'}
                                             defaultValue={state.category_info?.subtitle}
                                             value={state.category_info?.subtitle}
                                             containerStyle={{paddingTop: 15}}
                                             onChange={(e) => setState({...state,
                                                 category_info: {...state.category_info, subtitle: e.target.value}
                                             })}
                                    />
                                    <MyInput label={'Описание'}
                                             multiline={true}
                                             defaultValue={state.category_info?.description}
                                             value={state.category_info?.description}
                                             containerStyle={{paddingTop: 15}}
                                             onChange={(e) => setState({...state,
                                                 category_info: {...state.category_info, description: e.target.value}
                                             })}
                                    />
                                </form>
                            </MyModal>

                            <Button
                                variant="contained"
                                color="secondary"
                                className='d-flex m-2'
                                onClick={() =>
                                Alerts.askModal(() => deleteThisCategory(), () => {})
                            }>
                                <span className="material-icons md-24">delete</span>
                                <div>Удалить</div>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className='d-flex align-items-center justify-content-center'
                             style={{width: 170, height: 170, borderRadius: 10, overflow: 'hidden', backgroundColor: '#d9d9d9'}}
                        >
                            {/*<img src={'/assets/xrizantema.png'} style={{height: 170}}/>*/}
                            <span className="material-icons" style={{fontSize: 100, color: '#fff'}}>photo</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

