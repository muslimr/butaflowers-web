import {Api} from "../plugins/Api";


export async function getCategoriesList (state, setState) {
    let response = await Api.get('api/category', {});

    console.log('RESPONSEEEO', response)

    if (response.status === 'success') {
        setState({data: response.data, loading: false});
    } else {
        setState({error: response.description, loading: false});
    }
}


// export async function addCategory (state, setState) {
//     let response = await Api.get('api/category/add', {});
//
//     if (response.status === 'success') {
//         setState({data: response.data, loading: false});
//     } else {
//         setState({error: response.description, loading: false});
//     }
// }

