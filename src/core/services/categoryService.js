import models from '../../app/database/models';
const {MovieCategory} = models;

const newCategory= async(object)=>{
  try {
    const category= await MovieCategory.create(object);
    return {category};
  } catch (error) {
    return {error};
  }
}

const checkByName = async (categoryName) => {
  const category = await MovieCategory.findOne({ where: categoryName });
  return category;
};

const getCategories=async()=>{
  const all = await MovieCategory.findAll();
  return all;
}

export {
  newCategory,
  getCategories,
  checkByName
}