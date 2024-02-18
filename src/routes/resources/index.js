import express from "express";
import { imageRoutes } from "./images.js";
import { setupRoutes } from "./setup.js";
const useResourceRoutes = express.Router();

useResourceRoutes.use('/images', imageRoutes);
useResourceRoutes.use('/setup', setupRoutes);

export { useResourceRoutes };