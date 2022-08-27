const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const { readdirSync } = require("fs");

app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
//Read files in the routes folder
readdirSync("./routes").forEach((file) =>
  app.use("/", require("./routes/" + file))
);

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
