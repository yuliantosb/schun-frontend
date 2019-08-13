import Axios from "axios";
import { url } from "../../global";

const fetchStockOpname = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'STOCK',
            payload: Axios.get(`${url}/stock`, {
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

const getStockOpname = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_STOCK',
            payload: Axios.get(`${url}/stock/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateStockOpname = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_STOCK',
            payload: Axios.put(`${url}/stock/${id}`, {
                stock: data.stock,
                notes: data.notes
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


export { fetchStockOpname, getStockOpname, updateStockOpname }