import express from "express";
import PaymentsController from "../../../app/http/controllers/payments/PaymentsController";
const coursesRoutes = express.Router();

coursesRoutes.post('/', CoursesController.listCourses);
coursesRoutes.post('/single', CoursesController.findCourse);


export { coursesRoutes };