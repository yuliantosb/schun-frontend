const initState = {
	fetching: false,
	fetched: false,
	error: null,
	payload: {},
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
				error: null
			};
		default:
			return state;
	}
};

export default roleReducer;
