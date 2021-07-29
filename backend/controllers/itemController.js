const asyncHandler = require('express-async-handler');
const pool = require('../db');
const AppError = require('../utils/appError');

exports.getAllItems = asyncHandler(async (req, res, next) => {
	const items = await pool.query('SELECT * FROM item');

	if (!items) {
		return next(new AppError('Error in Fetching Data'));
	}

	res.status(200).json({
		items: items.rows,
	});
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
	const orders = await pool.query('SELECT * FROM order_table');

	if (!orders) {
		return next(new AppError('Error in Fetching Data'));
	}

	res.status(200).json({
		orders: orders.rows,
	});
});

exports.getItem = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const item = await pool.query('SELECT * FROM item WHERE item_id = $1', [id]);

	if (!item) {
		return next(new AppError('Error in Fetching Data', 503));
	}

	res.status(200).json({
		item: item.rows,
	});
});

exports.placeOrder = asyncHandler(async (req, res, next) => {
	//creating Order
	const { customer_id, order_no, no_of_items, items, totalPrice } = req.body;
	console.log(req.body);

	const newOrder = await pool
		.query(
			'INSERT INTO order_table(customer_id, order_no, no_of_items, items) VALUES ($1, $2, $3, $4)',
			[customer_id, order_no, no_of_items, items]
		)
		.catch((err) => res.status(400).json(err));

	const billNo = Number(Date.now().toString().slice(4, 12));

	await pool
		.query(
			'INSERT INTO bill(bill_no, customer_id, order_detail, price) VALUES($1, $2, $3, $4)',
			[billNo, customer_id, items, totalPrice]
		)
		.then((data) => {
			console.log('successfully Inserted');
		})
		.catch((err) => {
			console.log(err);
		});

	res.status(200).json({
		message: 'success',
		data: 'Data Successfully Inserted',
		id: order_no,
	});
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const order = await pool
		.query('SELECT * FROM order_table WHERE order_no = $1', [id])
		.catch((err) => res.status(400).json(err));

	res.status(200).json({
		message: 'success',
		order: order.rows,
	});
});

exports.addItem = asyncHandler(async (req, res, next) => {
	const {
		item_name,
		item_id,
		item_qty,
		item_price,
		item_description,
		photo,
	} = req.body;

	const newItem = await pool
		.query(
			'INSERT INTO item(item_name, item_id, item_qty, item_price, item_description, photo) VALUES ($1, $2, $3, $4, $5, $6)',
			[item_name, item_id, item_qty, item_price, item_description, photo]
		)
		.catch((err) => res.status(400).json(err));

	res.status(200).json({
		data: 'Data Successfully Inserted',
	});
});

exports.getAllBills = asyncHandler(async (req, res, next) => {
	console.log('bills');

	const bills = await pool.query('SELECT * FROM bill').catch((err) => {
		console.log(err);
	});

	if (!bills) {
		return next(new AppError('Error in Fetching Data', 500));
	}

	res.status(200).json({
		message: 'success',
		bills: bills.rows,
	});
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	const {
		item_name,
		item_id,
		item_qty,
		item_price,
		item_description,
		photo,
	} = req.body;

	const item = await pool
		.query(
			'UPDATE item SET item_name = $1, item_qty = $2, item_price = $3, item_description = $4, photo = $5 WHERE item_id = $6 RETURNING *',
			[item_name, item_qty, item_price, item_description, photo, item_id]
		)
		.catch((err) => {
			console.log(err);
		});

	res.status(200).json({
		message: 'success',
		item: item.rows,
	});
});
exports.deleteItemById = asyncHandler(async (req, res, next) => {
	const id = req.params.id;

	await pool.query('DELETE FROM item WHERE item_id = $1', [id]).catch((err) => {
		console.log(err);
	});

	res.status(400).json({
		message: 'deleted successfully',
	});
});
