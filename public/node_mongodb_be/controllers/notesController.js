const Notes = require("../models/notes");
const mongoose = require("mongoose");

// GET Notes
exports.getNotes = function (req, res, next) {
  Notes.find().exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json({ notes: results });
  });
};

// ADD a note
exports.addNote = function (req, res, next) {
  let noteDocument = new Notes({
    id: new mongoose.Types.ObjectId(),
    value: req.body.note,
  });
  let done = true;
  noteDocument.save(function (err) {
    if (err) {
      done = false;
    }
    res.json({ done: done, note: noteDocument });
  });
};

// Update a note
exports.updateNote = function (req, res, next) {
  Notes.findOne({ id: req.body.id }).exec(function (err, result) {
    if (err) {
      res.json({ done: false, note: result });
    }
    if (result) {
      result.value = req.body.value;
      result.save(function (err) {
        if (err) {
          res.json({ done: false, note: result });
        }
        res.json({ done: true, note: result });
      });
    }
  });
};

// Delete a note
exports.deleteNote = function (req, res, next) {
  Notes.deleteOne({ id: req.body.id }, function (err, result) {
    if (err) {
      res.json({ done: false });
    } else {
      res.json({ done: true });
    }
  });
};
