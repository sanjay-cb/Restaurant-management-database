import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { deleteItem, listItems } from '../actions/itemActions';
import Loader from '../components/Loader';

const ItemListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const itemsList = useSelector((state) => state.itemsList);

	console.log(itemsList);
	const { loading, items } = itemsList;

	useEffect(() => {
		dispatch(listItems());
	}, [dispatch]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure..?')) {
			dispatch(deleteItem(id));
			history.push('/admin/items');
		}
	};
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
					<h1>ITEMS</h1>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>Name</th>
								<th>ID</th>
								<th>Qty</th>
								<th>Price</th>
								<th>Description</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.item_id}>
									<td>{item.item_name}</td>
									<td>{item.item_id}</td>
									<td>{item.item_qty}</td>
									<td>{item.item_price}</td>
									<td>{item.item_description}</td>
									<td>
										<LinkContainer to={`/admin/item/${item.item_id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(item.item_id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default ItemListScreen;
