const Attendance = require('../models/Attendance');

// 1. Mark attendance for a student
exports.markAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;
        
        // This line checks if attendance for this student on this date already exists
        // If it exists, it updates it; if not, it creates a new one (upsert)
        const record = await Attendance.findOneAndUpdate(
            { studentId, date },
            { status },
            { new: true, upsert: true } 
        );

        res.status(200).json({ message: "Attendance updated!", record });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Get all attendance records
exports.getAttendance = async (req, res) => {
    try {
        // .populate('studentId') is "magic" - it replaces the ID with the actual Student Name/Roll
        const records = await Attendance.find().populate('studentId');
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};