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
    async applications(req, res) {
        try {
            const applications = await Application.findAndCountAll({});
            res.ApiResponse.success(applications, 200);
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
    async update(req, res) {
        try {
            const application = await Application.findOne({
                where: {
                    id: req.body.applicationID,
                }
            });
            for (let prop in req.body) {
                if (prop !== 'applicationID') {
                    application[prop] = req.body[prop];
                }
            }
            const updatedApplication = await application.save();
            res.ApiResponse.success(updatedApplication, 201, "Application updated");
        } catch (error) {
            req.ApiResponse.error(error, 'Error updating application');
        }
    }
}