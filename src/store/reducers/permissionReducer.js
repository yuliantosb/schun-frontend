const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
	parents: {},
	saved: false,
	message: null,
	permission: {}
};

const permissionReducer = (state = initState, action) => {
	switch (action.type) {
		case 'PERMISSION_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'PERMISSION_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'PERMISSION_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				payload: action.payload.data,
				error: null,
				saved: false,
			};
		case 'PARENT_PENDING' :
			return {
				...state,
				fetching: true
			}
		case 'PARENT_REJECTED' : 
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'PARENT_FULFILLED' :
			return {
				...state,
				fetching: false,
				fetched: true,
				parents: action.payload.data,
				error: null,
				saved: false
			};
		case 'SAVE_PERMISSION_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'SAVE_PERMISSION_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'SAVE_PERMISSION_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
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
				permission: action.payload.data,
				error: null,
				saved: false,
			};
			case 'UPDATE_PERMISSION_PENDING' : 
				return {
					...state,
					fetching: true
				};
			case 'UPDATE_PERMISSION_REJECTED' :
				if (action.payload.response.status === 401) {
					sessionStorage.removeItem('token');
				}
				
				return {
					...state,
					error: action.payload.response,
					fetching: false
				};
			case 'UPDATE_PERMISSION_FULFILLED':
				return {
					...state,
					fetching: false,
					fetched: true,
					message: action.payload.data.message,
					error: null,
					saved: true
				};
			case 'DELETE_PERMISSION_PENDING' : 
				return {
					...state,
					fetching: true
				};
			case 'DELETE_PERMISSION_REJECTED' :
				if (action.payload.response.status === 401) {
					sessionStorage.removeItem('token');
				}
				
				return {
					...state,
					error: action.payload.response,
					fetching: false
				};
			case 'DELETE_PERMISSION_FULFILLED':
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

export default permissionReducer;
