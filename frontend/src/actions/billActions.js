import {
	BILL_LIST_FAIL,
	BILL_LIST_REQUEST,
	BILL_LIST_SUCCESS,
} from '../constants/billConstant';
import axios from 'axios';

export const listBills = () => async (dispatch) => {
	try {
		dispatch({ type: BILL_LIST_REQUEST });

		const { data } = await axios.get('/api/v1/bills');

		dispatch({ type: BILL_LIST_SUCCESS, payload: data.bills });
	} catch (error) {
		dispatch({
			type: BILL_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
