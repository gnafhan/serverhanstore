var express = require('express');
var router = express.Router();
const {viewSignin, actionSignin, actionLogOut} = require('./controller')

router.get('/', viewSignin);
router.post('/', actionSignin);
router.get('/logout', actionLogOut);
module.exports = router;
