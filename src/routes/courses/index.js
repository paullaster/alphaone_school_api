import express from "express";
import { coursesRoutes } from "./courses.js";
const useCoursesRoutes = express.Router();

useCoursesRoutes.use('/courses', coursesRoutes);

export { useCoursesRoutes };