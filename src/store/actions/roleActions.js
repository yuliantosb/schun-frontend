import Axios from "axios";
import { url } from "../../global";

const fetchRole = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ROLE',
            payload: Axios.get(`${url}/role`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export {fetchRole};