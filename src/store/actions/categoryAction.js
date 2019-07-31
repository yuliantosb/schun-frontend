import Axios from "axios";
import { url } from "../../global";

const fetchCategory = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CATEGORY',
            payload: Axios.get(`${url}/category`, {
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

const saveCategory = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_CATEGORY',
            payload: Axios.post(`${url}/category`, {
                name: data.name,
                parent_id: data.parent_id,
                description: data.description,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getCategory = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_CATEGORY',
            payload: Axios.get(`${url}/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateCategory = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_CATEGORY',
            payload: Axios.put(`${url}/category/${id}`, {
                name: data.name,
                parent_id: data.parent_id,
                description: data.description,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


const deleteCategory = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_CATEGORY',
            payload: Axios.delete(`${url}/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        });
    }
}

export { fetchCategory, saveCategory, getCategory, updateCategory, deleteCategory };