import React, {useEffect, useReducer} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {SUBCATEGORIES} from "../../../arrays/arrays";
import {getSubCategoriesList, getSubCategoryInfo} from "../../../actions/subcategories";
import {getCategoryInfo} from "../../../actions";
import InlineLoader from "../../../components/custom/InlineLoader";
import {Alerts} from "../../../plugins/Alerts";
import Button from "@material-ui/core/Button";


const SubcategoriesPage = (props) => {

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
        <div className='col' style={{padding: '0 80px'}}>
            {state.loading && <InlineLoader />}
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

                    <div style={{marginTop: 20, fontSize: 50, fontWeight: 500}}>{state.category_info?.title}</div>
                    <p style={{fontSize: 20, textAlign: 'right'}}>
                        {state.category_info?.description}
                    </p>
                </div>
                {
                    !!state.category_info?.img
                        ?
                        <img src={`/api/category/images/${state.category_info?.img}`} className='category-image' style={{minHeight: 450}}/>
                        :
                        <div className='category-image' style={{minWidth: 400, minHeight: 450}}/>
                }
            </div>
            <div className='row'>
                {
                    state.data?.map((subCategory, index) =>
                        <Link className='category-box-container col-4 px-5' style={{marginBottom: 100}} to={{pathname: `/catalog/category/${state.category_id}/subCategory/${subCategory._id}`}}>
                            <CategoryBox key={index} category={subCategory} onClick={() => {}}/>
                        </Link>
                    )
                }
            </div>

        </div>
    );
}

export default SubcategoriesPage;




const CategoryBox = ({category}) => {

    return(
        <div style={{position: 'relative'}}>
            <div className='category-box'>
                <div className="div_" style={{
                         width: 300,
                         height: 300,
                         borderRadius: '25px 63px 0 0',
                         background: category.color,
                     }}
                >
                    <img className="category-image" src={`/api/category/images/${category?.img}`} style={{ position:'realtive' }} />
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
