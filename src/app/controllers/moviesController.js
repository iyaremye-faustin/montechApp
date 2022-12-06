import {
  handleResponse,
  handleErrorResponse
} from '../../core/helpers/responseHelper';
import {
  newCategory,
  checkByName,
  getCategories
} from '../../core/services/categoryService';
import {
  newMovie,
  getMovies,
  getAMovie,
  deleteMovie
} from '../../core/services/movieService';

export const addCategory = async (req, res) => {
  const { name, description } = req.body;
  const newCategoryObject = {
    name,
    description
  };
  const { category, error } = await newCategory(newCategoryObject);
  if (!error && category) {
    return handleResponse(
      res,
      201,
      'New Category Created Successfully',
      [],
      true
    );
  }
  return handleErrorResponse(
    res,
    500,
    'Unable to create a category',
    error,
    false
  );
};

export const changeMovieCategory = async (req, res) => {
  const { category } = req.body;
  const categoryName = await checkByName({ name: category });
  if (!categoryName) {
    return handleErrorResponse(res, 404, 'category not found', [], false);
  }
  const { movie, error } = await getAMovie(req.params.movie);
  if (error)
    return handleErrorResponse(res, 500, "couldn't fetch movie", error, false);
  if (movie === null) {
    return handleErrorResponse(res, 404, 'Movie not found', error, false);
  }
  movie.category_id = categoryName.id;
  await movie.save();
  return handleResponse(res, 200, 'Movie category updated', [], true);
};

export const addMovie = async (req, res) => {
  const { title, category, image, description } = req.body;
  const categoryName = await checkByName({ name: category });
  if (categoryName) {
    const newMovieObject = {
      title,
      category_id: categoryName.id,
      rating: 0,
      image,
      description
    };
    const { movie, error } = await newMovie(newMovieObject);
    if (!error && movie) {
      return handleResponse(res, 201, 'Movie added', movie, true);
    }
    return handleErrorResponse(
      res,
      500,
      'Unable to create a movie',
      error,
      false
    );
  }
  return handleErrorResponse(res, 404, 'category not found', [], false);
};
export const viewCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    return handleResponse(res, 200, 'List of categories', categories, true);
  } catch (error) {
    return handleErrorResponse(
      res,
      500,
      "couldn't fetch categories",
      [],
      false
    );
  }
};

export const viewMovies = async (req, res) => {
  try {
    const movies = await getMovies();
    return handleResponse(res, 200, 'List of movies', movies, true);
  } catch (error) {
    return handleErrorResponse(res, 500, "couldn't fetch movies", [], false);
  }
};
export const geMovieById = async (req, res) => {
  const { movie, error } = await getAMovie(req.params.id);
  if (error)
    return handleErrorResponse(res, 500, "couldn't fetch movie", error, false);
  if (movie === null) {
    return handleErrorResponse(res, 404, 'movie not found', error, false);
  }
  return handleResponse(res, 200, 'List of movies', movie, true);
};

export const updateMovie = async (req, res) => {
  const { movie } = await getAMovie(req.params.id);
  if (movie === null)
    return handleErrorResponse(res, 404, 'movie not found', [], false);
  if (req.body.title) {
    movie.title = req.body.title;
  }
  if (req.body.description) {
    movie.description = req.body.description;
  }
  if (req.body.image) {
    movie.image = req.body.image;
  }
  await movie.save();
  return handleResponse(res, 200, 'Movie updated', [], true);
};

export const removeMovie = async (req, res) => {
  const { movie } = await getAMovie(req.params.id);
  if (movie === null)
    return handleErrorResponse(res, 404, 'movie not found', [], false);
  const { error } = await deleteMovie(req.params.id);
  if (error) {
    return handleErrorResponse(
      res,
      500,
      'Unable to remove a movie',
      error,
      false
    );
  } else {
    return handleResponse(res, 200, 'Movie deleted', [], true);
  }
};
