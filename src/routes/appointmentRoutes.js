const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
//HU 3 
const { isAuthenticated, isVet } = require('../middlewares/authMiddleware');

router.get('/', appointmentController.getAllAppointments);
router.get('/create', appointmentController.getCreateForm);
router.post('/create', appointmentController.createAppointment);
//HU3, Solo usuarios autenticados pueden eliminar.
router.post('/delete/:id', isAuthenticated, appointmentController.deleteAppointment);

module.exports = router;
