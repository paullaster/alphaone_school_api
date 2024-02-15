import express from 'express';
import ApplicationController from '../../app/http/controllers/application/ApplicationController';
const applicationRoutes = express.Router();

applicationRoutes.get('/', ApplicationController.applications);
applicationRoutes.get('/single', ApplicationController.application);

export {  applicationRoutes };