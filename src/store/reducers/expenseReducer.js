const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	parents: {},
	saved: false,
	message: null,
	expense: {}
};

const expenseReducer = (state = initState, action) => {
	switch (action.type) {
		case 'EXPENSE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'EXPENSE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'EXPENSE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
			};
		case 'SAVE_EXPENSE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_EXPENSE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_EXPENSE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_EXPENSE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_EXPENSE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_EXPENSE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				expense: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_EXPENSE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_EXPENSE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_EXPENSE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_EXPENSE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_EXPENSE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_EXPENSE_FULFILLED':
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

export default expenseReducer;
