import express from "express";
import ImagesController from "../../app/http/controllers/assets/ImagesController.js";

const imageRoutes = express.Router();

imageRoutes.get('/', ImagesController.getImages);
imageRoutes.get('/image', ImagesController.getImage);

export { imageRoutes };