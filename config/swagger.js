module.exports = {
    swaggerOption: {
        definition: {
            openapi: "3.1.0",
            info: {
                title: "Tokopedia Account Manager API with Swagger",
                version: "0.1.0",
                description:
                    "Tokopedia Account Manager project is a tool used to assist users in managing Tokopedia users through this platform. This project is also a requirement to pass the Binar bootcamp at platinum level.",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "Kelompok 3",
                    url: "https://github.com/ansofa",
                    email: "kelompok3@email.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:" + process.env.PORT,
                },
            ],
          
            security: [{
                bearerAuth: []
            }],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    }
                }
            },
        },
        apis: ["./routers/*.js"],
    }
};