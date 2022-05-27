let express = require("express");
let router = express.Router();
let login_controller = require("../controllers/loginController");
let notes_controller = require("../controllers/notesController");

/* Starter project routes - login */
router.post("/login", login_controller.authenticate);

/* Starter project routes - Notes */
// GET - lists all the notes
router.get("/notes", notes_controller.getNotes);

//POST - Add a note
router.post("/notes/add", notes_controller.addNote);

//POST - Update a note
router.post("/notes/update", notes_controller.updateNote);

//POST - delete a note
router.post("/notes/delete", notes_controller.deleteNote);

module.exports = router;
