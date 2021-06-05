import axios from "axios";
import {Alerts} from "../plugins/Alerts";


export async function getCategoriesList(state, setState) {
    let result = false;
    await setState({loading: true});
    await axios.get('/api/category/list')
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            data: result.data.categories,
        });
        setTimeout(() => setState({loading: false}), 3000)
    }
}


export async function getCategoryImage(id) {
    let result = false;

    await axios.get(`/api/category/images/${id}`)
        .catch(error => console.log(error))
        .then(response => result = response.url);

    if(result) return result;
}



export async function getCategoryInfo (state, setState) {
    let result = false;
    await axios.get('/api/category/info', {params: {id: state.id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response)

    if (result) {
        await setState({
            category_info: result.data?.data,
            loading: false,
        });
    }
}


export async function addCategory (state, setState, params) {
    let result = false;
    setState({loading: true});
    const formData = new FormData();

    formData.append("image", params.file)
    formData.append("description", params.description)

    await axios.post('/api/category/add', formData,{params: state.addData, headers: {'Content-Type': 'multipart/form-data'}})
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


export async function editCategory (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.put('/api/category/edit', {id: state.id, data: state.category_info})
        .catch(error => setState({error: error, loading: false}))
        .then(response => (result = response))

    if (result) {
        setState({
            // data: result.data?.categories,
            // count: result.data?.count,
            loading: false,
        });
    }
}


export async function deleteCategory (state, setState, id) {
    let result = false;
    setState({loading: true});
    await axios.delete('/api/category/delete', {params: {id: id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        await Alerts.successModal(result.data?.message);
        setState({
            success: result.data?.message,
            loading: false,
        });
        await getCategoriesList(state, setState)
    }
}


export async function addCategoryImage (state, setState, params, ID) {
    let result = false;
    setState({loading: true});
    const formData = new FormData();

    formData.append("image", params.file)
    formData.append("description", params.description)

    await axios.post('/api/category/image/add', formData,{params: {id: ID}, headers: {'Content-Type': 'multipart/form-data'}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        await getCategoryInfo(state, setState);
        setState({
            success: result.data?.description,
            // count: result.data?.count,
            loading: false,
            refreshing: !state.refreshing,
        });
    }
}


export async function deleteCategoryImage(state, setState, id) {
    let result = false;
    setState({loading: true});
    await axios.delete('/api/category/image/delete', {params: {id: id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            success: result.data?.message,
            loading: false,
            refreshing: !state.refreshing,
        });
        // await getCategoriesList(state, setState);
        await getCategoryInfo(state, setState);
    }
}

