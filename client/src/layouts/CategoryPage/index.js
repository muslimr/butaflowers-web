import React from 'react';
import {Link, useHistory} from "react-router-dom";


const CategoryPage = (props) => {

    // let data = props.location.data

    const history = useHistory();

    console.log('dddfdfd', props)

    // useEffect(() => {
    //     setActiveRoute({name: props.name, path: props.match.path});
    //     setProps({customHeader: <HEADER {...props}/> });
    //     return() => {
    //         setActiveRoute(null);
    //         setProps({customHeader: null});
    //     }
    // }, []);

    const categories = [
        {title: 'Зелень', subtitle: '274 товара', img: '/assets/zelen.png', color: '#E5EAD5'},
        {title: 'Розы', subtitle: '94 товара', img: '/assets/roza.png', color: '#F5E4E1'},
        {title: 'Сухоцвет', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#EAE2DB'},
        {title: 'Хризантемы', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#EAE5F5'},
        {title: 'Экзотика', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#F4EBD8'},
        {title: 'Эксклюзивное', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#DBE3EA'},
        // {title: 'Разное', subtitle: '104 товара', img: '/assets/xrizantema.png', color: '#E6E5E8'},
    ];


    return(
        <div className='col' style={{padding: '0 80px'}}>
            <div className='row mb-5'>
                <div className='col d-flex flex-column align-items-end' style={{paddingTop: 180, color: '#8D8D8D'}}>
                    <div className='w-100' onClick={() => history.goBack()}>Назад</div>
                    <div style={{marginTop: 20, fontSize: 50, fontWeight: 500}}>Зелень</div>
                    <p style={{fontSize: 20, textAlign: 'right'}}>
                        Заказать оптом напрямую от производителя!
                        Доставка по России и СНГ, самовывоз, свободный сток! Наличие на складах и возможность заказа уточняйте у наших менеджеров.
                    </p>
                </div>
                <img src={'/assets/zelen.png'} className='category-image' style={{minHeight: 550}}/>
            </div>
            <div className='row'>
                {
                    categories.map((category, index) =>
                        <Link className='category-box-container col-4 px-5' style={{marginBottom: 100}} to={{pathname: '/catalog/category/'}}>
                            <CategoryBox category={category} onClick={() => {}}/>
                        </Link>
                    )
                }
            </div>

        </div>
    );
}

export default CategoryPage;




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
