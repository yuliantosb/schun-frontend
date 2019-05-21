import axios from "axios";
import { url } from '../../global';

export const login = (creds) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGIN',
            payload: axios.post(`${url}/login`, {
                email: creds.email,
                password: creds.password
            })
        })
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGOUT',
            payload: axios.post(`${url}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        })
    }
}