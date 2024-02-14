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
    createCourse(req, res) {
        try {
            
        } catch (error) {
            
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