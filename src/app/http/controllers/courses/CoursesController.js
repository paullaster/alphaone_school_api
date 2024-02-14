import { Course } from "../../../models/Course";

class CoursesController {
    async listCourses(req, res) {
        try {
            const courses = await Course.findAll({
                where: {
                    status: 'status',
                }
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
    updateCourse(req, res) {
        try {
            //@TODO
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