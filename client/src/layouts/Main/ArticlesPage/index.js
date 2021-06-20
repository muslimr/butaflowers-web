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
        <div>
            <div className='sub-category-info row m-0'>
                <div className='back_btn-container col d-flex flex-column align-items-end' style={{ color: '#8D8D8D'}}>
                    <Button
                        className='d-flex m-2 px-4 mr-auto'
                        style={{minHeight: 45}}
                        onClick={() => history.goBack()}
                    >
                        <span className="material-icons md-24">arrow_back_ios</span>
                        <div>Назад</div>
                    </Button>
                </div>
                <div className="image__section" >
                    <div className="title_section d-flex flex-column justify-content-end" >
                        <div className="title" >{state.subcategory_info?.title}</div>
                        <p className='p' >{state.subcategory_info?.description}</p>
                    </div>
                    <div className="img_" >
                        {
                            !state.category_info?.img
                                ?
                                <img src={`/api/category/images/${state.subcategory_info?.img}`} />
                                :
                                <div className='category-image' />
                        }
                    </div>
                </div>
                {/*<img src={state.article_info?.img} className='category-image' style={{minHeight: 550}}/>*/}
                {/*<div className='category-image' style={{minWidth: 400, minHeight: 550}}/>*/}
            </div>
            <div className='sub_category' >
                <div className='in_side' >
                    <div>
                        <div className='row' >
                        {
                            state.data?.map((category, index) =>
                                <Link className='col-sm-6 col-md-3 col-lg-3 col-6 text-decoration-none' to={{pathname: '/catalog/category/'}}>
                                    <CategoryBox category={category} onClick={() => {}}/>
                                </Link>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ArticlesPage;




const CategoryBox = ({category}) => {

    async function getImageFromS3() {
        let result = false;
        return await fetch(`/api/article/images/${category?.img}`)
            .catch(error => console.log(error))
            .then((response) => (result = response));

        if (result) {
            console.log(result)
            return result
        };
    }

    return(
        <div style={{position: 'relative'}}>
            <div className='sub-category-box'>
                <div className='w-100 item_'
                     style={{
                         background: category.color ? category.color : 'gray',
                     }}
                >
                    <div className='d-flex align-items-center justify-content-center col'
                    >
                        {
                            <img className="category-image" src={`/api/subcategory/images/${category.img}`} style={{position: 'realtive'}}/>
                        }
                        {/*<img src={getCategoryImage(category.img)} style={{height: '21rem',}} className='category-image'/>*/}
                    </div>
                </div>
                <div className='topic'>
                    <div className='title m-0' style={{ fontWeight: 500, color: '#8E8E8E'}}>{category.title}</div>
                    <div className='mb-0' style={{ fontWeight: 500, lineHeight: 1, color: '#C1C9A9'}}>{category.title2}</div>
                    <div className='p m-0' style={{ color: category.subtitle ? '#8E8E8E' : '#cdcdcd'}}>{category.subtitle || 'нет в наличии'}</div>
                </div>
            </div>
        </div>

    );
}
