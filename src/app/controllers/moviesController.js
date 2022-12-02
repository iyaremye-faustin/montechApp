import { handleResponse, handleErrorResponse } from "../../core/helpers/responseHelper";
import { newCategory,checkByName, getCategories} from "../../core/services/categoryService";
import { newMovie,getMovies } from "../../core/services/movieService";

const addCategory=async(req,res)=>{
  const { name, description } = req.body;
  const newCategoryObject={
    name,
    description
  }
  const { category, error } = await newCategory(newCategoryObject);
  if (!error && category) {
    return handleResponse(res, 201, 'New Category Created Successfully', [],true);
  }
  return handleErrorResponse(res, 500, 'Unable to create a category', error,false);
}

const addMovie=async(req,res)=>{
  const {title,category} =req.body; 
  const categoryName= await (checkByName({name:category}));
  if(categoryName){
    const newMovieObject = {
      title,
      category_id:categoryName.id,
      views:0
    }
    const {movie,error}= await newMovie(newMovieObject);
    if(!error && movie){
      return handleResponse(res, 201, "Record saved", [],true);
    }
    return handleErrorResponse(res, 500, 'Unable to create a movie', error,false);
  }
  return handleErrorResponse(res, 404, 'category not found', [],false);
}
const viewCategories=async(req,res)=>{
  const categories= await getCategories();
  return handleResponse(res, 200, "List of categories", categories,true);
}

const viewMovies=async(req,res)=>{
  const movies= await getMovies();
  return handleResponse(res, 200, "List of movies", movies,true);
}

export{
  addCategory,
  addMovie,
  viewCategories,
  viewMovies
};
