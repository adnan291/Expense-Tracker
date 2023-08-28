const express = require('express');    
const Authorization = require('../middleware/authentication');

const contactController = require('../controllers/admin')

const router = express.Router();

router.post('/add-expense', Authorization.authenticate, contactController.postAddExpense)

router.get('/get-expense', Authorization.authenticate, contactController.getAddExpense)

router.delete('/delete-expense/:id', Authorization.authenticate, contactController.postDeleteExpense)

module.exports=router;