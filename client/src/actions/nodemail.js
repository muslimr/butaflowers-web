import axios from "axios";
import {Alerts} from "../plugins/Alerts";


export async function sendPriceList (state, setState) {
    let result = false;
    setState({loading: true});

    await axios.post('/api/nodemail/send',{params: state.dataToSend})
        .catch(error => setState({error: error, loading: false}))
        .then(response => result = response);

    if (result) {
        await Alerts.successModal(result.data?.description)
        setState({
            success: result.data?.description,
            // count: result.data?.count,
            loading: false,
        });
    }
}
