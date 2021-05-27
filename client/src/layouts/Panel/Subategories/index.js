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
import {Alert} from "react-bootstrap";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {addCategory, deleteCategory, editCategory, getCategoriesList, getCategoryInfo} from "../../../actions";
import {
    addSubCategory,
    deleteSubCategory,
    editSubCategory,
    getSubCategoriesList,
    getSubCategoryInfo
} from "../../../actions/subcategories";
import InlineLoader from "../../../components/custom/InlineLoader";
import {Alerts} from "../../../plugins/Alerts";






const PanelSubcategories = (props) => {

    // let params = useParams();

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        category_id: useParams().categoryId,
        id: '',
        addData: {
            category_id: useParams().categoryId,
            img: '',
            title: '',
            subtitle: '',
            description: '',
        },
        data: [],
        subcategory_info: false,
        count: 0
    }

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, initialState);
    const history = useHistory();

    const refresh = async () => {
        await getSubCategoriesList(state, setState);
    }

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        getSubCategoryInfo(state, setState);
    }, [state.id]);


    const onSave = async () => {
        await addSubCategory(state, setState);
        await refresh();
    }


    return(
        <div className='overflow-auto p-4'
             style={{height: '100vh', backgroundColor: 'rgb(217 220 226)'}}
        >
            {state.loading && <InlineLoader style={{backgroundColor: 'rgba(255,255,255,0.8)'}}/>}

            <div className='d-flex align-items-center justify-content-between mb-3 mr-2'>
                <Button
                    className='d-flex m-2 px-4'
                    style={{minHeight: 45}}
                    onClick={() => history.goBack()}
                >
                    <span className="material-icons md-24">arrow_back_ios</span>
                    <div>Назад</div>
                </Button>


                <MyModal label={'Добавить Новую Податегорию'}
                         buttonTitle={'Новая Подкатегория'}
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
                    state.data?.map((subCategory, index) =>
                        <SubCategoryBox key={index} state={state} subCategory={subCategory} setState={setState} refresh={refresh} onClick={() => {}}/>
                    )
                }
            </div>
        </div>
    );
}

export default PanelSubcategories;



const SubCategoryBox = ({subCategory, state, setState, refresh}) => {

    const deleteThisSubCategory = async () => {
        Alerts.askModal(
            async () => await deleteSubCategory(state, setState, subCategory._id),
            () => {
            },
            {
                title: 'Точно хотите удалить ???',
                confirmButtonText: 'Да, точно !!',
                cancelButtonText: 'НЕТ, не удалять !!'
            }
        )
    }


    const editThisSubCategory = async () => {
        await editSubCategory(state, setState);
        refresh();
    }


    return(
        <div className='col-lg-6 p-2'>
            <div className='card p-3' style={{borderRadius: 10}}>
                <div className='d-flex'>
                    <div className='d-flex w-100 flex-column justify-content-between' style={{maxHeight: 170}}>
                        <Link className='col p-2 touchable-text' to={{pathname: `/adminPanel/category/${state.category_id}/subCategory/${subCategory._id}`}}>
                            <div className='mb-0 touchable-title' style={{fontSize: 20, lineHeight: 1, fontWeight: 500}}>
                                {subCategory.title}
                            </div>
                            <div className='touchable-subtitle' style={{fontSize: 16}}>
                                {subCategory.subtitle || 'нет в наличии'}
                            </div>
                            <div className='touchable-subtitle' style={{fontSize: 14, overflow: 'hidden', maxHeight: 60, wordBreak: 'break-all', color: '#cdcdcd'}}>
                                {!!subCategory.description && subCategory.description}
                            </div>
                        </Link>

                        <div className='d-flex'>
                            <MyModal
                                label={'Отредактировать'}
                                saveBtnLabel={'Сохранить'}
                                button={
                                    <Button className='m-2' variant="contained" color="primary" onClick={() => setState({...state, id: subCategory._id})}>
                                        <span className="material-icons md-24">edit</span>
                                        <div>Редактировать</div>
                                    </Button>
                                }
                                contentStyle={{padding: 25, minWidth: 500}}
                                onSave={editThisSubCategory}
                            >
                                {
                                    state.subcategory_info &&
                                    <form onSubmit={editThisSubCategory}>
                                        <MyInput label={'Название'}
                                                 defaultValue={state.subcategory_info?.title}
                                                 value={state.subcategory_info?.title}
                                                 containerStyle={{paddingTop: 5}}
                                                 onChange={(e) => setState({...state,
                                                     subcategory_info: {...state.subcategory_info, title: e.target.value}
                                                 })}
                                        />
                                        <MyInput label={'Количество'}
                                                 defaultValue={state.subcategory_info?.subtitle}
                                                 value={state.subcategory_info?.subtitle}
                                                 containerStyle={{paddingTop: 15}}
                                                 onChange={(e) => setState({...state,
                                                     subcategory_info: {...state.subcategory_info, subtitle: e.target.value}
                                                 })}
                                        />
                                        <MyInput label={'Описание'}
                                                 multiline={true}
                                                 defaultValue={state.subcategory_info?.description}
                                                 value={state.subcategory_info?.description}
                                                 containerStyle={{paddingTop: 15}}
                                                 onChange={(e) => setState({...state,
                                                     subcategory_info: {...state.subcategory_info, description: e.target.value}
                                                 })}
                                        />
                                    </form>
                                }
                            </MyModal>

                            <Button
                                variant="contained"
                                color="secondary"
                                className='d-flex m-2'
                                onClick={() => Alerts.askModal(() => deleteThisSubCategory(), () => {})}
                            >
                                <span className="material-icons md-24">delete</span>
                                <div>Удалить</div>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className='d-flex align-items-center justify-content-center'
                             style={{width: 170, height: 170, borderRadius: 10, overflow: 'hidden', backgroundColor: '#d9d9d9'}}
                        >
                            <img src={'/assets/xrizantema.png'} style={{height: 170}}/>
                            {/*<span className="material-icons" style={{fontSize: 100, color: '#fff'}}>photo</span>*/}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}





// const CategoryBox = ({category, state, setState}) => {
//     return(
//         <div className='col-lg-6 p-2'>
//             <div className='card p-3'>
//                 <div className='d-flex justify-content-between'>
//                     <div>
//                         <div className='mb-0' style={{fontSize: 20, fontWeight: 500, color: '#8E8E8E'}}>
//                             {category.title}
//                         </div>
//                         <div style={{fontSize: 16, color: category.subtitle ? '#8E8E8E' : '#cdcdcd'}}>
//                             {category.subtitle || 'нет в наличии'}
//                         </div>
//                     </div>
//                     {/*<img src={category.img} className='category-image' />*/}
//                     <div onClick={() =>
//                         Alerts.askModal(() => deleteSubCategory(state, setState, category._id), () => {})
//                     }>
//                         <span className="material-icons md-24">delete</span>
//                     </div>
//
//
//                     {/*<span className="material-icons md-light md-inactive">face</span>*/}
//                 </div>
//             </div>
//
//         </div>
//     );
// }

