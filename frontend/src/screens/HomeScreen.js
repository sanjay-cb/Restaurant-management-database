import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import { Item } from '../components/Item';
import Loader from '../components/Loader';
import { listItems } from '../actions/itemActions';

const HomeScreen = ({ match }) => {
	const dispatch = useDispatch();
	const itemsList = useSelector((state) => state.itemsList);

	console.log(itemsList);
	const { loading, items } = itemsList;

	useEffect(() => {
		dispatch(listItems());
	}, [dispatch]);

	return (
		<>
			<h1>All Foods</h1>
			{loading ? (
				<Loader />
			) : (
				<>
					<Row>
						{items.map((item, index) => (
							<Col sm={12} md={6} lg={4} xl={3} key={index}>
								<Item item={item} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default HomeScreen;
