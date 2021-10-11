const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
