import express from "express";
import { useMpesaRoutes } from "./mpesa/index.js";

const usePaymentsRoutes = express.Router();

usePaymentsRoutes.use('/payment', useMpesaRoutes);

export { usePaymentsRoutes };