import React, { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listBills } from '../actions/billActions';
import Loader from '../components/Loader';

const BillScreen = () => {
	const dispatch = useDispatch();

	const billList = useSelector((state) => state.billList);
	const { loading, bills } = billList;
	console.log(billList);

	useEffect(() => {
		dispatch(listBills());
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
					<h1>BILLS</h1>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>BILL No</th>
								<th>Customer ID</th>
								<th>Order Detail</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{bills.map((bill) => (
								<tr key={bill.bill_no}>
									<td>{bill.bill_no}</td>
									<td>{bill.customer_id}</td>
									<td>{bill.order_detail}</td>
									<td>{bill.price}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default BillScreen;
