var express = require("express");
var router = express.Router();
const multer = require("../config/multer");

const testController = require("../controllers/testController");
const {testValidationRules} = require("../middlewares/validators/testValidation");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/home", testController.getHome);
router.get("/formvalid", testController.getFormValid);
router.post("/formvalid", testValidationRules, testController.formValid);
router.get("/buffer", testController.fileBuffer);


router.get("/file", function (req, res, next) {
  res.render("upload");
});
router.post(
  "/file",
  multer.uploadMemory.single("sheet"),
  testController.bulkUpload
);
module.exports = router;
