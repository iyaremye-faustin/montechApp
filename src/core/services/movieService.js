
import models from '../../app/database/models';
const { Movie } = models;

export const newMovie=async(object)=>{
  try {
    const movie= await Movie.create(object);
    return {movie};
  } catch (error) {
    return {error}
  }
}

export const getMovies = async () => {
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

export const getAMovie=async(movieId)=>{
  try {
    const movie = await Movie.findOne({
      where: { id: movieId },
      include: [
        {
          model: models.MovieCategory,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });
    return { movie };
  } catch (error) {
    return { error};
  }
}
export const deleteMovie = async (movieId) => {
  try {
    const value = await Movie.destroy({ where: { id: movieId } });
    return { value };
  } catch (error) {
    return { error};
  }
};
