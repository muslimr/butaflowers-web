import {Api} from "../plugins/Api";
import axios from "axios";


export async function getCategoriesList (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.get('/api/category/list')
        .catch(error => setState({error: error, loading: false}))
        .then(response => {
            result = response;
        });

    if (result) {
        setState({
            data: result.data?.categories,
            count: result.data?.count,
            loading: false,
        });
    }
}


export async function addCategory (state, setState, refresh) {
    let response = await Api.post("api/category/add", {data: state.addData});

    if (response.status === 'success') {
        setState({success: response.description, loading: false});
        // await getCategoriesList(state, setState);
        // refresh()
    } else {
        setState({error: response.description, loading: false});
    }
}

