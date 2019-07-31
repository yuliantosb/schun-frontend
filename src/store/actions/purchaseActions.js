import Axios from "axios";
import { url } from "../../global";
import moment from "moment";

const fetchPurchase = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'PURCHASE',
            payload: Axios.get(`${url}/purchase`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword,
                    start_date: moment(filter.startDate).format('YYYY-MM-DD'),
                    end_date: moment(filter.endDate).format('YYYY-MM-DD'),
                    ordering: filter.ordering
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const savePurchase = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_PURCHASE',
            payload: Axios.post(`${url}/purchase`, {
                subtotal: data.subtotal,
                tax: data.tax,
                discount: data.discount,
                file: data.file,
                evidence: data.evidence,
                notes: data.notes,
                percent: data.percent,
                reference: data.reference,
                supplier_id: data.supplier_id,
                supplier_name: data.supplier_name,
                tax: data.taxes,
                user_id: data.user_id,
                user_name: data.user_name,
                total: data.total,
                details: data.carts
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getPurchase = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_PURCHASE',
            payload: Axios.get(`${url}/purchase/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updatePurchase = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_PURCHASE',
            payload: Axios.put(`${url}/purchase/${id}`, {
                subtotal: data.subtotal,
                tax: data.tax,
                discount: data.discount,
                file: data.file,
                evidence: data.evidence,
                notes: data.notes,
                percent: data.percent,
                reference: data.reference,
                supplier_id: data.supplier_id,
                supplier_name: data.supplier_name,
                tax: data.taxes,
                user_id: data.user_id,
                user_name: data.user_name,
                total: data.total,
                details: data.carts
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const deletePurchase = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_PURCHASE',
            payload: Axios.delete(`${url}/purchase/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { savePurchase, fetchPurchase, getPurchase, updatePurchase, deletePurchase }