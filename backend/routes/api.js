const express = require('express');
const router = express.Router();

// Import the controllers we just made
const studentCtrl = require('../controllers/studentController');
const attendanceCtrl = require('../controllers/attendanceController');

// Student Routes
router.post('/students', studentCtrl.addStudent);   // To add a student
router.get('/students', studentCtrl.getStudents);   // To see all students

// Attendance Routes
router.post('/attendance', attendanceCtrl.markAttendance); // To mark present/absent
router.get('/attendance', attendanceCtrl.getAttendance);   // To see records

module.exports = router;