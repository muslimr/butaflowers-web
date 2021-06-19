import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {SUBCATEGORIES} from "../../../arrays/arrays";


const Article = (props) => {

    const history = useHistory();
    let category = history.location.pathname.split('/')[2].toUpperCase();


    return(
        <div className='col' style={{padding: '0 80px'}}>
            <div className='row mb-5'>
                <div className='col d-flex flex-column align-items-end' style={{paddingTop: 180, color: '#8D8D8D'}}>
                    <div className='w-100' onClick={() => history.goBack()}>Назад</div>
                    <div style={{marginTop: 20, fontSize: 50, fontWeight: 500}}>{SUBCATEGORIES[category].label}</div>
                    <p style={{fontSize: 20, textAlign: 'right'}}>
                        {SUBCATEGORIES[category].description}
                    </p>
                </div>
                <img src={SUBCATEGORIES[category].img} className='category-image' style={{minHeight: 550}}/>
            </div>
            <div className='category' >
                <div className='in_side' >
                    <div>
                        <div className='row' >
                {
                    SUBCATEGORIES[category].list.map((category, index) =>
                        <Link className='col-sm-6 col-md-3 col-lg-3 col-6 category-box-container col-4 px-5' style={{marginBottom: 100}} to={{pathname: '/catalog/category/'}}>
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

export default Article;




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
