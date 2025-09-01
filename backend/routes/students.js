import express from 'express';
import Student from '../models/Student.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/students - fetch students for teacher's class
router.get('/', auth, async (req, res) => {
  try {
    const { className } = req.user;
    const students = await Student.find({ className }).sort({ rollNumber: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

export default router;
