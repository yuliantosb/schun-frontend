import Axios from "axios";
import moment from "moment";

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
			moment.locale('id');
			const data = action.payload.data.data;
			if (!data.is_hold) {
				Axios.post('http://localhost:3002', {
					items: data.details,
					subtotal: data.subtotal,
					tax: data.tax ? data.tax : 0,
					discount: data.discount ? data.discount : 0,
					total: data.total,
					payment_type: data.payment_type === 'cash' ? 'Tunai' : 'Kartu (EDC)',
					amount: data.amount,
					changes: data.changes ? data.changes : 0,
					cashier: sessionStorage.getItem('name'),
					date: moment(new Date()).format('dd, MMM D YYYY, hh:mm:ss a'),
					_id: data._id,
				}).then(response => console.log('Printed'));
			}
			

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
