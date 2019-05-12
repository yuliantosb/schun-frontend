import axios from 'axios';
const test = () => {
    return (dispatch, getState) => {
        axios.get('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'FETCH_SUCCESS',
                response: res.data
            })
        }).catch(err => {
            dispatch({
                type: 'FETCH_FAILED',
                response: err.response.data
            })
        })
    }
}

export default test;