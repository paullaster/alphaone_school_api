import { router } from "../../../routes";
import express from 'express';

const route = express.Router();

route.use('/api', router);

export {route};
