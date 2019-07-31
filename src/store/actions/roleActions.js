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

const getRole = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_ROLE',
            payload: Axios.get(`${url}/role/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateRole = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_ROLE',
            payload: Axios.put(`${url}/role/${id}`, {
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

const deleteRole = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_ROLE',
            payload: Axios.delete(`${url}/role/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export {fetchRole, getPermission, saveRole, getRole, updateRole, deleteRole};