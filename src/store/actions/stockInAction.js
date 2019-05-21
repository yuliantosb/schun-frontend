import Axios from "axios";
import { url } from "../../global";

const fetchStockIn = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'STOCKIN',
            payload: Axios.get(`${url}/stock-in`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    start_date: filter.startDate,
                    end_date: filter.endDate,
                    keyword: filter.keyword
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const fetchItemList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ITEM_LIST',
            payload: Axios.get(`${url}/stock-in/items`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const saveStockIn = (data) => {
    return (dispatch, getState) => {

        dispatch({
            type: 'ADD_STOCKIN',
            payload: Axios.post(`${url}/stock-in`, {
                item_id: data.item_id,
                price: data.price,
                qty: data.qty,
                stock_in_date: data.stockInDate,
                file: data.fileRaw,
                evidence: data.uploadFile
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export {fetchStockIn, fetchItemList, saveStockIn};