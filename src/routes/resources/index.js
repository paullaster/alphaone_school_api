import express from "express";
import { imageRoutes } from "./images.js";
const useResourceRoutes = express.Router();

useResourceRoutes.use('/images', imageRoutes);

export { useResourceRoutes };