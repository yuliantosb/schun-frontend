const initState = {
    fetching: false,
    fetched: false,
    error: null,
    payload : {},
    itemsList: {},
    addStockInPayload: {}
}

const stockInReducer = (state = initState, action) => {
    switch(action.type) {
        case 'STOCKIN_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'STOCKIN_REJECTED':
            return {
                ...state,
                error: action.payload.response,
                fetching: false,
            }
        case 'STOCKIN_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                payload: action.payload.data,
                error: null
            }
        case 'ITEM_LIST_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'ITEM_LIST_REJECTED':
            return {
                ...state,
                error: action.payload.response,
                fetching: false,
            }
        case 'ITEM_LIST_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                itemsList: action.payload.data,
                error: null
            }
        case 'ADD_STOCKIN_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'ADD_STOCKIN_REJECTED':
            return {
                ...state,
                error: action.payload.response,
                fetching: false,
            }
        case 'ADD_STOCKIN_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                addStockInPayload: action.payload.data,
                error: null
            }
        default:
            return state
    }
}

export default stockInReducer;