const initState = {
    fetching: false,
    fetched: false,
    error: null,
    payload: []
}

const dashboardReducer = (state = initState, action) => {
    switch(action.type) {
        case 'DAILY_PENDING' : 
            return {
                ...state,
                fetching: true
            }
        case 'DAILY_REJECTED':
            return {
                ...state,
                error: action.payload.response,
                fetching: false
            }
        case 'DAILY_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                payload: action.payload.data
            }
        default :
            return state
    }
}

export default dashboardReducer;