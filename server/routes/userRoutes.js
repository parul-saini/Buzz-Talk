const express = require('express');
<<<<<<< HEAD
const { register } = require('../controllers/userControllers');
const { setAvatar } = require('../controllers/userControllers');
=======
const { register,login,getAllUsers } = require('../controllers/userControllers');
>>>>>>> b2791b9e2bf87f6296c4afd2e0df68f7299a58f5


const router = express.Router();

router.post('/register', register);
<<<<<<< HEAD
router.post('/setavatar/:id', setAvatar);

=======
router.post('/login', login);
router.get('/allusers/:id',getAllUsers)
>>>>>>> b2791b9e2bf87f6296c4afd2e0df68f7299a58f5
module.exports = router;
