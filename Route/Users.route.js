const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth')
const validateObjectId = require('../Middleware/validateObjectId')
const Admin = require('../Middleware/Admin')

const userCtrl = require('../Controller/Users.controller');

router.post('/signupprof', userCtrl.signupprof);
router.post('/signupstud', userCtrl.signupstud);
router.get('/:id/verify/:token/', userCtrl.verifyAuth);
router.post('/login', userCtrl.login);
router.get('/:id', [validateObjectId, auth], userCtrl.getUserID)

module.exports = router;