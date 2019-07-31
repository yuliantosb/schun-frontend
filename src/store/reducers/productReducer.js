const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	product: {},
	isDeleted: false,
};

const productReducer = (state = initState, action) => {
	switch (action.type) {
		case 'PRODUCT_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'PRODUCT_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'PRODUCT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_PRODUCT_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_PRODUCT_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_PRODUCT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_PRODUCT_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_PRODUCT_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_PRODUCT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				product: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_PRODUCT_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_PRODUCT_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_PRODUCT_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_PRODUCT_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_PRODUCT_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_PRODUCT_FULFILLED':
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

export default productReducer;
