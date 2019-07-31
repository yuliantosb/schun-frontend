import axios from "axios";
import { url } from '../../global';

const login = (creds) => {
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

const forgotPassword = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'FORGOT_PASSWORD',
            payload: axios.post(`${url}/forgot-password`, {
                email: data.email
            })
        })
    }
}

const resetPassword = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'RESET_PASSWORD',
            payload: axios.post(`${url}/reset`, {
                email: data.email,
                new_password: data.new_password,
                new_password_confirmation: data.password_confirmation,
                token: data.token
            })
        })
    }
}

export { login, forgotPassword, resetPassword }