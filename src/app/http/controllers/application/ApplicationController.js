import { Application } from "../../../models/Application.js";
import { Course } from "../../../models/Course.js";
import { Transaction } from "../../../models/Transaction.js";

class ApplicationController {
    async apply(req, res) {
        try {
            if (!req.body) {
                res.ApiResponse.error(req.body, 'Missing body', 400);
            }
            const applicationExists = await Application.findOne({ where: { course: req.body.course, applicant: req.body.applicant } });
            if (applicationExists) {
                return res.ApiResponse.error(applicationExists, "Application already exists!", 422);
            }
            const course = await Course.findOne({ where: { id: req.body.course } });
            if (!course) {
                return res.ApiResponse.error(course, 'We cannot find this course', 404);
            }
            req.body.balance = course.price;
            req.body.amount = course.price;
            const application = await Application.create(req.body);
            return res.ApiResponse.success(application, 201, 'Application made successfully');
        } catch (error) {
            return res.ApiResponse.error(error, 'Error creating application');
        }
    }
    async applications(req, res) {
        try {
            const query = req['query'];
            const applications = await Application.findAndCountAll({where: { ...query}});
            res.ApiResponse.success(applications, 200);
        } catch (error) {
            res.ApiResponse.error(error);
        }
    }
    async update(req, res) {
        try {
            if (!req.body) {
                res.ApiResponse.error(req.body, 'Missing body', 400);
            }
            const application = await Application.findOne({
                where: {
                    id: req.body.applicationID,
                }
            });
            if (!application) {
                res.ApiResponse.error(application, 'We cannot find ths application', 404);
            }
            for (let prop in req.body) {
                if (prop !== 'applicationID') {
                    application[prop] = req.body[prop];
                }
            }
            const updatedApplication = await application.save();
            res.ApiResponse.success(updatedApplication, 201, "Application updated");
        } catch (error) {
            res.ApiResponse.error(error, 'Error updating application');
        }
    }
    async deleteApplication(req, res) {
        try {
            if (!req.body) {
                res.ApiResponse.error(req.body, 'Missing body', 400);
            }
            const application = await Application.findByPk(req.body.id);
            
            if (!application) {
                res.ApiResponse.error(application, 'Application not found', 404);
            }
            const relatedTransactions = await Transaction.findAll({
                where: {
                    applicationCode: req.body.id,
                }
            });
            if (relatedTransactions && (relatedTransactions.status !== "Settled")) {
                relatedTransactions.destroy();  
            }
            const deleted = await application.destroy();
            res.ApiResponse.success(deleted, 202, "Deleted successfully");
        } catch (error) {
            req.ApiResponse.error(error, "failed to delete the application");
        }
    }
    async application(req, res) {
        try {
            if (!req.query) {
                return res.ApiResponse.error(req.query, 'Missing query', 400);
            }
            const query = req.query;
            const app = await Application.findOne({
                where: {
                    ...query,
                },
            });
            if (!app) {
                return res.ApiResponse.error(app, 'We can not find this application', 404);
            }
            return res.ApiResponse.success(app, 200);
        } catch (error) {
            return req.ApiResponse.error(error, 'We ran into an error while getting this application!');
        }
    }
}

export default new ApplicationController();