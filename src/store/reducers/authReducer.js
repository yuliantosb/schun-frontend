const initState = {
    fetching: false,
    fetched: false,
    error: null,
    payload : {},
    logout: false,
}
const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_PENDING' : 
            return {
                ...state,
                fetching: true
            }
        case 'LOGIN_REJECTED':
            return {
                ...state,
                error: action.payload.response ? action.payload.response.data.message : action.payload.message,
                fetching: false
            }
        case 'LOGIN_FULFILLED':
            sessionStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                fetching: false,
                fetched: true,
                payload: action.payload,
            }
        case 'LOGOUT_PENDING' : 
            return {
                ...state,
                fetching: true
            }
        case 'LOGOUT_REJECTED':
            return {
                ...state,
                error: action.payload.response.data.message,
                fetching: false
            }
        case 'LOGOUT_FULFILLED':
            sessionStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                fetching: false,
                fetched: true,
                payload: action.payload,
                logout: true
            }
        default:
            return state
    }
}

export default authReducer;