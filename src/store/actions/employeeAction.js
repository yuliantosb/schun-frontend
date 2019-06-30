import Axios from "axios";
import { url } from "../../global";
import moment from "moment";

const fetchEmployee = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'EMPLOYEE',
            payload: Axios.get(`${url}/employee`, {
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

const saveEmployee = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_EMPLOYEE',
            payload: Axios.post(`${url}/employee`, {
                name: data.name,
                username: data.username,
                place_of_birth: data.place_of_birth,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                password: data.password,
                password_confirmation: data.password_confirmation,
                photo: data.photo,
                email: data.email,
                phone_number: data.phone_number,
                role_id: data.role_id,
                address: data.address,
                file: data.file
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getEmployee = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_EMPLOYEE',
            payload: Axios.get(`${url}/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateEmployee = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_EMPLOYEE',
            payload: Axios.put(`${url}/employee/${id}`, {
                name: data.name,
                username: data.username,
                place_of_birth: data.place_of_birth,
                date_of_birth: moment(data.date_of_birth).format('YYYY-MM-DD'),
                password: data.password,
                password_confirmation: data.password_confirmation,
                photo: data.photo,
                email: data.email,
                phone_number: data.phone_number,
                role_id: data.role_id,
                address: data.address,
                file: data.file
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const deleteEmployee = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_EMPLOYEE',
            payload: Axios.delete(`${url}/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { saveEmployee, fetchEmployee, getEmployee, updateEmployee, deleteEmployee }