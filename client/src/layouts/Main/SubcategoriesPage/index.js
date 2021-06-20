import React, {useEffect, useReducer} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {SUBCATEGORIES} from "../../../arrays/arrays";
import {getSubCategoriesList, getSubCategoryInfo} from "../../../actions/subcategories";
import {getCategoryInfo} from "../../../actions";
import InlineLoader from "../../../components/custom/InlineLoader";
import {Alerts} from "../../../plugins/Alerts";
import Button from "@material-ui/core/Button";
import {useWindowDimensions} from "../../../hooks";


const SubcategoriesPage = (props) => {

    const dimensions = useWindowDimensions()
    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        category_id: useParams().categoryId,
        id: useParams().categoryId,
        data: [],
        category_info: false,
        count: 0
    }

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, initialState);

    const history = useHistory();

    const refresh = async () => {
        setState({loading: true})
        await getCategoryInfo(state, setState)
        await getSubCategoriesList(state, setState);
    }


    useEffect(() => {
        refresh();
    }, []);


    let category = history.location.pathname.split('/')[2].toUpperCase();


    return(
        <div>
            {state.loading && <InlineLoader />}
            <div className='sub-info row m-0'>
                <div className='back_btn-container col d-flex flex-column align-items-end' style={{color: '#8D8D8D'}}>
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
                    <div className="title_section d-flex flex-column justify-content-center " >
                        <div className="title" >{state.category_info?.title}</div>
                        <p className='p' >{state.category_info?.description}</p>
                    </div>
                    <div className="img_" >
                        {
                            !!state.category_info?.img
                                ?
                                <img src={`/api/category/images/${state.category_info?.img}`} />
                                :
                                <div className='category-image' />
                        }
                    </div>
                </div>
            </div>
            <div className='sub_category' >
                <div className='in_side' >
                    <div>
                        <div className='row' >
                        {
                            state.data?.map((subCategory, index) =>
                                <Link className='col-sm-6 col-md-3 col-lg-3 col-6 text-decoration-none' to={{pathname: `/catalog/category/${state.category_id}/subCategory/${subCategory._id}`}}>
                                    <CategoryBox key={index} index={index} category={subCategory} onClick={() => {}}/>
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

export default SubcategoriesPage;


let status;
// let src = '/assets/buta_flowers_logo.svg';

const CategoryBox = ({category, index}) => {



    async function getImageFromS3(ID) {
        status =  await fetch(`/api/subcategory/images/${ID}`)
            .catch(error => console.log('ERROR', error))
            .then((response) => {
                    if (response.ok === true) {
                        // status = result.ok;
                        return `/api/subcategory/images/${ID}`;
                    } else {
                        return '/assets/buta_flowers_logo.svg'
                    }
            }



                // response
            );


        // status = result
        // if (result.ok === true) {
        //     status = result.ok;
        //     src = `/api/subcategory/images/${ID}`;
        // } else {
        //     status = '/assets/buta_flowers_logo.svg'
        // }


        // console.log('@@@@@@', result)

        // status = result;
    }

    useEffect(() =>{
        getImageFromS3(category.img)
    }, []);


    return(
        <div style={{position: 'relative'}}>
            <div className='sub-category-box'>
                <div className='w-100 item_' >
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