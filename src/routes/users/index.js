import AuthController from "../../app/http/controllers/users/Auth/Authcontroller.js";
import express from 'express';

const usersRouter = express.Router();

usersRouter.route('/users', usersAuth);
usersRouter.route('/admin', adminAuth);
