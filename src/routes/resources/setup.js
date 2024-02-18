import express from "express";
import SetupController from "../../app/http/controllers/setup/SetupController.js";

const setupRoutes = express.Router();

setupRoutes.get('/countries', SetupController.getCountriesList);


export { setupRoutes };
