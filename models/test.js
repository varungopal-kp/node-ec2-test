const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  test: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
