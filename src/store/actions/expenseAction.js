import Axios from "axios";
import { url } from "../../global";
import moment from "moment";

const fetchExpense = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'EXPENSE',
            payload: Axios.get(`${url}/expense`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword,
                    start_date: moment(filter.startDate).format('YYYY-MM-DD'),
                    end_date: moment(filter.endDate).format('YYYY-MM-DD'),
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const saveExpense = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_EXPENSE',
            payload: Axios.post(`${url}/expense`, {
                reference: data.reference,
                amount: data.amount,
                notes: data.notes,
                user_id: data.user_id,
                evidence: data.evidence,
                file: data.file
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const getExpense = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_EXPENSE',
            payload: Axios.get(`${url}/expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateExpense = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SAVE_EXPENSE',
            payload: Axios.put(`${url}/expense/${id}`, {
                reference: data.reference,
                amount: data.amount,
                notes: data.notes,
                user_id: data.user_id,
                evidence: data.evidence,
                file: data.file
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const deleteExpense = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: Axios.delete(`${url}/expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { saveExpense, fetchExpense, getExpense, updateExpense, deleteExpense }