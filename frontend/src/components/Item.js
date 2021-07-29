import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Item = ({ item }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/item/${item.item_id}`}>
				<Card.Img src={`${item.photo}`} variant='top'></Card.Img>
			</Link>
			<Card.Body>
				<Link to={`/item/${item.item_id}`}>
					<Card.Title as='div'>
						<strong>{item.item_name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='h3'>&#8377; {item.item_price}</Card.Text>
			</Card.Body>
		</Card>
	);
};
