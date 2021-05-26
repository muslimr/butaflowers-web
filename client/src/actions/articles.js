import axios from "axios";


export async function getArticlesList (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.get('/api/article/list', {params: {id: state.subCategoryId}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({data: result.data?.data, loading: false});
    }
}


export async function addArticle (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.post('/api/article/add', {params: state.addData})
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


