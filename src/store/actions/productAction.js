import Axios from "axios";
import { url } from "../../global";

const fetchProduct = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'PRODUCT',
            payload: Axios.get(`${url}/products`, {
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

const saveProduct = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_PRODUCT',
            payload: Axios.post(`${url}/products`, {
                code: data.code,
                name: data.name,
                price: data.price,
                cost: data.cost,
                wholesale: data.wholesale,
                stock: data.stock,
                picture: data.picture,
                file: data.file,
                description: data.description,
                category_id: data.category_id,

            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_PRODUCT',
            payload: Axios.get(`${url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateProduct = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_PRODUCT',
            payload: Axios.put(`${url}/products/${id}`, {
                code: data.code,
                name: data.name,
                price: data.price,
                wholesale: data.wholesale,
                cost: data.cost,
                stock: data.stock,
                picture: data.picture,
                file: data.file,
                description: data.description,
                category_id: data.category_id,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const inactiveProduct = (id, status) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'INACTIVE_PRODUCT',
            payload: Axios.delete(`${url}/products/inactive/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
                data: {
                    status
                }
            })
        })
    }
}


const deleteProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_PRODUCT',
            payload: Axios.delete(`${url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchProduct, saveProduct, getProduct, updateProduct, inactiveProduct, deleteProduct };