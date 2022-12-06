import express from 'express';
import {
  addCategory,
  viewCategories
} from '../../controllers/moviesController';
import { categoryValidator } from '../../middlewares/requestValidation';

const categoryRoutes = express.Router();
categoryRoutes.post('/categories', categoryValidator, addCategory);
categoryRoutes.get('/all/categories', viewCategories);

export default categoryRoutes;
