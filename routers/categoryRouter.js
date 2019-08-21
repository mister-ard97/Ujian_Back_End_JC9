const express = require('express');

const router = express.Router();

const { categoryController } = require('../controllers');

router.get('/allCategory', categoryController.getAllCat);
router.post('/addCategory', categoryController.addCategory);
router.put('/editCategory/:id', categoryController.editCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory)

module.exports = router