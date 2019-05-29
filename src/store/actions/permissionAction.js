import Axios from "axios";
import { url } from "../../global";

const fetchPermission = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'PERMISSION',
            payload: Axios.get(`${url}/permission`, {
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

const fetchParent = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'PARENT',
            payload: Axios.get(`${url}/permission/parent`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const savePermission = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_PERMISSION',
            payload: Axios.post(`${url}/permission`, {
                name: data.name,
                description: data.description,
                parent_id: data.parent_id
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getPermission = id => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_PERMISSION',
            payload: Axios.get(`${url}/permission/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updatePermission = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_PERMISSION',
            payload: Axios.put(`${url}/permission/${id}`, {
                name: data.name,
                description: data.description,
                parent_id: data.parent_id
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const deletePermission = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_PERMISSION',
            payload: Axios.delete(`${url}/permission/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export {fetchPermission, fetchParent, savePermission, getPermission, updatePermission, deletePermission};