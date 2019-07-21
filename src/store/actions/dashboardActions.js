import axios from "axios";
import { url } from '../../global';

const daily = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DAILY',
            payload: axios.get(`${url}/dashboard/daily`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}


export {daily}