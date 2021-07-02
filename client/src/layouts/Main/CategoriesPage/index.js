import React, {useEffect, useReducer} from 'react';
import {Link} from "react-router-dom";
import InlineLoader from "../../../components/custom/InlineLoader";

import {getCategoriesList, getCategoryImage} from "../../../actions";


const CategoriesPage = () => {
    const initialState = {
        loading: false,
        image_loading: false,
        refreshing: false,
        success: false,
        error: false,
        id: '',
        data: [],
        category_info: {},
        count: 0,

    }

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, initialState);

    const refresh = async () => {
        await getCategoriesList(state, setState);
    }

    useEffect(() => {
        refresh();
    }, []);


    return(
        <div className='category' >
            <div className='in_side' >
                <div>
                    <div className='row' >
                    {
                        !!state.data?.length && !state.loading &&
                        state.data?.map((category, index) =>
                            <Link className='col-sm-6 col-md-3 col-lg-3 col-6' style={{textDecoration: 'none'}} to={{pathname: `/catalog/category/${category._id}`, data: category}}>
                                <CategoryBox state={state} setState={setState} category={category} onClick={() => {}}/>
                            </Link>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesPage;


const CategoryBox = (props) => {

    let {category, state, setState} = props;

    const getArticlesCountText = () => {
        let count = category.articles_count;
        let countLastDigit = category.articles_count?.toString().split('').pop();

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
        <div style={{position: 'relative'}}>
            <div className='category-box'>
                <div className='w-100 item_'
                     style={{backgroundColor: '#e5eceb'}}
                >
                    <div className='d-flex align-items-center justify-content-center col'
                         style={{top: -50, right: -20, overflow: '', position: 'absolute'}}
                    >
                        <img src={`/api/category/images/${category.img}`} className='category-image'/>
                        {/*<img src={getCategoryImage(category.img)} style={{height: '21rem',}} className='category-image'/>*/}
                    </div>

                </div>
                <div className='col d-flex flex-column align-items-end py-3 pr-md-4'>
                    <div className='mb-0 touchable-title' style={{fontSize: 24, lineHeight: 1, fontWeight: 500}}>
                        {category.title}
                    </div>
                    {/*<div className='mb-2 mt-1 touchable-title' style={{fontSize: 20, lineHeight: 1, fontWeight: 500, color: '#C1C9A9'}}>*/}
                    {/*    {category.subtitle}*/}
                    {/*</div>*/}
                    <div className='touchable-subtitle' style={{fontSize: 18}}>
                        {
                            !!category.articles_count
                                ? `${getArticlesCountText()}`
                                : 'нет в наличии'
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}
