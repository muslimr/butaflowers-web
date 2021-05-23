import {Api} from "../plugins/Api";
import axios from "axios";


// export async function getSubCategoriesList (state, setState) {
//     let response = await Api.get('api/subcategory', {data: {id: state.categoryId}});
//
//     if (response.status === 'success') {
//         setState({data: response.data, loading: false});
//     } else {
//         setState({error: response.description, loading: false});
//     }
// }


export async function getSubCategoriesList (state, setState) {
    let result = false;
    setState({loading: true});
    await axios.get('/api/subcategory/list', {data: {id: state.categoryId}})
        .catch(error => setState({error: error, loading: false}))
        .then(response => {
            result = response;
        });

    if (result) {
        setState({data: result.data?.categories, loading: false});
    }
}
