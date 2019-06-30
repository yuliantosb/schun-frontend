import Axios from "axios";
import moment from "moment";
import { url } from "../../global";

const fetchDiscount = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DISCOUNT',
            payload: Axios.get(`${url}/discount`, {
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

const saveDiscount = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_DISCOUNT',
            payload: Axios.post(`${url}/discount`, {
                name: data.name,
                amount: data.amount,
                description: data.description,
                type: data.type,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getDiscount = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_DISCOUNT',
            payload: Axios.get(`${url}/discount/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateDiscount = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_DISCOUNT',
            payload: Axios.put(`${url}/discount/${id}`, {
                name: data.name,
                amount: data.amount,
                description: data.description,
                type: data.type,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deleteDiscount = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_DISCOUNT',
            payload: Axios.delete(`${url}/discount/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchDiscount, saveDiscount, getDiscount, updateDiscount, deleteDiscount };