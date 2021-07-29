import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/itemActions';

const AddItemScreen = () => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [qty, setQty] = useState(1);
	const [price, setPrice] = useState(0);
	const [descrption, setDescription] = useState('');
	const [photo, setPhoto] = useState('');
	const [uploading, setUploading] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addItem({
				item_name: name,
				item_id: Number(Date.now().toString().slice(5, 12)),
				item_qty: qty,
				item_price: price,
				item_description: descrption,
				photo: photo,
			})
		);
		window.alert('Added sucessFully');
	};

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		console.log(file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			const { data } = await axios.post('/api/v1/upload', formData, config);
			setPhoto(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};
	return (
		<FormContainer>
			<h1>Add Item</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='qty'>
					<Form.Label>Quantity</Form.Label>
					<Form.Control
						type='number'
						placeholder='Enter Quantity'
						value={qty}
						onChange={(e) => setQty(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='price'>
					<Form.Label>Price</Form.Label>
					<Form.Control
						type='number'
						placeholder='Enter Price'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='descrption'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter descrption'
						value={descrption}
						onChange={(e) => setDescription(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='photo'>
					<Form.Label>Image</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter image url'
						value={photo}
						onChange={(e) => setPhoto(e.target.value)}
					></Form.Control>
					<Form.File
						id='image-file'
						label='Choose File'
						custom
						onChange={uploadFileHandler}
					></Form.File>
					{uploading && <Loader />}
				</Form.Group>
				<Button type='submit' variant='primary'>
					ADD
				</Button>
			</Form>
		</FormContainer>
	);
};

export default AddItemScreen;
