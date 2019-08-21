const express = require('express');

const router = express.Router();

const { movieController } = require('../controllers');

router.get('/allMovies', movieController.getAllData);
router.post('/addMovie', movieController.addMovie);
router.put('/editMovie/:id', movieController.editMovie);
router.delete('/deleteMovie/:id', movieController.deleteMovie)

module.exports = router;