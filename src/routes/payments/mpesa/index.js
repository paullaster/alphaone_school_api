import express from "express";
import { mpesaRoutes } from "./mpesa.js";

const useCoursesRoutes = express.Router();

useCoursesRoutes.use('/courses', coursesRoutes);

export { useCoursesRoutes };