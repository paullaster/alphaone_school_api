import express from 'express';
import { usersRouter } from './users/index.js';
import { useCoursesRoutes } from './courses/index.js';

const router = express.Router();



router.use('/users', usersRouter);
router.use(useCoursesRoutes);
// router.use('/admin', );
export {router};