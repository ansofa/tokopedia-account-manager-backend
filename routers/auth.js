const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const UserController = require("../controllers/user-controller");
const userController = new UserController();

const auth = express.Router();


auth.get("/user", verifyToken, userController.getUser);


/**
 * @swagger
 * /auth/users:
 *  post:
 *      summary: Register user
 *      description: Register user
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                          - confPassword
 *                      properties:
 *                          username:
 *                              required: true
 *                              type: string
 *                              description: Username
 *                              example: farrasmf
 *                          email:
 *                              required: true
 *                              type: string
 *                              description: User Email
 *                              example: farrasmuhamadfurqon@gmail.com
 *                          password:
 *                              required: true
 *                              type: string
 *                              description: User Password
 *                              example: 1234
 *                          confPassword:
 *                              required: true
 *                              type: string
 *                              description: Confirmation User Password
 *                              example: 1234
 *      responses:
 *          201:
 *              description: Registration Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: Response Status
 *                                  example: SUCCESS
 *                              message:
 *                                  type: string
 *                                  description: Response Message
 *                                  example: Registrasi Berhasil
 *          400:
 *              description: Registration Failed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: Response Status
 *                                  example: FAILED
 *                              message:
 *                                  type: string
 *                                  description: Response Message
 *                                  example: 
 *                                      type 1: Email sudah digunakan
 *                                      type 2: Semua field harus diisi
 *                                      type 3: Format email tidak valid
 *                                      type 4: Password dan Confirm Password tidak cocok                              
 */
auth.post("/users", userController.registration);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Login user
 *      description: Login user
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              required: true
 *                              type: string
 *                              description: User Email
 *                              example: farrasmuhamadfurqon@gmail.com
 *                          password:
 *                              required: true
 *                              type: string
 *                              description: User Password
 *                              example: 1234
 *      responses:
 *          201:
 *              description: Login Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: Response Status
 *                                  example: SUCCESS
 *                              message:
 *                                  type: string
 *                                  description: Response Message
 *                                  example: Login Berhasil
 *                              accessToken:
 *                                  type: string
 *                                  description: Response Token
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiZmFycmFzbWYiLCJlbWFpbCI6ImZhcnJhc211aGFtbWFkZnVycW9uQGdtYWlsLmNvbSIsImlhdCI6MTcwMTg1MDg5OSwiZXhwIjoxNzAxOTM3Mjk5fQ.aIk9Nfm386YQEGRoeiguvj81ZU1-Qp12_wXxYf9bX6E
 *          400:
 *              description: Login Failed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: Response Status
 *                                  example: FAILED
 *                              message:
 *                                  type: string
 *                                  description: Response Message
 *                                  example: Password Salah
 *          404:
 *              description: Login Failed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: Response Status
 *                                  example: FAILED
 *                              message:
 *                                  type: string
 *                                  description: Response Message
 *                                  example: Email tidak terdaftar                         
 */
auth.post("/login", userController.login);


auth.get("/token", userController.refreshToken);


auth.delete("/logout", userController.logout);

module.exports = auth;