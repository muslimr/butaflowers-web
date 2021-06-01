import axios from "axios";
import {Alerts} from "../plugins/Alerts";
import {getCategoryInfo} from "./categories";


export async function getSubCategoriesList(state, setState) {
    let result = false;
    setState({loading: true});
    await axios.get('/api/subcategory/list', {params: {id: state.category_id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({data: result.data?.data});
        setTimeout(() => setState({loading: false}), 2000)
    }
}


export async function getSubCategoryInfo (state, setState) {
    let result = false;
    await axios.get('/api/subcategory/info', {params: {id: state.id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response)

    if (result) {
        setState({
            subcategory_info: result.data?.data,
            loading: false,
        });
    }
}


export async function addSubCategory (state, setState, params) {
    let result = false;
    setState({loading: true});
    const formData = new FormData();

    formData.append("image", params.file)
    formData.append("description", params.description)

    await axios.post('/api/subcategory/add', formData,{params: state.addData, headers: {'Content-Type': 'multipart/form-data'}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        await Alerts.successModal(result.data?.description)
        setState({
            success: result.data?.description,
            // count: result.data?.count,
            loading: false,
        });
    }
}


export async function editSubCategory (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.put('/api/subcategory/edit', {id: state.id, data: state.subcategory_info})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            loading: false,
        });
    }
}


export async function deleteSubCategory (state, setState, id) {
    let result = false;
    setState({loading: true});
    await axios.delete('/api/subcategory/delete', {params: {id: id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            success: result.data?.message,
            loading: false,
        });
        await getSubCategoriesList(state, setState);
    }
}


export async function addSubCategoryImage (state, setState, params, ID) {
    let result = false;
    setState({loading: true});
    const formData = new FormData();

    formData.append("image", params.file)
    formData.append("description", params.description)

    await axios.post('/api/subcategory/image/add', formData,{params: {id: ID}, headers: {'Content-Type': 'multipart/form-data'}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        await getSubCategoryInfo(state, setState);
        setState({
            success: result.data?.description,
            // count: result.data?.count,
            loading: false,
            refreshing: !state.refreshing,
        });
    }
}


export async function deleteSubCategoryImage(state, setState, id) {
    let result = false;
    setState({loading: true});
    await axios.delete('/api/subcategory/image/delete', {params: {id: id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            success: result.data?.message,
            loading: false,
            refreshing: !state.refreshing,
        });
        // await getCategoriesList(state, setState);
        await getSubCategoryInfo(state, setState);
    }
}
