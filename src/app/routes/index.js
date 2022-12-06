import express from 'express';
import categoryRoutes from './moviesRoutes/categoryRoutes';
import movieRoutes from './moviesRoutes/moviesRoutes';
const indexRouter = express.Router();

indexRouter.use('/api/v1', categoryRoutes);
indexRouter.use('/api/v1', movieRoutes);
indexRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to Movie API' });
});

export default indexRouter;
