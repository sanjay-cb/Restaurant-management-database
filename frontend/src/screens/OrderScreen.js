import React, { useEffect } from 'react';
import { ListGroup, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';
import { ORDER_RESET } from '../constants/orderConstant';

const OrderScreen = ({ match }) => {
	const id = match.params.id;
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	console.log(orderDetails);
	const { order, loading } = orderDetails;

	useEffect(() => {
		dispatch({ type: ORDER_RESET });
		if (!order) {
			dispatch(getOrderDetails(id));
		}
	}, [dispatch, order, id]);

	return loading ? (
		<Loader />
	) : (
		<Card style={{ width: '50rem', marginLeft: '7rem' }}>
			<div
				style={{
					fontSize: 18,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: '3rem',
					marginBottom: '2rem',
				}}
			>
				<i class='fas fa-utensils fa-10x'></i>
			</div>

			<Card.Body>
				<Card.Title
					style={{
						marginLeft: '16rem',
						marginRight: 'auto',
						fontSize: 25,
						letterSpacing: '5px',
					}}
				>
					ORDER PLACED
				</Card.Title>
				<Card.Text style={{ marginLeft: '14rem' }}>
					You will get your order soon on your table
				</Card.Text>
				<Card.Text style={{ fontSize: '18px' }}>Order Summary</Card.Text>
			</Card.Body>
			<ListGroup className='list-group-flush'>
				<ListGroupItem style={{ fontSize: '15px', fontWeight: 'bold' }}>
					ORDER NO: <strong>{order[0].order_no}</strong>
				</ListGroupItem>
				<ListGroupItem style={{ fontSize: '15px', fontWeight: 'bold' }}>
					ITEM: <strong>{order[0].items}</strong>
				</ListGroupItem>
			</ListGroup>
		</Card>
	);
};

export default OrderScreen;
