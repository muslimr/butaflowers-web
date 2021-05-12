import React from 'react';

const CategoryBox = ({category}) => {

    return(
        <div style={{position: 'relative'}}>
            <img src={category.img} style={{position: 'absolute'}}/>
            <div className='category-box overflow-hidden'>
                <div className='w-100'
                     style={{
                         height: 350,
                         background: `linear-gradient(to top, #fff, ${category.color})`
                     }}
                >

                </div>
                <div className='col d-flex flex-column align-items-end py-3 pr-4'>
                    <div className='mb-0' style={{fontSize: 30, fontWeight: 500, lineHeight: 1, color: '#8E8E8E'}}>{category.title}</div>
                    <div style={{fontSize: 16, color: '#8E8E8E'}}>{category.subtitle}</div>
                </div>
            </div>
        </div>

    );
}

export default CategoryBox;
