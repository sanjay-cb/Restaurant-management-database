import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listItemDetails, updateItem } from '../actions/itemActions';
import FormContainer from '../components/FormContainer';
import { ITEM_UPDATE_RESET } from '../constants/productConstant';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const EditItemScreen = ({ match, history }) => {
	const id = match.params.id;

	const [name, setName] = useState('');
	const [qty, setQty] = useState(1);
	const [price, setPrice] = useState(0);
	const [descrption, setDescription] = useState('');
	const [photo, setPhoto] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	const itemDetails = useSelector((state) => state.itemDetails);
	const { loading, item } = itemDetails;
	console.log(item);

	const itemUpdate = useSelector((state) => state.itemUpdate);
	const { loading: loadingUpdate, success: successUpdate } = itemUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: ITEM_UPDATE_RESET });
			history.push('/admin/items');
		} else {
			dispatch(listItemDetails(id));

			setName(item.item_name);
			setQty(item.item_qty);
			setPrice(item.item_price);
			setDescription(item.item_description);
		}
		// eslint-disable-next-line
	}, [successUpdate, dispatch, listItemDetails]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
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

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateItem({
				item_id: id,
				item_name: name,
				item_qty: qty,
				item_price: price,
				item_description: descrption,
				photo: photo,
			})
		);
	};

	return (
		<>
			<Link to='/admin/items' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Item</h1>
				{loadingUpdate && <Loader />}
				{loading ? (
					<Loader />
				) : (
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
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default EditItemScreen;
