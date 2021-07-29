const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/').get(itemController.getAllOrders);

router.route('/orderCreate').post(itemController.placeOrder);

router.route('/:id').get(itemController.getOrderById);

module.exports = router;
