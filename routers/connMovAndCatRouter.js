const express = require('express');
const router = express.Router();

const { connectionMovAndCatController } = require('../controllers')

router.get('/allMovCat', connectionMovAndCatController.getAllConnectionMovAndCat);
router.delete('/deleteMovCat', connectionMovAndCatController.deleteMovCat);
router.post('/addMovCat', connectionMovAndCatController.addConnectionMovAndCat);
router.get('/allMoviesName', connectionMovAndCatController.getAllMoviesName);
router.get('/allCategoryName', connectionMovAndCatController.getAllCategoryName);


module.exports = router;