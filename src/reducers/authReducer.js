const initState = {
    fetching: false,
    fetched: false,
    error: null,
    payload : {}
}
const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN' : 
            return {
                ...state,
                fetching: true
            }
        case 'LOGIN_REJECTED':
            return {
                ...state,
                error: action.payload,
                fetching: false
            }
        case 'LOGIN_FULLFILLED':
            // sessionStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                fetching: false,
                fetched: true,
                payload: action.payload,
            }
        default:
            return state
    }
}

export default authReducer;