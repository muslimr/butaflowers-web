import React from 'react';
import {Link} from "react-router-dom";


const CatalogPage = () => {

    const categories = [
        {title: 'Зелень', subtitle: '274 товара', img: '/assets/zelen.png', color: '#E5EAD5', link: 'zelen'},
        {title: 'Розы', subtitle: '94 товара', img: '/assets/roza.png', color: '#F5E4E1', link: 'rozi'},
        {title: 'Сухоцвет', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#EAE2DB', link: 'suxocvet'},
        {title: 'Хризантемы', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#EAE5F5', link: 'xrizantemi'},
        {title: 'Экзотика', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#F4EBD8', link: 'ekzotika'},
        {title: 'Эксклюзивное', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#DBE3EA', link: 'eksklyuzivnoye'},
        {title: 'Разное', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#E6E5E8', link: 'raznoye'},
    ];


    return(
        <div className='row col' style={{padding: '200px 80px'}}>
            {
                categories.map((category, index) =>
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
