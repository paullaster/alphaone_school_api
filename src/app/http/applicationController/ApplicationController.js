import { Application } from "../../models/Application";

class ApplicationController {
    async apply(req, res) {
        try {
            const application = await Application.create(req.body);
            res.ApiResponse.success(application, 201, 'Application made successfully');
        } catch (error) {
            res.ApiResponse.error(error, 'Error creating application');
        }
    }
    async applications (req, res) {
        try {
            const applications = await Application.findAndCountAll({});
            res.ApiResponse.success(applications, 200);
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
}