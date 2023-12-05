require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routers/router");
const app = express();
const port = process.env.PORT || 5000;

const jsonErrorHandler = (err, req, res, next) => {
    res.status(400).send({ error: err.type });
  };

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);
app.use(bodyParser.json());
app.use(jsonErrorHandler);

app.listen(port, () => console.log(`Server running at port ${port}`));
