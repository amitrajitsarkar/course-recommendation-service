import courseModel from "../models/Course.js";
import mentorModel from "../models/Mentor.js";

class CourseController {
  async create(req, res) {
    try {
      const mentor = await mentorModel.findById(req.user.mentorId);

      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: "Mentor not found",
        });
      }

      const { title, category, description } = req.body;

      if (!title || !category || !description) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const course = await courseModel.create({
        title,
        category,
        description,
        mentor: mentor.username,
      });

      return res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      let courses = await courseModel.find().select("mentor title description");
      if(courses.length===0){
        return res.status(200).json({
        success: true,
        message: "No courses found yet",
      });
      }
      return res.status(200).json({
        success: true,
        data: courses,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getOne(req, res) {
    try {
      const course = await courseModel.findById(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const mentor = await mentorModel.findById(req.user.mentorId);

      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: "Mentor not found",
        });
      }

      const course = await courseModel.findById(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      if (course.mentor !== mentor.username) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own courses",
        });
      }

      const updatedCourse = await courseModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );

      return res.status(200).json({
        success: true,
        data: updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const mentor = await mentorModel.findById(req.user.mentorId);

      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: "Mentor not found",
        });
      }

      const course = await courseModel.findById(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      if (course.mentor !== mentor.username) {
        return res.status(403).json({
          success: false,
          message: "You can only delete your own courses",
        });
      }

      await courseModel.findByIdAndDelete(req.params.id); //course id is required

      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new CourseController();
