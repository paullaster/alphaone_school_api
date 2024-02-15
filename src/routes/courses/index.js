import express from "express";
import { coursesRoutes } from "./courses";
const useCoursesRoutes = express.Router();

useCoursesRoutes.route('/courses', coursesRoutes);