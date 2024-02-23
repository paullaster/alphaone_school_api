import express from 'express';
import { usersRouter } from './users/index.js';
import { useCoursesRoutes } from './courses/index.js';
import { useApplicationRoutes } from './applications/index.js';
import { useResourceRoutes } from './resources/index.js';
import { usePaymentsRoutes } from './payments/index.js';

const router = express.Router();



router.use('/users', usersRouter);
router.use(useCoursesRoutes);
router.use(useApplicationRoutes);
router.use(useResourceRoutes);
router.use(usePaymentsRoutes);
export {router};