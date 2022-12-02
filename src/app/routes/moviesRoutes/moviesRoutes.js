import express from "express";
import { movieValidator } from "../../middlewares/requestValidation";
import { addMovie,viewMovies } from "../../controllers/moviesController";

const movieRoutes=express.Router();
movieRoutes.post('/movies',movieValidator,addMovie);
movieRoutes.get('/all/movies',viewMovies);

export default movieRoutes;
