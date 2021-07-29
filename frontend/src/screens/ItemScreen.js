import React, { useEffect, useState } from 'react';
import {
	Col,
	Row,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { listItemDetails } from '../actions/itemActions';
import { createOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import { ORDER_LIST_RESET } from '../constants/orderConstant';

const ItemScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();

	const itemDetails = useSelector((state) => state.itemDetails);
	const { loading, item } = itemDetails;

	const orderCreate = useSelector((state) => state.orderCreate);
	const { success, order } = orderCreate;
	console.log(orderCreate);

	useEffect(() => {
		dispatch(listItemDetails(match.params.id));
		if (success) {
			history.push(`/order/${order.id}`);
		}
	}, [dispatch, match, history, success, order]);

	const placeOrder = () => {
		dispatch({ type: ORDER_LIST_RESET });
		dispatch(
			createOrder({
				customer_id: Math.floor(Math.random() * 6) + 1,
				order_no: Number(Date.now().toString().slice(5, 12)),
				no_of_items: qty,
				items: item.item_name,
				totalPrice: Number(qty * item.item_price),
			})
		);
	};

	return (
		<>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : (
				<>
					<Row>
						<Col md={6}>
							<Image src={`${item.photo}`} alt={item.photo} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>{item.item_name}</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>Price: &#8377;{item.item_price}</h4>
								</ListGroup.Item>
								<ListGroup>Description: {item.item_description}</ListGroup>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong> &#8377; {item.item_price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status: </Col>
											<Col>
												{item.item_qty > 0 ? 'In Stock' : 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{item.item_qty > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => {
															setQty(e.target.value);
														}}
													>
														{[...Array(item.item_qty).keys()].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button
											className='btn-block'
											onClick={placeOrder}
											disabled={item.item_qty === 0}
										>
											Place Your Order
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ItemScreen;
