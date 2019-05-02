const initState = {
    response : {
        type: null,
        message: null
    }
}
const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                response: action.response,
            }
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.response.token);
            return {
                ...state,
                response: action.response,
            }
        default:
            return state
    }
}

export default authReducer;