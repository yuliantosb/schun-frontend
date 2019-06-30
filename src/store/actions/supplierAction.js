import Axios from "axios";
import moment from "moment";
import { url } from "../../global";

const fetchSupplier = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SUPPLIER',
            payload: Axios.get(`${url}/supplier`, {
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

const saveSupplier = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_SUPPLIER',
            payload: Axios.post(`${url}/supplier`, {
                name: data.name,
                place_of_birth: data.place_of_birth,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                email: data.email,
                phone_number: data.phone_number,
                address: data.address,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getSupplier = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_SUPPLIER',
            payload: Axios.get(`${url}/supplier/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateSupplier = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_SUPPLIER',
            payload: Axios.put(`${url}/supplier/${id}`, {
                name: data.name,
                place_of_birth: data.place_of_birth,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                email: data.email,
                phone_number: data.phone_number,
                address: data.address,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deleteSupplier = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_SUPPLIER',
            payload: Axios.delete(`${url}/supplier/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchSupplier, saveSupplier, getSupplier, updateSupplier, deleteSupplier };