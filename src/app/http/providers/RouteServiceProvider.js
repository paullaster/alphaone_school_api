import { router } from "../../../routes/index.js";
import express from 'express';

const route = express.Router();

route.use('/api', router);

export {route};
