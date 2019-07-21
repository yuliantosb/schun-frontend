const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	parents: {},
	saved: false,
	message: null,
	stockOpname: {},
    isUpdated: false,
};

const stockOpnameReducer = (state = initState, action) => {
	switch (action.type) {
		case 'STOCK_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'STOCK_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'STOCK_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isUpdated: false
			};
		case 'GET_STOCK_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_STOCK_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_STOCK_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				stockOpname: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_STOCK_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_STOCK_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_STOCK_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				isUpdated: true
			};
		default:
			return state;
	}
};

export default stockOpnameReducer;
