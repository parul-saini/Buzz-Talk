const express = require('express');
const { register } = require('../controllers/userControllers');
const { setAvatar } = require('../controllers/userControllers');


const router = express.Router();

router.post('/register', register);
router.post('/setavatar/:id', setAvatar);

module.exports = router;
