import express from "express";
import PaymentsController from "../../../app/http/controllers/payments/PaymentsController.js";
const mpesaRoutes = express.Router();

mpesaRoutes.post('/nipush', PaymentsController.niPushInit);
mpesaRoutes.post('/nipushcallback', PaymentsController.mpesaNIPushCallback);


export { mpesaRoutes };