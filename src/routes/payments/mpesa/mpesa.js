import express from "express";
import PaymentsController from "../../../app/http/controllers/payments/PaymentsController";
const mpesaRoutes = express.Router();

mpesaRoutes.post('/nipush', );
mpesaRoutes.post('/nipushcallback', PaymentsController.mpesaNIPushCallback);


export { mpesaRoutes };