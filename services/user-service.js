const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {
    this.userModel = User;
  }

  validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  async registration(payload) {
    const { username, email, password, confPassword } = payload;
    // Validation: Check if any required field is empty
    if (!username || !email || !password || !confPassword) {
      throw new Error("Semua field harus diisi");
    }
    if (password !== confPassword) throw new Error("Password dan Confirm Password tidak cocok");
    // Check if the email is already in use
    const existingUser = await this.userModel.findOne({ where: { email: email } });

    // Validation: Check if the email has a valid format
    if (!this.validateEmailFormat(email)) {
      throw new Error("Format email tidak valid");
    }

    if (existingUser) {
      throw new Error("Email sudah digunakan");
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      const data = await User.create({
        username: username,
        email: email,
        password: hashPassword,
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(payload, res) {
    try {
      const user = await User.findAll({
        where: {
          email: payload.email,
        },
      });
      if (user.length === 0) throw new Error("Email tidak terdaftar");
      const match = await bcrypt.compare(payload.password, user[0].password);
      if (!match) throw new Error("Password Salah");
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
      });
      const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRED,
      });
      await User.update(
        { refresh_token: refreshToken },
        {
          where: {
            id: userId,
          },
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return accessToken;
    } catch (error) {
      throw error;
    }
  }
  async refreshToken(refreshToken) {
    try {
      if (!refreshToken) throw new Error("Unauthorized");
      const user = await User.findAll({
        where: {
          refresh_token: refreshToken,
        },
      });
      if (!user[0]) throw new Error("Forbidden");
      const accessTokenNew = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) throw new Error("Forbidden");
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
        });
        return accessToken;
      });
      return accessTokenNew;
    } catch (error) {
      throw error;
    }
  }
  async logout(refreshToken) {
    try {
      if (!refreshToken) throw new Error("Not Found");
      const user = await User.findAll({
        where: {
          refresh_token: refreshToken,
        },
      });
      if (!user[0]) throw new Error("Not Found");
      const userId = user[0].id;
      const clearRefreshToken = await User.update(
        { refresh_token: null },
        {
          where: {
            id: userId,
          },
        }
      );
      return clearRefreshToken;
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
        attributes: ["id", "username", "email", "image"],
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
