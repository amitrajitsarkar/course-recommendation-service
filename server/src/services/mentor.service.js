import mentorModel from "../models/Mentor.js";
import userModel from "../models/User.js";

class MentorService {
  async create(data) {
    const username = data.username?.trim().toLowerCase();

    if (!username || !data.expertise) {
      throw new Error("Username and expertise are required");
    }

    const existingMentor = await mentorModel.findOne({
      username,
    });

    if (existingMentor) {
      throw new Error("Mentor already exists");
    }

    const mentor = await mentorModel.create({
      username,
      expertise: data.expertise,
      bio: data.bio || "",
    });

    return mentor;
  }

  async getAll() {
    const mentors = await mentorModel.find().select("username expertise -_id");
    if (mentors.length === 0) throw new Error("No mentors found yet.");
    return mentors;
  }

  async getOne(username) {
    const mentor = await mentorModel.findOne({ username });

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    return mentor;
  }

  async update(id, data) {
    const mentor = await mentorModel.findByIdAndUpdate(
      id,
      {
        expertise: data.expertise,
        bio: data.bio,
      },
      {
        new: true,
      },
    );

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    return mentor;
  }

  async delete(username) {
    const mentor = await mentorModel.findOneAndDelete(username);

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    return "Mentor deleted successfully";
  }
}

export default MentorService;
