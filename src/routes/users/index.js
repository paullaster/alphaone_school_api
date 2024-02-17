import express from 'express';
import { usersAuth } from './auth.js';

const usersRouter = express.Router();


usersRouter.use('/auth', usersAuth);


export { usersRouter};