import AuthController from "../../app/http/controllers/users/Auth/Authcontroller.js";
import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post('/signup', AuthController.signup);
authRoutes.post('/create', AuthController.createUser);

export { authRoutes as usersAuth,  }