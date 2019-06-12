const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	parents: {},
	saved: false,
	message: null,
	employee: {}
};

const employeeReducer = (state = initState, action) => {
	switch (action.type) {
		case 'EMPLOYEE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'EMPLOYEE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'EMPLOYEE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
			};
		case 'SAVE_EMPLOYEE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_EMPLOYEE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'SAVE_EMPLOYEE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'GET_EMPLOYEE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_EMPLOYEE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_EMPLOYEE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				employee: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_EMPLOYEE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_EMPLOYEE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_EMPLOYEE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
			};
		case 'DELETE_EMPLOYEE_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'DELETE_EMPLOYEE_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'DELETE_EMPLOYEE_FULFILLED':
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

export default employeeReducer;
