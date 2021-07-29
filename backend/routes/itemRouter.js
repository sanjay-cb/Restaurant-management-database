const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.route('/').get(itemController.getAllItems).post(itemController.addItem);

router
	.route('/:id')
	.get(itemController.getItem)
	.patch(itemController.updateProduct)
	.delete(itemController.deleteItemById);

module.exports = router;
