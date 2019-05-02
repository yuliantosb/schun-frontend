import axios from 'axios';
export const login = (credentials) => {
    return async (dispatch, getState) => {
        await axios.post('http://localhost:8000/api/login', {
            email: credentials.email,
            password: credentials.password
        }).then((res) => {
            dispatch({
                type: 'LOGIN_SUCCESS',
                response: res.data
            });
        }).catch((err) => {
            dispatch({
                type: 'LOGIN_ERROR',
                response: err.response.data
            });
        });
    }
}