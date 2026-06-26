import jwt from "jsonwebtoken";

const mentorAuth = (req, res, next) => {
  try {
    const token = req.cookies.mentorToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please login.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default mentorAuth;