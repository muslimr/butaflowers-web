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
    }
}

