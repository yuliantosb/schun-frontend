import Axios from "axios";
import { url } from "../../global";

const fetchSales = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SALES',
            payload: Axios.get(`${url}/sales`, {
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

const saveSales = (data, {is_hold, id}) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_SALES',
            payload: Axios.post(`${url}/sales`, {
                customer_id: data.customer_id,
                tax: data.taxes,
                discount: data.discount,
                details: data.carts,
                payment_type: data.payment_type,
                card_number: data.card_number,
                card_expired: data.card_expired,
                amount: data.amount,
                changes: data.changes,
                is_hold,
                id
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getSales = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_SALES',
            payload: Axios.get(`${url}/sales/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getCart = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_SALES',
            payload: Axios.get(`${url}/sales/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateSales = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_SALES',
            payload: Axios.put(`${url}/sales/${id}`, {
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


const deleteSales = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_SALES',
            payload: Axios.delete(`${url}/sales/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchSales, saveSales, getSales, updateSales, deleteSales, getCart };