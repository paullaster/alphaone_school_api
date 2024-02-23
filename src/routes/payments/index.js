import express from "express";

const useCoursesRoutes = express.Router();

useCoursesRoutes.use('/courses', coursesRoutes);

export { useCoursesRoutes };