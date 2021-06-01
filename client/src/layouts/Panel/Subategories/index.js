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
import {
    addCategory,
    addCategoryImage,
    deleteCategory, deleteCategoryImage, deleteSubCategoryImage,
    editCategory,
    getCategoriesList,
    getCategoryInfo
} from "../../../actions";
import {
    addSubCategory, addSubCategoryImage,
    deleteSubCategory,
    editSubCategory,
    getSubCategoriesList,
    getSubCategoryInfo
} from "../../../actions";
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

    const [file, setFile] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const history = useHistory();

    const refresh = async () => {
        await getSubCategoriesList(state, setState);
    }

    useEffect(() => {
        refresh();
    }, [state.refreshing]);

    useEffect(() => {
        getSubCategoryInfo(state, setState);
    }, [state.id]);


    const onSave = async (event) => {
        // event.preventDefault()
        await addSubCategory(state, setState, {file, description});
        refresh();
    }


    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }


    return(
        <div className='overflow-auto p-4'
             style={{marginLeft: 240, height: '100vh', backgroundColor: 'rgb(217 220 226)'}}
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


                <MyModal label={'Добавить Новую Подкатегорию'}
                         buttonTitle={'Новая Подкатегория'}
                         contentStyle={{padding: 25, minWidth: 500}}
                         onSave={onSave}
                >
                    <form onSubmit={onSave}>
                        <input className='primary-btn' onChange={(e) => fileSelected(e)} type="file" accept="image/*"/>

                        <MyInput label={'Название'}
                                 value={state.addData.title}
                                 containerStyle={{paddingTop: 5}}
                                 onChange={(e) => setState({...state, addData: {...state.addData, title: e.target.value}})}
                        />
                        <MyInput label={'Название (Англ.)'}
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
                        <SubCategoryBox key={index}
                                        state={state}
                                        subCategory={subCategory}
                                        setState={setState}
                                        refresh={refresh}
                                        onClick={() => {}}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default PanelSubcategories;



const SubCategoryBox = ({subCategory, state, setState, refresh}) => {

    const [file, setFile] = useState();
    const [description, setDescription] = useState("");

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


    const uploadNewImage = async () => {
        // await addCategoryImage(state, setState, {file, description})

        await addSubCategoryImage(state, setState, {file, description}, subCategory._id)
        // await addCategory(state, setState, {file, description});
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }


    const getArticlesCountText = () => {
        let count = subCategory.articles_count;
        let countLastDigit = subCategory.articles_count?.toString().split('').pop();

        switch (countLastDigit) {
            case '1': return `${count} товар`;
            case '2':
            case '3':
            case '4': return `${count} товара`;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0': return `${count} товаров`;
        }
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
                                {
                                    !!subCategory.articles_count
                                        ? `${getArticlesCountText()}`
                                        : 'нет в наличии'
                                }
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
                                <form onSubmit={editThisSubCategory} className='d-flex'>
                                    <div>
                                        <div className='d-flex align-items-center justify-content-center'
                                             style={{width: 170, height: 170, borderRadius: 10, overflow: 'hidden', backgroundColor: '#d9d9d9'}}
                                        >
                                            {
                                                !!state.subcategory_info?.img
                                                    ?
                                                    <img src={`/api/subcategory/images/${state.subcategory_info?.img}`} style={{height: 170}}/>
                                                    :
                                                    <span className="material-icons" style={{fontSize: 100, color: '#fff'}}>photo</span>
                                            }
                                        </div>

                                        {
                                            !!state.subcategory_info?.img
                                                ?
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className='d-flex col mt-3'
                                                    onClick={() =>
                                                        Alerts.askModal(async () => await deleteSubCategoryImage(state, setState, subCategory._id), () => {})
                                                    }>
                                                    <span className="material-icons md-24">delete</span>
                                                    <div>Удалить</div>
                                                </Button>

                                                :
                                                <div>
                                                    <input onChange={(e) => fileSelected(e)} type="file" accept="image/*"/>

                                                    <Button variant="contained"
                                                            color="primary"
                                                            className='d-flex col mt-3'
                                                            onClick={uploadNewImage}
                                                    >
                                                        <div>Загрузить</div>
                                                    </Button>
                                                </div>
                                        }

                                    </div>

                                    <div className='col p-0 ml-4'>
                                        <MyInput label={'Название'}
                                                 defaultValue={state.subcategory_info?.title}
                                                 value={state.subcategory_info?.title}
                                                 containerStyle={{paddingTop: 5}}
                                                 onChange={(e) => setState({
                                                     ...state,
                                                     subcategory_info: {...state.subcategory_info, title: e.target.value}
                                                 })}
                                        />
                                        <MyInput label={'Название (Англ.)'}
                                                 defaultValue={state.subcategory_info?.subtitle}
                                                 value={state.subcategory_info?.subtitle}
                                                 containerStyle={{paddingTop: 15}}
                                                 onChange={(e) => setState({
                                                     ...state,
                                                     subcategory_info: {...state.subcategory_info, subtitle: e.target.value}
                                                 })}
                                        />
                                        <MyInput label={'Описание'}
                                                 multiline={true}
                                                 defaultValue={state.subcategory_info?.description}
                                                 value={state.subcategory_info?.description}
                                                 containerStyle={{paddingTop: 15}}
                                                 onChange={(e) => setState({
                                                     ...state,
                                                     subcategory_info: {
                                                         ...state.subcategory_info,
                                                         description: e.target.value
                                                     }
                                                 })}
                                        />
                                    </div>
                                </form>
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
                            {
                                !!subCategory.img
                                    ?
                                    <img src={`/api/subcategory/images/${subCategory.img}`} style={{height: 170}}/>
                                    :
                                    <span className="material-icons" style={{fontSize: 100, color: '#fff'}}>photo</span>
                            }
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
