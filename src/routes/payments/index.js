import express from "express";
import { useMpesaRoutes } from "./mpesa/index.js";

const usePaymentsRoutes = express.Router();

usePaymentsRoutes.use('/courses', coursesRoutes);

export { usePaymentsRoutes };