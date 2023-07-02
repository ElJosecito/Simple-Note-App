const express = require("express");
const notes = require("../schemas/notesSchema");
const notesSchema = require("../schemas/notesSchema");

const router = express.Router();

//get all notes
router.get("/", async (req, res) => {
  try {
    const allNotes = await notes.find();
    res.json(allNotes);
    console.log("All Notes get successfully");
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific note
router.get("/:id", async (req, res) => {
  try {
    const specificNote = await notes.findOne({ id: req.params.id });
    res.json(specificNote);
    console.log("Specific Note get successfully");
  } catch (err) {
    res.json({ message: err });
  }
});

//post a note
router.post("/post", async (req, res) => {
  // Obtener el último documento ordenado por el ID descendente
  const lastDocument = await notesSchema.findOne().sort({ id: -1 });

  // Incrementar el ID
  const newId = lastDocument ? lastDocument.id + 1 : 1;

  const note = new notes({
    id: newId,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedNote = await note.save();
    res.json(savedNote);
    console.log("Note saved successfully");
  } catch (err) {
    res.json({ message: err });
  }
});

//update a note
router.put("/update/:id", async (req, res) => {
  try {
    const updateNote = await notes.updateOne(
      {
        id: req.params.id,
      },
      { $set: 
        {title: req.body.title, description: req.body.description }
       }
    );
    res.json(updateNote);
    console.log("Note updated successfully");
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a note
router.put("/delete/:id", async (req, res) => {
  try {
    const deleteNote = await notes.updateOne(
      { id: req.params.id },
      { $set: { deleted: true } }
    );
    res.json(deleteNote);
    console.log("Note deleted successfully");
  } catch (err) {
    res.json({ message: err });
  }
});

//restore a note
router.put("/restore/:id", async (req, res) => {
  try {
    const deleteNote = await notes.updateOne(
      { id: req.params.id },
      { $set: { deleted: false } }
    );
    res.json(deleteNote);
    console.log("Note deleted successfully");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
