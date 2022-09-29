const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios").default;

dotenv.config();

const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const fileRouter = require("./routes/files");

app.use("/files", fileRouter);
app.use(express.json());

app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req: any, res: any) => {
  res.send("Express + TypeScript File Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
