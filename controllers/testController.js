const User = require("../models/user");
const Test = require("../models/test");
const xlsx = require("xlsx");
const fs = require("fs");
var path = require("path");

const { validationResult } = require("express-validator");

export const getHome = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.render("home", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    await newUser.save();
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const bulkUpload = async (req, res) => {
  const fileBuffer = req.file.buffer;

  // Parse the Excel file using xlsx
  try {
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });

    // Access the Excel data as needed
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const excelData = xlsx.utils.sheet_to_json(worksheet);

    // Do something with the Excel data (e.g., save it to a database)

    const dataToInsert = excelData?.map((_a) => ({
      name: _a["First Name"],
      age: _a["Age"],
      test: _a["Date"],
    }));
    console.log(dataToInsert);
    const insertedProducts = await Test.insertMany(dataToInsert);

    res.send("Excel file uploaded and parsed successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error parsing the Excel file.");
  }
};

export const getFormValid = async (req, res) => {
  try {
    res.render("form");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const formValid = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Validation errors exist; render the form with error messages
      return res.render("form", { errors: errors.array() });
    }

    // No validation errors; process the form data
    const { username, email, password } = req.body;

    res.send("Form successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error.");
  }
};

export const fileBuffer = async (req, res) => {
  try {
    console.log(__dirname);
    
    const filePath = path.join(__dirname, "..", "public", "sampletext.txt");
    
    const wfilePath = path.join(__dirname, "..", "public", "writetext.txt");    
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(wfilePath);
    readStream.on("data", (chunk) => {
      console.log(chunk)
      writeStream.write(chunk)
    });
    res.send("buffer");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error.");
  }
};
