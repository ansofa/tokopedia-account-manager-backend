const UserService = require("../../services/user-service");
const { dataRegistration, dataLogin, dataRefreshToken } = require("../mocks/dataMock");

const userService = new UserService();
const userDataRegistration = dataRegistration;
const userDataLogin = dataLogin;
const userRefreshToken = dataRefreshToken.refreshToken;

describe("Unit Testing : user-service.js", () => {
  let userService;

  beforeAll(() => {
    userService = new UserService();
  });
  it("[+] registration user", async () => {
    const userNew = await userService.registration(userDataRegistration);
    expect(userNew.username).toBe(userDataRegistration.username);
    expect(userNew.email).toBe(userDataRegistration.email);
  });

  it("[+] login user", async () => {
    const user = await userService.login(userDataLogin);
    expect(user.email).toBe(userDataLogin.email);
    expect(user.password).toBe(userDataLogin.password);
  });

  it("[+] logout user", async () => {
    await expect(userService.logout(userRefreshToken)).rejects.toThrow("Not Found");
  });
});
