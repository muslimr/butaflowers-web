import React, {useEffect, useReducer} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {SUBCATEGORIES} from "../../../arrays/arrays";
import {addArticle, getArticleInfo, getArticlesList} from "../../../actions/articles";
import {getSubCategoryInfo} from "../../../actions/subcategories";
import Button from "@material-ui/core/Button";


const ArticlesPage = (props) => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        category_id: useParams().categoryId,
        subcategory_id: useParams().subCategoryId,
        id: useParams().subCategoryId,
        addData: {
            category_id: useParams().categoryId,
            subcategory_id: useParams().subCategoryId,
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

    const refresh = async () => {
        await getArticlesList(state, setState);
    }

    useEffect(() => {
        refresh();
    }, []);


    // useEffect(() => {
    //     getArticleInfo(state, setState);
    // }, [state.id]);


    useEffect(() => {
        getSubCategoryInfo(state, setState);
    }, []);


    const onSave = async () => {
        await addArticle(state, setState);
        await refresh();
    }

    const history = useHistory();
    let category = history.location.pathname.split('/')[2].toUpperCase();


    return(
        <div className='col' style={{padding: '0 80px'}}>
            <div className='row mb-5'>
                <div className='col d-flex flex-column align-items-end' style={{paddingTop: 180, color: '#8D8D8D'}}>
                    <Button
                        className='d-flex m-2 px-4 mr-auto'
                        style={{minHeight: 45}}
                        onClick={() => history.goBack()}
                    >
                        <span className="material-icons md-24">arrow_back_ios</span>
                        <div>Назад</div>
                    </Button>

                    <div style={{marginTop: 20, fontSize: 50, fontWeight: 500}}>{state.subcategory_info?.title}</div>
                    <p style={{fontSize: 20, textAlign: 'right'}}>
                        {state.subcategory_info?.description}
                    </p>
                </div>
                {/*<img src={state.article_info?.img} className='category-image' style={{minHeight: 550}}/>*/}
                <div className='category-image' style={{minWidth: 400, minHeight: 550}}/>
            </div>
            <div className='row'>
                {
                    state.data?.map((category, index) =>
                        <Link className='category-box-container col-4 px-5' style={{marginBottom: 100}} to={{pathname: '/catalog/category/'}}>
                            <CategoryBox category={category} onClick={() => {}}/>
                        </Link>
                    )
                }
            </div>

        </div>
    );
}

export default ArticlesPage;




const CategoryBox = ({category}) => {

    return(
        <div style={{position: 'relative'}}>
            <div className='category-box'>
                <div className='w-100'
                     style={{
                         height: 300,
                         borderRadius: '25px 63px 0 0',
                         background: category.color
                     }}
                >
                    <img src={category.img} className='category-image' style={{top: -50, right: -50, position: 'absolute'}}/>
                </div>
                <div className='col d-flex flex-column py-3 px-4'>
                    <div className='mb-0' style={{fontSize: 26, fontWeight: 500, color: '#8E8E8E'}}>{category.title}</div>
                    <div className='mb-0' style={{fontSize: 26, fontWeight: 500, lineHeight: 1, color: '#C1C9A9'}}>{category.title2}</div>
                    <div className='d-flex w-100 justify-content-end' style={{fontSize: 16, color: category.subtitle ? '#8E8E8E' : '#cdcdcd'}}>{category.subtitle || 'нет в наличии'}</div>
                </div>
            </div>
        </div>

    );
}
