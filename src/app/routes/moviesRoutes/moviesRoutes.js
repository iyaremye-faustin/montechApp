import express from 'express';
import {
  movieValidator,
  movieUpdateValidator,
  movieCategoryValidator
} from '../../middlewares/requestValidation';
import {
  addMovie,
  viewMovies,
  geMovieById,
  removeMovie,
  updateMovie,
  changeMovieCategory
} from '../../controllers/moviesController';

const movieRoutes = express.Router();
movieRoutes.post('/movies', movieValidator, addMovie);
movieRoutes.get('/all/movies', viewMovies);
movieRoutes.get('/:id/movies', geMovieById);
movieRoutes.delete('/:id/movies/delete', removeMovie);
movieRoutes.patch('/:id/movies/update', movieUpdateValidator, updateMovie);
movieRoutes.patch(
  '/:movie/movies/category/update',
  movieCategoryValidator,
  changeMovieCategory
);

export default movieRoutes;
