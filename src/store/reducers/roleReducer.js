const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	saved: false,
	message: null,
	permission: {}
};

const roleReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ROLE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'ROLE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'ROLE_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false
			};
		case 'GET_PERMISSION_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'GET_PERMISSION_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'GET_PERMISSION_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				permissions: action.payload.data,
				error: null
			};
		case 'SAVE_ROLE_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'SAVE_ROLE_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'SAVE_ROLE_FULFILLED':
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

export default roleReducer;
