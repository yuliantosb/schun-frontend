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

const getPermission = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_PERMISSION',
            payload: Axios.get(`${url}/role/permissions`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const saveRole = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_ROLE',
            payload: Axios.post(`${url}/role`, {
                name: data.name,
                description: data.description,
                permissions: data.permissions
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export {fetchRole, getPermission, saveRole};