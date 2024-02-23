import express from "express";

const usePaymentsRoutes = express.Router();

usePaymentsRoutes.use('/courses', coursesRoutes);

export { usePaymentsRoutes };