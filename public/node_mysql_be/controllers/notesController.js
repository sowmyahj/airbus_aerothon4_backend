const { findByPk } = require("../models/notes");
let Notes = require("../models/notes");

// GET Notes
exports.getNotes = async function (req, res, next) {
  let results;
  try {
    results = await Notes.findAll();
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
  res.json({ notes: results });
};

// ADD a note
exports.addNote = async function (req, res, next) {
  let done = true;
  let noteDocument;
  try {
    noteDocument = await Notes.create({
      value: req.body.note,
    });
  } catch (err) {
    done = false;
  }
  res.json({ done: done, notes: noteDocument });
};

// Update a note
exports.updateNote = async function (req, res, next) {
  let result;
  try {
    await Notes.update(
      { value: req.body.value },
      {
        where: {
          id: req.body.id,
        },
      }
    );
  } catch (err) {
    res.json({ done: false, note: result });
  }
  result = await Notes.findByPk(req.body.id);
  res.json({ done: true, note: result });
};

// Delete a note
exports.deleteNote = async function (req, res, next) {
  try {
    await Notes.destroy({ where: { id: req.body.id } });
  } catch (err) {
    res.json({ done: false });
  }
  res.json({ done: true });
};
