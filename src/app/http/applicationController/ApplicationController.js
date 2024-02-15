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
}