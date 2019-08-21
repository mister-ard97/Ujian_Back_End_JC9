const express = require('express');
const bodyParser = require('body-parser');

let port = 1007

let app_api = express();

app_api.use(bodyParser.json());

// -- CONSTRAINT
// FOREIGN_KEY table movcat.idcategory ke table category.id

app_api.get('/', (req, res) => {
    res.status(200).send(`
        <h2>Welcome to MoviePurwadhika API</h2>
    `)
})

const { movieRouter, categoryRouter, connMovAndCatRouter } = require('./routers');

// all Endpoint

// Movies Route
// get all movies = /movies/allMovies,
// add movie = /movies/addMovie,
// edit movie = /movies/editMovie/:id,
// delete movie = /movies/deleteMovie/:id

// Category Route
// get all category = /category/allCategory,
// add category = /category/addCategory,
// edit category = /category/editCategory/:id,
// delete category = /category/deleteCategory/:id

// Connection Route
// get all movies and category-nya = /moviesCat/allMovCat,
// delete movies and category in connection table = /moviesCat/deleteMovCat (by idmovie or category or both),
// add movies with category in connection table = /moviesCat/addMovCat,
// render all movies name with id = /moviesCat/allMoviesName,
// render all category name with id = /moviesCat/allCategoryName

app_api.use('/movies', movieRouter);
app_api.use('/category', categoryRouter);
app_api.use('/moviesCat', connMovAndCatRouter);

app_api.listen(port, () => console.log(`Server status = Active, Server active in Port ${port}`));