import { application } from "../../../../config/app.js";
import { Course } from "../../../models/Course.js";
import { Image } from "../../../models/Image.js";
import Jimp from "jimp";

class CoursesController {
    async listCourses(req, res) {
        try {
            const courses = await Course.findAndCountAll({
                where: {
                    status: 'Active',
                },
                // offset: 0,
                // limit: 0,
            });
            res.ApiResponse.success(courses)
        } catch (error) {
            res.ApiResponse.error(error, 'Error loading courses!');
        }
    }
    async createCourse(req, res) {
        try {
            if(!req.body) {
                res.ApiResponse.error(req.body, 'Missing body', 400);
            }
            const {image, ...courseData} = req.body;
            const course = await Course.create(courseData);
            let url = `${application.url}/storage/public/images/${req.body.id}.png`;
            const ImageBuffer = Buffer.from(image, 'base64');
            Jimp.read(ImageBuffer)
            .then((result) => {
                result.resize(180, 180)
                .quality(50)
                .write(`./storage/public/images/${req.body.id}.png`);
                
            })
            .catch((error) => {
                res.ApiResponse.error(error);
            });
            const sourceID = new Buffer.from(req.body.id).toString('base64');
            const imageEntry = {
                url,
                sourceID,
                documentType: 'Course',
            };
            await Image.create(imageEntry);
            res.ApiResponse.success(course, 201, `${course.name} course create successfully!`);
        } catch (error) {
            res.ApiResponse.error(error, 'We ran into an error when creating this course!');
        }
    }
    async findCourse(req, res) {
        try {
            const query = req?.query;
            const course = await Course.findOne({
                where: {
                    ...query,
                },
            });
            if (!course) {
                res.ApiResponse.error(course, "No record matched this requested course!", 404);
            }
            res.ApiResponse.success(course);
        } catch (error) {
            res.ApiResponse.error(error, 'Error fetching this course');
        }
    }
    async updateCourse(req, res) {
        try {
            const course = await Course.findByPk(req.body.courseID);
            if (!course) {
                res.ApiResponse.error(course, 'We can find this course', 404);
            }
            for (let prop in req.body) {
                course[prop] = req.body[prop];
            }
            const updatedCourse = await course.save();
            res.ApiResponse.success(updatedCourse, 201, "Updated successfully");
        } catch (error) {
            requestAnimationFrame.ApiResponse.error(error, "Erro updating this course");
        }
    }
    async deletecourse(req, res) {
        try {
            const item = await Course.findByPk(req.body.courseID);
            if (!item) {
                res.ApiResponse.error(item, "We can not find this course", 404);
            }
            const isDeleted = await item.destroy();
            res.ApiResponse.success(isDeleted, 202, 'Course deleted');
        } catch (error) {
            res.ApiResponse.error(error, "Error deleting course");
        }
    }
}

export default new CoursesController();