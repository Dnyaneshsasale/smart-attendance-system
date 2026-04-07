const Student = require('../models/Student');

// 1. Add a new student
exports.addStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json({ message: "Student added!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};