import {
	BILL_LIST_FAIL,
	BILL_LIST_REQUEST,
	BILL_LIST_SUCCESS,
} from '../constants/billConstant';

export const billListReducer = (state = { bills: [] }, action) => {
	switch (action.type) {
		case BILL_LIST_REQUEST:
			return { loading: true, bills: [] };
		case BILL_LIST_SUCCESS:
			return {
				loading: false,
				bills: action.payload,
			};
		case BILL_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
