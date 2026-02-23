const express = require("express");
const router = express.Router();

const message = require("../controllers/messageController");
const note = require("../controllers/noteController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/getallnotes",authMiddleware, note.get_all_notes);
router.get("/get/:id", authMiddleware,note.get_one_note);
router.post("/add", authMiddleware,note.add_note);
router.delete("/delete/:id",authMiddleware,note.delete_note);
router.put("/update/:id",authMiddleware,note.update_note);

router.post("/feedback",authMiddleware,message.submit_feedback);


module.exports = router;
