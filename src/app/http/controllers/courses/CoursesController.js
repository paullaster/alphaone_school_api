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
    findCourse(req, res) {
        try {
            
        } catch (error) {
            
        }
    }
    updateCourse(req, res) {
        try {
            
        } catch (error) {
            
        }
    }
    deletecourse(req, res) {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new CoursesController();