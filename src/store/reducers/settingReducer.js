const initState = {
	fetching: false,
	fetched: false,
	error: null,
	saved: false,
	message: null,
	setting: {}
};

const settingReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SETTING_PENDING':
			return {
				...state,
				fetching: true
			};
		case 'SETTING_REJECTED':
			
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false
			};
		case 'SETTING_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				setting: action.payload.data,
				error: null,
				saved: false,
			};
		case 'UPDATE_SETTING_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'UPDATE_SETTING_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'UPDATE_SETTING_FULFILLED':
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

export default settingReducer;
