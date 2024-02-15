import { Course } from "../../../models/Course";

class CoursesController {
    async listCourses(req, res) {
        try {
            const courses = await Course.findAndCountAll({
                where: {
                    status: 'Active',
                },
                offset: 0,
                limit: 0,
            });
            res.ApiResponse.success(courses)
        } catch (error) {
            res.ApiResponse.error(error, 'Error loading courses!');
        }
    }
    async createCourse(req, res) {
        try {
            const course = await Course.create(req,body);
            res.ApiResponse.success(course, 201, `${course.name} course create successfully!`);
        } catch (error) {
            res.ApiResponse.error(error, 'We ran into an error when creating this course!');
        }
    }
    async findCourse(req, res) {
        try {
            const course = await Course.findOne({
                where: {
                    id: req.body.courseID,
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
            
        }
    }
    deletecourse(req, res) {
        try {
            //@todo
        } catch (error) {
            
        }
    }
}

export default new CoursesController();