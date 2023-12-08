const express = require("express");
const ProfileController = require("../controllers/profile-controller");
const verifyToken = require("../middlewares/verify-token");
const profile = express.Router();

const profileController = new ProfileController();

// Endpoint store profile
/**
 * @swagger
 * /services/tokopedia/profiles:
 *  post:
 *      summary: Store Profile
 *      description: Store Profile
 *      tags: [Profile]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - bearer
 *                      properties:
 *                          bearer:
 *                              required: true
 *                              type: text
 *                              description: User Bearer
 *                              example: _SID_Tokopedia_=baoERK01ZGLIzb8cTAm0i4S5AuzGj4N05XVQT714qeGGoy0PKNbynLVoWetjDa4XIT_dYCTSZ0iHNnaY9NsLggO-3gF-gWvsRbRGcpBs5hM_AO4AjMLpdRDB53iFHwQD
 *      responses:
 *          201:
 *              description: Store Profile Success
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
 *                                  example: Bearer berhasil disimpan
 *          400:
 *              description: Store Profile Failed
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
 *                                  example: Baerer tidak valid                         
 */
profile.post("/tokopedia/profiles", verifyToken, profileController.storeProfile);

// Endpoint fetch profile
profile.get("/tokopedia/profiles/:profileId", verifyToken, profileController.fetchProfile);

// Endpoint delete profile
profile.delete("/tokopedia/profiles/:profileId" , verifyToken, profileController.deleteProfile);

// Endpoint get all profile
profile.get("/tokopedia/profiles" , verifyToken, profileController.getAllProfileId);

module.exports = profile;
