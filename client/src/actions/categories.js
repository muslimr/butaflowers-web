import {Api} from "../plugins/Api";


export async function getCategoriesList (state, setState) {
    let response = await Api.get("api/category/list");

    // console.log(response);

    if (response.status === 'success') {
        setState({data: response.data, loading: false});
    } else {
        setState({error: response.description, loading: false});
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

