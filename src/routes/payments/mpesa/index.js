import express from "express";
import { mpesaRoutes } from "./mpesa.js";

const useMpesaRoutes = express.Router();

useMpesaRoutes.use('/mpesa', mpesaRoutes);

export { useMpesaRoutes };