import React, { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
//import { ORDER_RESET } from '../constants/orderConstant';

const OrderListScreen = () => {
	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, orders } = orderList;

	console.log(orderList);

	useEffect(() => {
		dispatch(listOrders());
	}, [dispatch]);

	return (
		<>
			<Link
				to='/'
				onClick={() => {
					window.location.assign('/');
				}}
				className='btn btn-light my-3'
			>
				Go Back
			</Link>
			<Row className='align-items-center'>
				<Col>
					<h1>Orders</h1>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>Customer ID</th>
								<th>Order ID</th>
								<th>Qty</th>
								<th>Item</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.order_no}>
									<td>{order.customer_id}</td>
									<td>{order.order_no}</td>
									<td>{order.no_of_items}</td>
									<td>{order.items}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default OrderListScreen;
