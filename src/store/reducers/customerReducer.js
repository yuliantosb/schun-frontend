const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	customer: {},
	isDeleted: false,
};

const customerReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CUSTOMER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'CUSTOMER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'CUSTOMER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_CUSTOMER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_CUSTOMER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_CUSTOMER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_CUSTOMER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_CUSTOMER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_CUSTOMER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				customer: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_CUSTOMER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_CUSTOMER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_CUSTOMER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_CUSTOMER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_CUSTOMER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_CUSTOMER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				isDeleted: true
			};
		default:
			return state;
	}
};

export default customerReducer;
