import Axios from "axios";
import { url } from "../../global";
import moment from "moment";

const fetchStockItem = (filter) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'STOCK_ITEM',
            payload: Axios.get(`${url}/stock-item`, {
                params: {
                    page: filter.page,
                    perpage: filter.perpage,
                    keyword: filter.keyword,
                    ordering: filter.ordering,
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

export { fetchStockItem }