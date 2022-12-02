
import models from '../../app/database/models';
const { Movie } = models;

const newMovie=async(object)=>{
  try {
    const movie= await Movie.create(object);
    return {movie};
  } catch (error) {
    return {error}
  }
}

const getMovies = async () => {
  const all = await Movie.findAll({
    include: [
      {
        model: models.MovieCategory,
        as: 'category',
        attributes: ['id', 'name']
      }
    ],
    attributes: { exclude: ['category_id','updatedAt'] }
  });
  return all;
};

export {
  newMovie,
  getMovies
}