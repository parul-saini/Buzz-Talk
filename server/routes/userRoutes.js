const express = require('express');

const { register,setAvatar, login,getAllUsers } = require('../controllers/userControllers');


const router = express.Router();

router.post('/register', register);
router.post('/setavatar/:id', setAvatar);

router.post('/login', login);
router.get('/allusers/:id',getAllUsers)
module.exports = router;
