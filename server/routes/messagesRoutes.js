const express = require('express');
const {addMessages,getAllMessages} = require("../controllers/messageController");

const router = express.Router();

router.post('/addMsg', addMessages);
router.post('/getAllMsg', getAllMessages);

module.exports = router;