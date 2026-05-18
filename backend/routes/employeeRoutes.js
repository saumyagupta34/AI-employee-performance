const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

router.get('/search', auth, employeeController.searchEmployees);
router.route('/')
  .post(auth, employeeController.createEmployee)
  .get(auth, employeeController.getEmployees);

router.route('/:id')
  .get(auth, employeeController.getEmployee)
  .put(auth, employeeController.updateEmployee)
  .delete(auth, employeeController.deleteEmployee);

module.exports = router;
