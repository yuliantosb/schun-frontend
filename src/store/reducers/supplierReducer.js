const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	supplier: {}
};

const supplierReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SUPPLIER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'SUPPLIER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'SUPPLIER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
			};
		case 'SAVE_SUPPLIER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_SUPPLIER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_SUPPLIER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_SUPPLIER_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_SUPPLIER_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_SUPPLIER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				supplier: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_SUPPLIER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_SUPPLIER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_SUPPLIER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_SUPPLIER_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_SUPPLIER_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_SUPPLIER_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		default:
			return state;
	}
};

export default supplierReducer;
