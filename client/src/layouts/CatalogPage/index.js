import React from 'react';
import CategoryBox from "./components/CategoryBox";


const CatalogPage = () => {

    const categories = [
        {title: 'Зелень', subtitle: '274 товара', img: '/assets/zelen.png', color: '#E5EAD5'},
        {title: 'Розы', subtitle: '94 товара', img: '/assets/roza.png', color: '#F5E4E1'},
        {title: 'Хризантемы', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#EAE2DB'},
    ];


    return(
        <div className='row' style={{padding: '200px 50px'}}>
            {
                categories.map((category, index) =>
                    <div className='col-4 px-5'>
                        <CategoryBox category={category}/>
                    </div>
                )
            }
        </div>
    );
}

export default CatalogPage;
