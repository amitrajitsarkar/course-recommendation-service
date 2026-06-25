import MentorService from "../services/mentor.service.js";

const mentorService = new MentorService();

class MentorController {
  async create(req, res) {
    try {
      const mentor = await mentorService.create(req.body);

      return res.status(201).json({
        success: true,
        data: mentor,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const mentors = await mentorService.getAll();

      return res.status(200).json({
        success: true,
        data: mentors,
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
      const mentor = await mentorService.getOne(req.params.username);

      return res.status(200).json({
        success: true,
        data: mentor,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const mentor = await mentorService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        data: mentor,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const message = await mentorService.delete(
        req.params.username
      );

      return res.status(200).json({
        success: true,
        message,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new MentorController();