const initState = {
    response : {
        type: null,
        message: null
    }
}
const testReducer = (state = initState, action) => {
    switch(action.type) {
        case 'FETCH_SUCCESS':
            console.log(action);
            return {
                ...state,
                response: action.response,
            }
        case 'FETCH_FAILED':
            sessionStorage.removeItem('token');
            return {
                ...state,
                response: action.response,
            }
        default:
            return state
    }
}

export default testReducer;