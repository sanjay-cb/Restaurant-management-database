const path = require('path');

const express = require('express');
const morgan = require('morgan');

//Routes
const itemRouter = require('./routes/itemRouter');
const orderRouter = require('./routes/orderRouter');
const uploadRouter = require('./routes/uploadRouter');
const billRouter = require('./routes/billRouter');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/items', itemRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/bills', billRouter);
app.use('/api/v1/upload', uploadRouter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Requested Url ${req.originalUrl} is Not found in the server`,
			404
		)
	);
});
app.use(globalErrorHandler);

module.exports = app;
