import axios from 'axios';
import {
	ITEM_ADD_FAIL,
	ITEM_ADD_REQUEST,
	ITEM_ADD_SUCCESS,
	ITEM_DELETE_FAIL,
	ITEM_DELETE_REQUEST,
	ITEM_DELETE_SUCCESS,
	ITEM_DETAILS_FAIL,
	ITEM_DETAILS_REQUEST,
	ITEM_DETAILS_SUCCESS,
	ITEM_UPDATE_FAIL,
	ITEM_UPDATE_REQUEST,
	ITEM_UPDATE_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from '../constants/productConstant';

export const listItems = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await axios.get('/api/v1/items');

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listItemDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ITEM_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/items/${id}`);
		dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data.item[0] });
	} catch (error) {
		dispatch({
			type: ITEM_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addItem = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ITEM_ADD_REQUEST,
		});

		// const {
		// 	userLogin: { userInfo },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${userInfo.token}`,
		// 	},
		// };

		const { data } = await axios.post(`/api/v1/items`, product);

		dispatch({
			type: ITEM_ADD_SUCCESS,
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
			type: ITEM_ADD_FAIL,
			payload: message,
		});
	}
};

export const updateItem = (item) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ITEM_UPDATE_REQUEST,
		});

		const { data } = await axios.patch(`/api/v1/items/${item.item_id}`, item);

		dispatch({
			type: ITEM_UPDATE_SUCCESS,
			payload: data.item,
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
			type: ITEM_UPDATE_FAIL,
			payload: message,
		});
	}
};

export const deleteItem = (id) => async (dispatch) => {
	try {
		dispatch({
			type: ITEM_DELETE_REQUEST,
		});

		// const {
		// 	userLogin: { userInfo },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		Authorization: `Bearer ${userInfo.token}`,
		// 	},
		// };

		await axios.delete(`/api/v1/items/${id}`);

		dispatch({
			type: ITEM_DELETE_SUCCESS,
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
			type: ITEM_DELETE_FAIL,
			payload: message,
		});
	}
};
