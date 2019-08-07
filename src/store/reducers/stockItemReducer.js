const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	sales: {},
	isDeleted: false,
};

const stockItemReducer = (state = initState, action) => {
	switch (action.type) {
		case 'STOCK_ITEM_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'STOCK_ITEM_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'STOCK_ITEM_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
            };
        default:
            return state;
        }
    };
    
export default stockItemReducer;
    