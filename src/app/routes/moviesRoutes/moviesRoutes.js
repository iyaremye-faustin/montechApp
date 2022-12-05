import express from "express";
import { movieValidator,movieUpdateValidaor } from "../../middlewares/requestValidation";
import { addMovie,viewMovies,geMovieById,removeMovie,updateMovie } from "../../controllers/moviesController";

const movieRoutes=express.Router();
movieRoutes.post('/movies',movieValidator,addMovie);
movieRoutes.get('/all/movies',viewMovies);
movieRoutes.get('/:id/movies',geMovieById);
movieRoutes.delete('/:id/movies/delete',removeMovie);
movieRoutes.patch('/:id/movies/update',movieUpdateValidaor,updateMovie);

export default movieRoutes;
