const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });


const storageMemory = multer.memoryStorage(); 
const uploadMemory = multer({ storage: storageMemory });


module.exports = {
  upload: upload,
  uploadMemory: uploadMemory,
};