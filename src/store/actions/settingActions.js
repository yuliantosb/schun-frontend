import Axios from "axios";
import { url } from "../../global";

const fetchSetting = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SETTING',
            payload: Axios.get(`${url}/setting`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

const updateSetting = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATE_SETTING',
            payload: Axios.put(`${url}/setting`, {
                'site_name': data.site_name,
                'logo': data.logo,
                'file': data.file,
                'currency': data.currency,
                'thousand_separator': data.thousand_separator,
                'decimal_separator': data.decimal_separator,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}

export { fetchSetting, updateSetting }