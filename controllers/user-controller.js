const UserService = require("../services/user-service");
const userService = new UserService();
class UserController {
  async registration(req, res) {
    try {
      await userService.registration(req.body);
      res.status(201).json({ status: "SUCCESS", message: "Registrasi Berhasil" });
    } catch (error) {
      const errorMappings = {
        "Email sudah digunakan": 400,
        "Semua field harus diisi": 400,
        "Format email tidak valid": 400,
        "Password dan Confirm Password tidak cocok": 400,
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

  async login(req, res) {
    try {
      const accessToken = await userService.login(req.body, res);
      res.status(201).json({ status: "SUCCESS", message: "Login Berhasil", accessToken: accessToken });
    } catch (error) {
      const errorMappings = {
        "Password Salah": 400,
        "Email tidak terdaftar": 404,
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const accessTokenNew = await userService.refreshToken(refreshToken);
      res.status(201).json({ status: "SUCCESS", message: "Refresh Token Berhasil", accessToken: accessTokenNew });
    } catch (error) {
      const errorMappings = {
        "Forbidden": 403,
        "Unauthorized": 401,
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

  async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({ status: "SUCCESS", message: "Logout Berhasil"});
    } catch (error) {
      const errorMappings = {
        "Not Found": 404
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.user_id);
      res.status(200).json({ status: "SUCCESS", message: "Get User Berhasil", data: user});
    } catch (error) {
      const errorMappings = {
        "Forbidden": 403,
        "Unauthorized": 401,
      };
      const statusCode = errorMappings[error.message] || 500;
      res.status(statusCode).json({ status: "FAILED", message: error.message });
    }
  }

}

module.exports = UserController;