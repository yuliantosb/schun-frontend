import Axios from "axios";
import moment from "moment";
import { url } from "../../global";

const fetchCustomer = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CUSTOMER',
            payload: Axios.get(`${url}/customer`, {
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

const saveCustomer = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_CUSTOMER',
            payload: Axios.post(`${url}/customer`, {
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

const getCustomer = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_CUSTOMER',
            payload: Axios.get(`${url}/customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateCustomer = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_CUSTOMER',
            payload: Axios.put(`${url}/customer/${id}`, {
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


const deleteCustomer = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_CUSTOMER',
            payload: Axios.delete(`${url}/customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchCustomer, saveCustomer, getCustomer, updateCustomer, deleteCustomer };