const express = require("express");
const router = express.Router();

const message = require("../controllers/messageController");
const note = require("../controllers/noteController");
// const authMiddleware = require("../middlewares/authMiddleware");

router.get("/getallnotes", note.get_all_notes);
router.get("/get/:id", note.get_one_note);
router.post("/add", note.add_note);
router.delete("/delete/:id", note.delete_note);
router.put("/update/:id", note.update_note);

router.post("/feedback", message.submit_feedback);

module.exports = router;
