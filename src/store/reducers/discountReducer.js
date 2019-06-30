const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	discount: {},
	isDeleted: false,
};

const discountReducer = (state = initState, action) => {
	switch (action.type) {
		case 'DISCOUNT_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'DISCOUNT_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DISCOUNT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_DISCOUNT_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_DISCOUNT_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_DISCOUNT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_DISCOUNT_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_DISCOUNT_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_DISCOUNT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				discount: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_DISCOUNT_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_DISCOUNT_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_DISCOUNT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_DISCOUNT_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_DISCOUNT_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_DISCOUNT_FULFILLED':
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

export default discountReducer;
