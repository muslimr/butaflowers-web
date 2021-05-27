import axios from "axios";
import {getSubCategoriesList} from "./subcategories";


export async function getArticlesList (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.get('/api/article/list', {params: {id: state.subcategory_id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({data: result.data?.data, loading: false});
    }
}


export async function getArticleInfo (state, setState) {
    let result = false;
    // setState({loading: true});
    await axios.get('/api/article/info', {params: {id: state.id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response)

    if (result) {
        setState({
            article_info: result.data?.data,
            // count: result.data?.count,
            loading: false,
        });
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


export async function editArticle (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.put('/api/article/edit', {id: state.id, data: state.article_info})
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


export async function deleteArticle (state, setState, id) {
    let result = false;
    setState({loading: true});
    await axios.delete('/api/article/delete', {params: {id: id}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        setState({
            success: result.data?.message,
            loading: false,
        });
        await getArticlesList(state, setState);
    }
}


