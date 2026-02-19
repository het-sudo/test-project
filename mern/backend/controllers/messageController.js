
const Message = require("../modals/message");


const submit_feedback = (req, res) => {
  let message = new Message(req.body);
  message
    .save()
    .then((result) => {
      res.json({ msg: "Thank you for your feedback!" });
    })
    .catch((error) => res.json({ msg: error.message }));
};


module.exports = { submit_feedback };