const initState = {
    fetching: false,
    fetched: false,
    error: null,
    payload : {},
    logout: false,
    message: '',
    saved: false,
}

const passwordReducer = (state = initState, action) => {
    switch(action.type) {
        case 'FORGOT_PASSWORD_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'FORGOT_PASSWORD_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'FORGOT_PASSWORD_FULFILLED':
			return {
				...state,
				fetching: false,
				fetched: true,
				message: action.payload.data.message,
				error: null,
				saved: true
            };
        case 'RESET_PASSWORD_PENDING' : 
			return {
				...state,
				fetching: true
			};
		case 'RESET_PASSWORD_REJECTED' :
			if (action.payload.response.status === 401) {
				sessionStorage.removeItem('token');
			}
			
			return {
				...state,
				error: action.payload.response,
				fetching: false,
				fetched: false
			};
		case 'RESET_PASSWORD_FULFILLED':
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
}

export default passwordReducer;