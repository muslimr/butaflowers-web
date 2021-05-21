import {Api} from "../plugins/Api";


export async function getSubCategoriesList (state, setState) {
    let response = await Api.get('api/subcategory', {data: {id: state.categoryId}});

    if (response.status === 'success') {
        setState({data: response.data, loading: false});
    } else {
        setState({error: response.description, loading: false});
    }
}
