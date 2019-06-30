import Axios from "axios";
import { url } from "../../global";

const fetchStore = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'STORE',
            payload: Axios.get(`${url}/store`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword,
                    ordering: filter.ordering
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const saveStore = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_STORE',
            payload: Axios.post(`${url}/store`, {
                name: data.name,
                phone_number: data.phone_number,
                address: data.address
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getStore = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_STORE',
            payload: Axios.get(`${url}/store/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateStore = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_STORE',
            payload: Axios.put(`${url}/store/${id}`, {
                name: data.name,
                phone_number: data.phone_number,
                address: data.address
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const deleteStore = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_STORE',
            payload: Axios.delete(`${url}/store/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { saveStore, fetchStore, getStore, updateStore, deleteStore }