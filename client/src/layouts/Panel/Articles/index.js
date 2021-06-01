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
    addArticleImage,
    addCategory,
    addSubCategoryImage,
    deleteCategory, deleteSubCategoryImage,
    editCategory,
    getCategoriesList,
    getCategoryInfo
} from "../../../actions";
import {
    addSubCategory,
    deleteSubCategory,
    editSubCategory,
    getSubCategoriesList,
    getSubCategoryInfo
} from "../../../actions/subcategories";
import InlineLoader from "../../../components/custom/InlineLoader";
import {Alerts} from "../../../plugins/Alerts";
import {addArticle, deleteArticle, editArticle, getArticleInfo, getArticlesList, deleteArticleImage} from "../../../actions";


const PanelArticles = (props) => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        category_id: useParams().categoryId,
        subcategory_id: useParams().subCategoryId,
        id: '',
        addData: {
            category_id: useParams().categoryId,
            subcategory_id: useParams().subCategoryId,
            img: '',
            title: '',
            subtitle: '',
            description: '',
        },
        data: [],
        article_info: false,
        count: 0
    }

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, initialState);

    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const history = useHistory();

    const refresh = async () => {
        await getArticlesList(state, setState);
    }

    useEffect(() => {
        refresh();
    }, [state.refreshing]);


    useEffect(() => {
        getArticleInfo(state, setState);
    }, [state.id]);


    const onSave = async (event) => {
        // event.preventDefault()
        await addArticle(state, setState, {file, description});
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

                <MyModal label={'Добавить Новый Продукт'}
                         buttonTitle={'Новый Продукт'}
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
                    state.data?.map((article, index) =>
                        <ArticleBox key={index} state={state} article={article} setState={setState} refresh={refresh} onClick={() => {}}/>
                    )
                }
            </div>
        </div>
    );
}

export default PanelArticles;



const ArticleBox = ({article, state, setState, refresh}) => {

    const [file, setFile] = useState();
    const [description, setDescription] = useState("");

    const deleteThisArticle = async () => {
        Alerts.askModal(
            async () => await deleteArticle(state, setState, article._id),
            () => {
            },
            {
                title: 'Точно хотите удалить ???',
                confirmButtonText: 'Да, точно !!',
                cancelButtonText: 'НЕТ, не удалять !!'
            }
        )
    }


    const editThisArticle = async () => {
        await editArticle(state, setState);
        refresh();
    }

    const uploadNewImage = async () => {
        // await addCategoryImage(state, setState, {file, description})

        await addArticleImage(state, setState, {file, description}, article._id)
        // await addCategory(state, setState, {file, description});
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }


    return(
        <div className='col-lg-6 p-2'>
            <div className='card p-3' style={{borderRadius: 10}}>
                <div className='d-flex'>
                    <div className='d-flex w-100 flex-column justify-content-between' style={{maxHeight: 170}}>
                        <div className='col p-2'>
                            <div className='mb-0' style={{fontSize: 20, lineHeight: 1, fontWeight: 500, color: '#8E8E8E'}}>
                                {article.title}
                            </div>
                            <div style={{fontSize: 16, color: article.subtitle ? '#8E8E8E' : '#cdcdcd'}}>
                                {article.subtitle}
                            </div>
                            <div style={{fontSize: 16, color: '#cdcdcd'}}>
                                {article.article_num}
                            </div>
                            <div style={{fontSize: 14, overflow: 'hidden', maxHeight: 60, wordBreak: 'break-all', color: '#cdcdcd'}}>
                                {!!article.description && article.description}
                            </div>
                        </div>

                        <div className='d-flex'>
                            <MyModal
                                label={'Отредактировать'}
                                saveBtnLabel={'Сохранить'}
                                button={
                                    <Button className='m-2' variant="contained" color="primary" onClick={() => setState({...state, id: article._id})}>
                                        <span className="material-icons md-24">edit</span>
                                        <div>Редактировать</div>
                                    </Button>
                                }
                                contentStyle={{padding: 25, minWidth: 500}}
                                onSave={editThisArticle}
                            >
                                <form onSubmit={editThisArticle} className='d-flex'>
                                    <div>
                                        <div className='d-flex align-items-center justify-content-center'
                                             style={{width: 170, height: 170, borderRadius: 10, overflow: 'hidden', backgroundColor: '#d9d9d9'}}
                                        >
                                            {
                                                !!state.article_info?.img
                                                    ?
                                                    <img src={`/api/article/images/${state.article_info?.img}`} style={{height: 170}}/>
                                                    :
                                                    <span className="material-icons" style={{fontSize: 100, color: '#fff'}}>photo</span>
                                            }
                                        </div>

                                        {
                                            !!state.article_info?.img
                                                ?
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className='d-flex col mt-3'
                                                    onClick={() =>
                                                        Alerts.askModal(async () => await deleteArticleImage(state, setState, article._id), () => {})
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
                                                 defaultValue={state.article_info?.title}
                                                 value={state.article_info?.title}
                                                 containerStyle={{paddingTop: 5}}
                                                 onChange={(e) => setState({...state,
                                                     article_info: {...state.article_info, title: e.target.value}
                                                 })}
                                        />
                                        <MyInput label={'Название (Англ.)'}
                                                 defaultValue={state.article_info?.subtitle}
                                                 value={state.article_info?.subtitle}
                                                 containerStyle={{paddingTop: 15}}
                                                 onChange={(e) => setState({...state,
                                                     article_info: {...state.article_info, subtitle: e.target.value}
                                                 })}
                                        />
                                        <MyInput label={'Описание'}
                                                 multiline={true}
                                                 defaultValue={state.article_info?.description}
                                                 value={state.article_info?.description}
                                                 containerStyle={{paddingTop: 15}}
                                                 onChange={(e) => setState({...state,
                                                     article_info: {...state.article_info, description: e.target.value}
                                                 })}
                                        />
                                    </div>
                                </form>
                            </MyModal>

                            <Button variant="contained"
                                    color="secondary"
                                    className='d-flex m-2'
                                    onClick={() => Alerts.askModal(() => deleteThisArticle(), () => {})}
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
                                !!article.img
                                    ?
                                    <img src={`/api/article/images/${article.img}`} style={{height: 170}}/>
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

