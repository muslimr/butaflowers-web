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
        // getCategoriesList(state, setState);
    }, []);


    return(
        <div className='parent__category row w-100 m-0'>
            {state.loading && <InlineLoader style={{height: 50, marginTop: 200}}/>}

            {
                !!state.data?.length && !state.loading &&
                state.data?.map((category, index) =>
                    <Link className='category-box-container' style={{textDecoration: 'none', marginBottom: 100}} to={{pathname: `/catalog/category/${category._id}`, data: category}}>
                        <CategoryBox state={state} setState={setState} category={category} onClick={() => {}}/>
                    </Link>
                )
            }
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

    // useEffect(() => {
    //     getCategoryImage(category.img)
    // }, []);


    return(
        <div style={{position: 'relative'}}>
            <div className='category-box'>
                <div className='w-100'
                     style={{
                         height: 300,
                         borderRadius: '25px 63px 25px 63px',
                         background: `linear-gradient(to top, #fff, #EAE5F5)`
                     }}
                >
                    <div className='d-flex align-items-center justify-content-center col'
                         style={{top: -50, right: -50, overflow: 'hidden', position: 'absolute'}}
                    >
                        <img src={`/api/category/images/${category.img}`} className='category-image'/>
                        {/*<img src={getCategoryImage(category.img)} style={{height: '21rem',}} className='category-image'/>*/}
                    </div>

                </div>
                <div className='col d-flex flex-column align-items-end py-3 pr-4'>
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
