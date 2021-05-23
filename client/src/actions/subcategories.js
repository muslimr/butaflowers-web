import axios from "axios";


export async function getSubCategoriesList(state, setState) {
    let result = false;
    setState({loading: true});
    await axios.get('/api/subcategory/list', {params: {id: state.categoryId}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({data: result.data?.data, loading: false});
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
            // data: result.data?.categories,
            // count: result.data?.count,
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
