import axios from "axios";


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


export async function addSubCategory (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.post('/api/subcategory/add', {params: state.addData})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
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
