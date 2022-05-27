const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Notes", notesSchema);
