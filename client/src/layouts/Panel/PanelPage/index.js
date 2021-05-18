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


const PanelPage = () => {

    const initialState = {
        loading: false,
        refreshing: false,
        success: false,
        error: false,
        addData: {
            img: '',
            title: '',
        },
        listData: [],
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
            setState({...state, listData: fetched})
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
             style={{
                 // height: '90vh',
                 height: '100vh',
                 backgroundColor: 'rgb(217 220 226)'
             }}
        >
            {loading && <Loader/>}
            <div className='d-flex align-items-center justify-content-between mb-3'>
                <Link to='/'>
                    <Button type='primary'>
                        КъулухЪ хъвач
                    </Button>
                </Link>
                <MyModal label={'Add New Category'}
                         buttonTitle={'Add New Category'}
                         contentStyle={{minWidth: 500}}
                         onSave={async () => {
                             await addCategory(state, setState);
                             getCategories();
                         }}
                >
                    <MyInput label={'Title'}
                             value={state.addData.title}
                             onChange={(e) => setState({...state, addData: {...state.addData, title: e.target.value}})}
                    />
                    <MyInput label={'Image'}
                             value={state.addData.img}
                             containerStyle={{paddingTop: 15}}
                             onChange={(e) => setState({...state, addData: {...state.addData, img: e.target.value}})}
                    />
                </MyModal>
            </div>
            {/*<Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>*/}
            {/*    <Alert onClose={handleClose} severity="success">*/}
            {/*        This is a success message!*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
            <MyTable data={state.listData}/>
        </div>
    );
}

export default PanelPage;

