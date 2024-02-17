import express from 'express';
import { applicationRoutes } from './application.js';
const useApplicationRoutes = express.Router();

useApplicationRoutes.use('/applications', applicationRoutes);

export { useApplicationRoutes };