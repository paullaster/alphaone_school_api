import express from 'express';
import { usersRouter } from './users/index.js';

const router = express.Router();



router.use('/users', usersRouter);
// router.use('/admin', );
export {router};