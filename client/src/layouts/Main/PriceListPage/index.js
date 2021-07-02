import React, {useReducer} from 'react';
import MyInput from "../../../components/custom/MyInput";
import MyModal from "../../../components/modals/MyModal";
import {sendPriceList} from "../../../actions/nodemail";
import {addArticle} from "../../../actions";
import Button from "@material-ui/core/Button";
import {useWindowDimensions} from "../../../hooks";


const PriceListPage = () => {

    const dimensions = useWindowDimensions()

    const [state, setState] = useReducer((prevState, newState) => {
            return {...prevState, ...newState}
        }, {
            loading: false,
            refreshing: false,
            success: false,
            error: false,
            dataToSend: {
                name: "",
                phone: "",
                email: "",
            },
            listData: [],

        }
    );



    return(
        <div className='container' style={{ padding: dimensions.width >= 768 ? '12rem 0 0 0' : '4rem 0 4rem 0' }} >
            <div className='container row py-5 d-flex justify-content-center w-100 m-0' >
                <div className='col-md-6' >
                    {
                        dimensions.width < 768 &&
                        <div style={{
                            width: '100%', height: 'auto',
                            background: '#F2F2F2', color: '#AFAFAF',
                            borderRadius: '5px', padding: '30px 20px',
                            fontWeight: '700', margin: '0 0 30px 0',
                            fontSize: 15, textAlign:'center'
                        }}>
                            ДЛЯ ПОЛУЧЕНИЯ ПРАЙС-ЛИСТА ПОЖАЛУЙСТА ЗАПОЛНИТЕ ФОРМУ
                        </div>
                    }
                    <MyInput label={'Имя'}
                             value={state.dataToSend.name}
                             onChange={(e) => setState({...state, dataToSend: {...state.dataToSend, name: e.target.value}})}
                    />
                    <MyInput label={'Телефон'}
                             value={state.dataToSend.phone}
                             containerStyle={{paddingTop: 15}}
                             onChange={(e) => setState({...state, dataToSend: {...state.dataToSend, phone: e.target.value}})}
                    />
                    <MyInput label={'Email'}
                             value={state.dataToSend.email}
                             containerStyle={{paddingTop: 15}}
                             onChange={(e) => setState({...state, dataToSend: {...state.dataToSend, email: e.target.value}})}
                    />

                    {
                        dimensions.width > 767 &&
                        <div style={{color: '#AFAFAF', fontWeight: '600', marginTop: '3rem'}}>
                            <p>- Заполняете форму</p>
                            <p>- Ждёте несколько минут</p>
                            <p>- Получаете прайс на указанный Email</p>
                        </div>
                    }
                </div>
                <div className='col-md-6' >
                    {
                        dimensions.width > 767 &&
                        <div style={{
                            width: '100%', height: 'auto',
                            background: '#F2F2F2', color: '#AFAFAF',
                            borderRadius: '5px', padding: '30px',
                            fontWeight: '700', marginTop: dimensions.width >= 768 ? 2 : 30
                        }}>
                            ДЛЯ ПОЛУЧЕНИЯ ПРАЙС-ЛИСТА ПОЖАЛУЙСТА ЗАПОЛНИТЕ ФОРМУ
                        </div>
                    }
                    <Button
                        className='price__button d-flex mr-auto w-100 mt-3'
                        onClick={() => sendPriceList(state, setState)}
                    >
                        <div>ОТПРАВИТЬ</div>
                    </Button>

                    {
                        dimensions.width < 767 &&
                        <div style={{color: '#AFAFAF', fontWeight: '600', marginTop: '1.5rem'}}>
                            <p>- Заполняете форму</p>
                            <p>- Ждёте несколько минут</p>
                            <p>- Получаете прайс на указанный Email</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default PriceListPage;

// onSave={() => sendPriceList(state, setState)}