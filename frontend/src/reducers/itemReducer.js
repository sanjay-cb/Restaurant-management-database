import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	ITEM_DETAILS_FAIL,
	ITEM_DETAILS_REQUEST,
	ITEM_DETAILS_SUCCESS,
	ITEM_ADD_REQUEST,
	ITEM_ADD_SUCCESS,
	ITEM_ADD_FAIL,
	ITEM_ADD_RESET,
	ITEM_UPDATE_REQUEST,
	ITEM_UPDATE_SUCCESS,
	ITEM_UPDATE_FAIL,
	ITEM_UPDATE_RESET,
	ITEM_DELETE_REQUEST,
	ITEM_DELETE_FAIL,
	ITEM_DELETE_SUCCESS,
} from '../constants/productConstant';

export const itemListReducer = (state = { items: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, items: [] };
		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				items: action.payload.items,
			};
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const itemDetailsReducer = (state = { item: [] }, action) => {
	switch (action.type) {
		case ITEM_DETAILS_REQUEST:
			return { loading: true, ...state };
		case ITEM_DETAILS_SUCCESS:
			return { loading: false, item: action.payload };
		case ITEM_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const itemAddReducer = (state = { item: {} }, action) => {
	switch (action.type) {
		case ITEM_ADD_REQUEST:
			return { loading: true };
		case ITEM_ADD_SUCCESS:
			return { loading: false, success: true, item: action.payload };
		case ITEM_ADD_FAIL:
			return { loading: false, error: action.payload };
		case ITEM_ADD_RESET:
			return { item: {} };
		default:
			return state;
	}
};

export const itemUpdateReducer = (state = { item: {} }, action) => {
	switch (action.type) {
		case ITEM_UPDATE_REQUEST:
			return { loading: true };
		case ITEM_UPDATE_SUCCESS:
			return { loading: false, success: true, item: action.payload };
		case ITEM_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case ITEM_UPDATE_RESET:
			return { product: {} };
		default:
			return state;
	}
};

export const itemDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ITEM_DELETE_REQUEST:
			return { loading: true };
		case ITEM_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ITEM_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
