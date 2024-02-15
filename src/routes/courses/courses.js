import express from "express";
import CoursesController from "../../app/http/controllers/courses/CoursesController";
const coursesRoutes = express.Router();

coursesRoutes.get('/', CoursesController.listCourses);
coursesRoutes.get('/single', CoursesController.findCourse);
coursesRoutes.post('/create', CoursesController.createCourse);
coursesRoutes.put('/update', CoursesController.updateCourse);
coursesRoutes.delete('/delete', CoursesController.deletecourse);