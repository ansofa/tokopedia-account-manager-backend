require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routers/router");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`Server running at port ${port}`));
