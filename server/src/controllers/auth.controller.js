import Auth from "../services/auth.service.js"

const authService = new Auth();

class AuthController {
  async signup(req, res) {
    try {
      const result = await authService.signup(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
  async delete(req,res){
    try {
      const result = await authService.delete(req.body);

      return res.status(204).json({
        success: true,
        message: "user deleted",
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default AuthController;
