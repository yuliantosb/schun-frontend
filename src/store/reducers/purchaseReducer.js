const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	parents: {},
	saved: false,
	message: null,
	purchase: {},
    isDeleted: false,
};

const purchaseReducer = (state = initState, action) => {
	switch (action.type) {
		case 'PURCHASE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'PURCHASE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'PURCHASE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_PURCHASE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_PURCHASE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_PURCHASE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_PURCHASE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_PURCHASE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_PURCHASE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				purchase: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_PURCHASE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_PURCHASE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_PURCHASE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_PURCHASE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_PURCHASE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_PURCHASE_FULFILLED':
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

export default purchaseReducer;
