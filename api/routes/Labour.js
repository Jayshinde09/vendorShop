const express = require('express');
const router = express.Router();

const {create, login, labours, oneLabour, updateInfo} = require('../controllers/Labour');

router.post('/create', create);
router.post('/login', login);
router.get('/labours', labours);
router.post('/onelabour', oneLabour);
router.post('/updateinfo', updateInfo);

module.exports = router;