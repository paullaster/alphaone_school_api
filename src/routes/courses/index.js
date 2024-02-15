import express from "express";
import { coursesRoutes } from "./courses.js";
const useCoursesRoutes = express.Router();

useCoursesRoutes.route('/courses', coursesRoutes);

export { useCoursesRoutes };