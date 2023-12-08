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
 *                              example: DID=99407b04e0040a8c829e0e6b5b93ae7a3a18b3adc314b6e7beb3e11d90222a5ac7eb974af62e84eecb52c773bafc6fc6; DID_JS=OTk0MDdiMDRlMDA0MGE4YzgyOWUwZTZiNWI5M2FlN2EzYTE4YjNhZGMzMTRiNmU3YmViM2UxMWQ5MDIyMmE1YWM3ZWI5NzRhZjYyZTg0ZWVjYjUyYzc3M2JhZmM2ZmM247DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _UUID_NONLOGIN_=c8360e9fbad28294323ffa3b95384b7e; _UUID_NONLOGIN_.sig=tN-JRbneF2YPK6MkFRdXicArXA8; __auc=cf8c363e1762c99d7fff6a60734; _SID_Tokopedia_=st5BSe_qAbKoHzj-obeslOfSBPIhOu78WKBmlbHgHpIiQal7hDU7y3RxoB2qFxsVSNFinkDnjgYsAFXqq_0rd86468hnAbraA7OSl8YZ8vXeotMZgj1ozYyKLIolAjmQ; l=1; aus=1; _UUID_CAS_=493009ec-7a5f-4013-a237-2c1beae5b816; user-preference=true; FPF=1; _gcl_au=1.1.1484040826.1698499286; _ga=GA1.2.373804308.1607062560; _ga_70947XW48P=GS1.1.1700369421.351.0.1700369426.55.0.0; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8de84d0184b594b7686fdaa05035515f.1700114139842.1700114139842.1700369426521.21%22%2C%22pay.tokopedia.com%22%3A%22cGF5LnRva29wZWRpYS5jb20%3D.80f7bbf49c94f4afaaa87618687daa9b.1698228810814.1698027572668.1698230566432.5%22%2C%22developer.tokopedia.com%22%3A%22ZGV2ZWxvcGVyLnRva29wZWRpYS5jb20%3D.82b7054b64f2f4f1e97f5d403eef3a86.1693009577317.1691967519784.1693009581948.1%22%2C%22seller.tokopedia.com%22%3A%22c2VsbGVyLnRva29wZWRpYS5jb20%3D.81070b1606e34432f9e732d40125b016.1698821568387.1698814370519.1698821616587.1%22%7D; tuid=4699036; _abck=9DC46E97D47DC8C542CD2C0FB8A1E87C~0~YAAQDudbJOGsTy2MAQAAefqGPAukesTf/GBeXnTCM+h9h7ijo5mgqaVhZ0+kKFE1ELFunMxSAMv2twcJOANMLoyWiLVFwzPUH46Y1ms8UIDm+Ud5eaaDN3n3Ew8tfuVxSJ7AwUuNRG9Q5yy3QTVlTV51AncnhezpmJrZtY7lc04tzKIHZGY6trU2XzOL12nTtOFNbOFcVSFsSShqW/9Gxc9YUdEzZmmSu+kauqwPoZnBTT9MzVKRZlLGAZLwWBS0uKHC8/7cxTXo0J7AHO9xs2dwdn3Ddie8+w2PJpZw0FjOchTiFFMzjTl/NYscS7w2HTRlGET+JdsA5fKBErHz6hYf7bE4rAm2GhIYc2gj8kpLtGymu5olc9dOoLFOxSZ9Ms9e6fQIklZpRJ7n+A8HQigJpeIr3WffuylO~-1~-1~-1; bm_sz=149FD21164FE16C7D5E8DAD120DA9790~YAAQDudbJOSsTy2MAQAAefqGPBYbwxnH62G8aQXUfnKRQ+3R/gQXAWRM9yIqymDqd5hEstuJCXFKWqLxlbmNlJOnvvf6i/wScUwcIY1It90yJNOtH/hoTqVfpmKlNwqz/La2be1D6DrErQ2w5J7w0nELAUVuNJ/aJyDPi3yF9shbd3PDQohvz5tq7lspYp7iDFvNUabFwHbRP2IOyz50b9tE4BX63LT8OjL7OYXlp0uoYIvUgh5/5s+CACKL09ao8kqOXviySgJB962a/uDsTedd/yrE9cqDa6DQUn6ijs9tKJGetZc=~3360324~3293508; uidh=jhmNib+YbKEEB30NmEF0hjUORz8pWPzJFKFa8j3an1Y=; uide=lnzXR9dPfA3IlwtHfjxSAQIDp/8n9ESZYHTwSu60cEm+qN4=; ak_bmsc=5157D01964AC17DD31D00982A3379CAC~000000000000000000000000000000~YAAQnl9idgvnRi2MAQAA58wZPRYIczuX3Vsn5c5gfCEgLdiV29VsJLSyAnp/gOdUb6AYX1HGkxQPkzjkQrjAy6Xnr2I7J9l2LpfE8fmaTXfmcoW3pv+H3AepW/CKAksYV1t/j5VVLiqu7b/S9R0pLPAOZuXSYWWqI3cHjesXm5n+c8tnFrF5i2PfRbf8wUW9bFXYuI1gLWODvSPI5//AACq6mFs3H8YwoA3UWxoPtMgUdeVHpRyfqbu1c037a/se07PiyJ86eF4LguIClaRHXUcm+Pg/mCXYrLwnmBkFIS+wTsb3xqul3E1dNzqMOePKOwROuXbRKLa6hITZZK4SfouV8hrD5uWrnpjWAY6w7Pp5JuYlk9uNc91VBxQS0/zg0XAwQwVUAu88kQVxdQ==; _CASE_=257c3a173a7c646c6c676d727c3f173a7c646c6f6c6f6b666d6b6d727c323c327c647c0c2b333f367e1f302d31383f7c727c3d173a7c646f6966727c323130397c647c6f6e687066666b6d666e68676669676c67697c727c323f2a7c647c7368706c6f676f676b6a6e6d6b6a6867677c727c2e1d317c647c6f6d6a6f6e7c727c29173a7c646f6c6c6f6e6d676a727c2d173a7c646f6f6b6d6e6b696d727c2d0a272e3b7c647c6c367c727c29362d7c647c0525027c2d3b2c28373d3b012a272e3b027c64027c6c36027c72027c293f2c3b36312b2d3b01373a027c646f6c6c6f6e6d676a237225027c2d3b2c28373d3b012a272e3b027c64027c6f6b33027c72027c293f2c3b36312b2d3b01373a027c646e23037c727c320b2e3a7c647c6c6e6c6d736f6c736e680a6f6e646e67646f6f756e69646e6e7c23; webauthn-session=b64009f6-ee65-4cc6-91dd-533717ddfc4b; bm_mi=9CC98CDD7C07379304F8F79C353514D4~YAAQnl9idlrnRi2MAQAAcucZPRbeBrhfZtSdr7dizHiTIRG7CBJXZ7E9O488XqhQdDqKTBIKELLYB1Iw7+uU5PGaKbrlr1BZrP0Ecak5ZUDtq+PLL4TbEUh1f0RuvwX/dxeLLI3q99Z8LXZ6sbj0am+qSuK2i7euSoDiiciKikN8cJFOT1zw62QHIS9kceyGvDdJIPK94E7G6pj178rglwJm8ZkXmPj4C58coWRo00jFarr8Zuu6+ZV9ETAQvhtAk7DD4UWOWb4PDMLuzehJ3oqtDsfEDcz36/WBNhQhVvu1Rd53KJ8n8XYSeK7RgVYf~1
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
 *                                  example: Profile berhasil disimpan
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
/**
 * @swagger
 *  /services/tokopedia/profiles/{profileId}:
 *  get:
 *      summary: Fetch Profile
 *      description: Fetch Profile
 *      tags: [Profile]
 *      parameters:
 *          - name: profileId
 *            in: path
 *            description: ID of the profile to fetch
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Fetch Profile Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: Response Status
 *                                  example: SUCCESS
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                          description: Response Message
 *                                          example: Ahmad
 *                                      isLoggedIn:
 *                                          type: boolean
 *                                          description: Response Message
 *                                          example: true
 *                                      profilePicture:
 *                                          type: string
 *                                          description: Response Message
 *                                          example: https://images.tokopedia.net/img/cache/300/tPxBYm/2023/12/5/19156516-3a13-433d-952f-d7916f250422.png
 *                                      phone:
 *                                          type: string
 *                                          description: Response Message
 *                                          example: 081234567890
 *                                      ovoCash:
 *                                          type: string
 *                                          description: Response Message
 *                                          example: Rp10.000
 *                                      saldoTokopedia:
 *                                          type: string
 *                                          description: Response Message
 *                                          example: Rp10.000
 *                                      statusMember:
 *                                          type: string
 *                                          description: Response Message
 *                                          example: Member Diamond    
 * 
 *
 *          404:
 *              description: Fetch Profile Failed
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
 *                                  example: Profil tidak ditemukan
 * 
 */
profile.get("/tokopedia/profiles/:profileId", verifyToken, profileController.fetchProfile);

// Endpoint delete profile
profile.delete("/tokopedia/profiles/:profileId" , verifyToken, profileController.deleteProfile);

// Endpoint get all profile
profile.get("/tokopedia/profiles" , verifyToken, profileController.getAllProfileId);

module.exports = profile;
