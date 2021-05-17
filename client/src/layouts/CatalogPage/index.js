import React from 'react';
import {Link} from "react-router-dom";
import {CATEGORIES} from "../../arrays/arrays";


const CatalogPage = () => {
    return(
        <div className='row col' style={{padding: '200px 80px'}}>
            {
                CATEGORIES.map((category, index) =>
                    <Link className='category-box-container col-4 px-5' style={{marginBottom: 100}} to={{pathname: `/catalog/${category.link}`, data: category}}>
                        <CategoryBox category={category} onClick={() => {}}/>
                    </Link>
                )
            }
        </div>
    );
}

export default CatalogPage;




const CategoryBox = ({category}) => {

    return(
        <div style={{position: 'relative'}}>
            <div className='category-box'>
                <div className='w-100'
                     style={{
                         height: 300,
                         borderRadius: '25px 63px 25px 63px',
                         background: `linear-gradient(to top, #fff, ${category.color})`
                     }}
                >
                    <img src={category.img} className='category-image' style={{top: -50, right: -50, position: 'absolute'}}/>
                </div>
                <div className='col d-flex flex-column align-items-end py-3 pr-4'>
                    <div className='mb-0' style={{fontSize: 30, fontWeight: 500, lineHeight: 1, color: '#8E8E8E'}}>{category.title}</div>
                    <div style={{fontSize: 16, color: '#8E8E8E'}}>{category.subtitle}</div>
                </div>
            </div>
        </div>

    );
}
