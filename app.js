require("dotenv").config();
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swagger = require("./config/swagger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routers/router");
const app = express();
const port = process.env.PORT;


const jsonErrorHandler = (err, req, res, next) => {
    res.status(400).send({ error: err.type });
  };

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// swagger config
const specs = swaggerJsdoc(swagger.swaggerOption)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// end swagger config

app.use("/", router);
app.use(bodyParser.json());
app.use(jsonErrorHandler);

app.listen(port, () => console.log(`Server running at port ${port}`));
