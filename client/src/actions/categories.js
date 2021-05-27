import axios from "axios";


export async function getCategoriesList (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.get('/api/category/list')
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            data: result.data?.categories,
            // count: result.data?.count,
            loading: false,
        });
    }
}


export async function getCategoryInfo (state, setState) {
    let result = false;
    // setState({loading: true});
    await axios.get('/api/category/info', {params: {id: state.id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response)

    if (result) {
        console.log('RESULT', result)
        await setState({
            category_info: result.data?.data,
            // count: result.data?.count,
            loading: false,
        });
    }
}


export async function addCategory (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.post('/api/category/add', {params: state.addData})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            // data: result.data?.categories,
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
        setState({
            success: result.data?.message,
            loading: false,
        });
        await getCategoriesList(state, setState)
    }
}

