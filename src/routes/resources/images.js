import express from "express";
import ImagesController from "../../app/http/controllers/assets/ImagesController.js";

const imageRoutes = express.Router();

coursesRoutes.get('/', ImagesController.getImages);
coursesRoutes.get('/image', ImagesController.getImage);

export { imageRoutes };