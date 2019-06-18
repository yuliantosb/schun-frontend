const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	category: {},
	isDeleted: false
};

const categoryReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CATEGORY_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'CATEGORY_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'CATEGORY_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
				isDeleted: false
			};
		case 'SAVE_CATEGORY_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_CATEGORY_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_CATEGORY_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_CATEGORY_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_CATEGORY_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_CATEGORY_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				category: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_CATEGORY_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_CATEGORY_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_CATEGORY_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_CATEGORY_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_CATEGORY_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_CATEGORY_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true,
				isDeleted: true
			};
		default:
			return state;
	}
};

export default categoryReducer;
