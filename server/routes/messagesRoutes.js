const express = require('express');
const {addMessages,getAllMessages,deleteMessage} = require("../controllers/messageController");

const router = express.Router();

router.post('/addMsg', addMessages);
router.post('/getAllMsg', getAllMessages);
router.delete('/deleteMsg',deleteMessage);

module.exports = router;