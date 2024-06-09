const express = require('express');
const router = express.Router();

const {register, login, orders, users, oneUser, updateInfo, allorders, acceptOrder, viewOrders, readNotification, assignLabour, labourOrders, acceptLabourOrder, findLabour} = require('../controllers/User');

router.post('/register', register);
router.post('/login', login);
router.post('/order', orders);
router.get('/users', users);
router.post('/oneuser', oneUser);
router.post('/updateinfo', updateInfo);
router.get('/allorders', allorders);
router.post('/acceptorder', acceptOrder);
router.post('/vieworders', viewOrders);
router.post('/notification', readNotification);
router.post('/assignlabour', assignLabour);
router.post('/labourorders', labourOrders);
router.post('/acceptlabourorder', acceptLabourOrder);
router.post('/findlabour', findLabour);

module.exports = router;