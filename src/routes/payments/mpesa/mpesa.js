import express from "express";
import PaymentsController from "../../../app/http/controllers/payments/PaymentsController";
const mpesaRoutes = express.Router();

mpesaRoutes.post('/', CoursesController.listCourses);
mpesaRoutes.post('/niPushCallback', PaymentsController.mpesaNIPushCallback);


export { mpesaRoutes };