import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	itemAddReducer,
	itemDeleteReducer,
	itemDetailsReducer,
	itemListReducer,
	itemUpdateReducer,
} from './reducers/itemReducer';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListReducer,
} from './reducers/orderReducer';
import { billListReducer } from './reducers/billReducer';

const middleware = [thunk];
const reducer = combineReducers({
	itemsList: itemListReducer,
	itemDetails: itemDetailsReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	addItem: itemAddReducer,
	orderList: orderListReducer,
	billList: billListReducer,
	itemUpdate: itemUpdateReducer,
	itemDelete: itemDeleteReducer,
});
const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
