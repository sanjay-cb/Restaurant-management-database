import axios from 'axios';
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
} from '../constants/orderConstant';

export const createOrder = (orderData) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });

		// const {
		// 	userLogin: { userInfo },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${userInfo.token}`,
		// 	},
		// };

		const { data } = await axios.post(`/api/v1/orders/orderCreate`, orderData);

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not Authorized, no token') {
			//dispatch(logout());
		}
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		// const {
		// 	userLogin: { userInfo },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${userInfo.token}`,
		// 	},
		// };

		const { data } = await axios.get(`/api/v1/orders/${id}`);
		console.log(data);

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not Authorized, no token') {
			//dispatch(logout());
		}
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: message,
		});
	}
};

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		});

		// const {
		// 	userLogin: { userInfo },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		Authorization: `Bearer ${userInfo.token}`,
		// 	},
		// };

		const { data } = await axios.get(`/api/v1/orders`);

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data.orders,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			//dispatch(logout());
		}
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: message,
		});
	}
};
