const { User } = require("../models");

class UserUpdateService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async updateImage(userId, payload) {
    try {
      const user = await User.update(
        { image: payload.imageUrl },
        {
          where: {
            id: userId,
          },
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserUpdateService
