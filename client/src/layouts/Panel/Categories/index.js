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
import {
    addCategory, addCategoryImage,
    deleteCategory,
    deleteCategoryImage,
    editCategory,
    getCategoriesList,
    getCategoryInfo,
    getTest
} from "../../../actions";
import Swal from 'sweetalert2';
import {Alerts} from "../../../plugins/Alerts";
import InlineLoader from "../../../components/custom/InlineLoader";
import axios from "axios";


async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
}


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

    const [file, setFile] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])

    const {token} = useContext(AuthContext);

    const refresh = () => {
        getCategoriesList(state, setState);
        // getTest(state, setState);
    }

    useEffect(() => {
        refresh();
    }, [state.refreshing]);

    useEffect(() => {
        getCategoryInfo(state, setState)
    }, [state.id]);


    const onSave = async (event) => {
        // event.preventDefault()
        await addCategory(state, setState, {file, description});
        refresh();
    }


    const submit = async event => {
        event.preventDefault()
        const result = await postImage({image: file, description})
        setImages([result.image, ...images])
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }


    return(
        <div className='overflow-auto p-4'
             style={{marginLeft: 240, height: '100vh', backgroundColor: 'rgb(217 220 226)'}}
        >
            {
                state.loading &&
                <InlineLoader style={{backgroundColor: 'rgba(255,255,255,0.8)'}}/>
            }

            <div className='d-flex align-items-center justify-content-end mb-3 mr-2'>
                <MyModal label={'Добавить Новую Категорию'}
                         buttonTitle={'Новая Категория'}
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
                    state.data?.map((category, index) =>
                        <CategoryBox key={index}
                                     state={state}
                                     category={category}
                                     setState={setState}
                                     refresh={refresh}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default PanelCategories;



const CategoryBox = (props) => {

    let {
        category,
        state,
        setState,
        refresh,
    } = props;

    const [file, setFile] = useState()
    const [description, setDescription] = useState("")

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

    // const onUploadImage = async () => {
    //     await addCategoryImage(state, setState, {file, description})
    //     // await addCategory(state, setState, {file, description});
    // }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    let articlesCountText;

    switch(category.articles_count) {
        case 1: articlesCountText = 'товар'; break;
        case 2:
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
                            <div className='mb-2 mt-1 touchable-title' style={{fontSize: 20, lineHeight: 1, fontWeight: 500, color: '#C1C9A9'}}>
                                {category.subtitle}
                            </div>
                            <div className='touchable-subtitle' style={{fontSize: 16}}>
                                {
                                    !!category.articles_count
                                        ? `${category.articles_count} товара`
                                        : 'нет в наличии'
                                }
                            </div>
                            <div className='touchable-subtitle' style={{fontSize: 14, overflow: 'hidden', maxHeight: 35, wordBreak: 'break-all', color: '#cdcdcd'}}>
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
                                <form onSubmit={editThisCategory} className='d-flex'>
                                    <div>
                                        <div className='d-flex align-items-center justify-content-center'
                                             style={{width: 170, height: 170, borderRadius: 10, overflow: 'hidden', backgroundColor: '#d9d9d9'}}
                                        >
                                            {
                                                !!state.category_info?.img
                                                    ?
                                                    <img src={`/api/category/images/${state.category_info?.img}`} style={{height: 170}}/>
                                                    :
                                                    <span className="material-icons" style={{fontSize: 100, color: '#fff'}}>photo</span>
                                            }
                                        </div>

                                        {
                                            !!state.category_info?.img
                                                ?
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className='d-flex col mt-3'
                                                    onClick={() =>
                                                        Alerts.askModal(async () => await deleteCategoryImage(state, setState, category._id), () => {})
                                                    }>
                                                    <span className="material-icons md-24">delete</span>
                                                    <div>Удалить</div>
                                                </Button>
                                                :
                                                // <form onSubmit={}>
                                                //
                                                // </form>
                                                <div>
                                                    <input className='primary-btn' onChange={(e) => fileSelected(e)} type="file" accept="image/*"/>
                                                    <div onClick={
                                                        async() => await addCategoryImage(state, setState, {file, description}, category._id)
                                                        }
                                                    >sdsdsdsd</div>
                                                </div>


                                                // <Button
                                                //     variant="contained"
                                                //     color="primary"
                                                //     className='d-flex col mt-3'
                                                //     onClick={() => {}
                                                //         // Alerts.askModal(async () => await deleteCategoryImage(state, setState, category._id), () => {})
                                                //     }>
                                                //     <div>Загрузить</div>
                                                // </Button>
                                        }

                                    </div>

                                    <div className='col p-0 ml-4'>
                                        <MyInput label={'Название'}
                                                 defaultValue={state.category_info?.title}
                                                 value={state.category_info?.title}
                                                 containerStyle={{paddingTop: 5}}
                                                 onChange={(e) => setState({...state,
                                                     category_info: {...state.category_info, title: e.target.value}
                                                 })}
                                        />
                                        <MyInput label={'Название (Англ.)'}
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
                                    </div>
                                </form>
                            </MyModal>

                            <Button
                                variant="contained"
                                color="secondary"
                                className='d-flex m-2'
                                onClick={() => Alerts.askModal(() => deleteThisCategory(), () => {})}
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
                                !!category.img
                                    ?
                                    <img src={`/api/category/images/${category.img}`} style={{height: 170}}/>
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

