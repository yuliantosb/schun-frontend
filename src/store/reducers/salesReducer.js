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

const salesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SALES_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'SALES_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'SALES_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_SALES_PENDING' : 
			return {
				...state,
                fetching: true,
                saved: false,
			};
		case 'SAVE_SALES_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
                fetched: false
			};
		case 'SAVE_SALES_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_SALES_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_SALES_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_SALES_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				sales: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_SALES_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_SALES_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_SALES_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_SALES_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_SALES_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_SALES_FULFILLED':
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

export default salesReducer;
