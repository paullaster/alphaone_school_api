import express from 'express';
import ApplicationController from '../../app/http/controllers/application/ApplicationController.js';
const applicationRoutes = express.Router();

applicationRoutes.get('/', ApplicationController.applications);
applicationRoutes.get('/single', ApplicationController.application);
applicationRoutes.post('/apply', ApplicationController.apply);
applicationRoutes.put('/update', ApplicationController.update);
applicationRoutes.delete('/delete', ApplicationController.deleteApplication);

export {  applicationRoutes };