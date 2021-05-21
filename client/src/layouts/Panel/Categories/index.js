import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import Container from '@material-ui/core/Container';
import {useHttp} from "../../../hooks";
import {AuthContext} from "../../../context/AuthContext";
import Button from "@material-ui/core/Button";
import MyTable from "../../../components/custom/MyTable";
import {Loader} from "../../../components/Loader";
import MyModal from "../../../components/modals/MyModal";
import MyInput from "../../../components/custom/MyInput";
import {Snackbar} from "@material-ui/core";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";


const PanelCategories = () => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        addData: {
            img: '',
            title: '',
            subtitle: '',
        },
        data: [],
        count: 0
    }

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, initialState);


    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const getCategories = useCallback( async () => {
        try {
            const fetched = await request('api/category', "GET", null, {});
            setState({...state, data: fetched})
        } catch (e) {}
    }, [token, request]);


    useEffect(() => {
        getCategories();
    }, [getCategories]);


    const addCategory = async (state, setState) => {
        try {
            await request('/api/category/add', 'POST', {data: state.addData}, {});
        } catch (e) {

        }
    }

    const editCategory = async (state, setState) => {
        try {
            await request('/api/category/add', 'POST', {data: state.addData}, {});
        } catch (e) {

        }
    }

    const deleteCategory = async (state, setState) => {
        try {
            await request('/api/category/add', 'POST', {data: state.addData}, {});
        } catch (e) {

        }
    }


    return(
        <div className='overflow-auto p-4'
             style={{height: '100vh', backgroundColor: 'rgb(217 220 226)'}}
        >

            {loading && <Loader/>}

            <form method="POST" action="/profile-upload-single" encType="multipart/form-data">
                <div>
                    <label>Upload profile picture</label>
                    <input type="file" name="profile-file" required/>
                </div>
                <div>
                    <input type="submit" value="Upload"/>
                </div>
            </form>


            {/*<form method="POST" action="/api/category/upload" encType="multipart/form-data">*/}
            {/*    <div>*/}
            {/*        <label>Select your profile picture:</label>*/}
            {/*        <input type="file" name="profile_pic"/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <input type="submit" name="btn_upload_profile_pic" value="Upload"/>*/}
            {/*    </div>*/}
            {/*</form>*/}

            {/*<form action="/upload" method="post" encType="multipart/form-data">*/}
            {/*    <label>Файл</label>*/}
            {/*    <input type="file" name="filedata"/>*/}
            {/*    <input type="submit" value="Send"/>*/}
            {/*</form>*/}

            <div className='d-flex align-items-center justify-content-between mb-3'>
                <MyModal label={'Add New Category'}
                         buttonTitle={'Add New Category'}
                         contentStyle={{minWidth: 500}}
                         onSave={async () => {
                             await addCategory(state, setState);
                             getCategories();
                         }}
                >
                    <MyInput label={'Image'}
                             value={state.addData.img}
                             containerStyle={{paddingTop: 15}}
                             onChange={(e) => setState({...state, addData: {...state.addData, img: e.target.value}})}
                    />
                    <MyInput label={'Title'}
                             value={state.addData.title}
                             onChange={(e) => setState({...state, addData: {...state.addData, title: e.target.value}})}
                    />
                    <MyInput label={'Subtitle'}
                             value={state.addData.subtitle}
                             onChange={(e) => setState({...state, addData: {...state.addData, subtitle: e.target.value}})}
                    />


                </MyModal>
            </div>



            {JSON.stringify(state.data)}

            <div className='row col'>
                {
                    state.data?.map((category, index) =>
                        <CategoryBox key={index} category={category} onClick={() => {}}/>
                    )
                }
            </div>
        </div>
    );
}

export default PanelCategories;




const CategoryBox = ({category}) => {
    return(
        <Link className='col-lg-6 p-2' to={{pathname: `/adminPanel/category/${category._id}`}}>
            <div className='card p-3' style={{backgroundColor: '#fff'}}>
                <div className='mb-0' style={{fontSize: 20, fontWeight: 500, color: '#8E8E8E'}}>
                    {category.title}
                </div>
                <div className='d-flex w-100' style={{fontSize: 16, color: category.subtitle ? '#8E8E8E' : '#cdcdcd'}}>
                    {category.subtitle || 'нет в наличии'}
                </div>
                <img src={category.img} className='category-image' />
            </div>
        </Link>
    );
}

