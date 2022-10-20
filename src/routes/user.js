const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
import {handleLogin, handleSignup, handleLogout} from '../controllers/users';

// Add user crud end points
router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);

// TODO: Think about adding a sessions based logout

module.exports = router;
