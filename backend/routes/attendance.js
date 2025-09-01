import express from 'express';
import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/attendance - submit attendance for a date
router.post('/', auth, async (req, res) => {
  try {
    const { date, records } = req.body; // records: [{ studentId, status }]
    const { className, username } = req.user;

    const studentIds = records.map(r => r.studentId);
    const students = await Student.find({ _id: { $in: studentIds }, className });
    if (students.length !== records.length) {
      return res.status(400).json({ message: 'Invalid students in records' });
    }

    const doc = {
      date: new Date(new Date(date).toDateString()), // normalize to date-only
      className,
      teacherUsername: username,
      records: records.map(r => ({ student: r.studentId, status: r.status }))
    };

    const saved = await Attendance.findOneAndUpdate(
      { date: doc.date, className, teacherUsername: username },
      doc,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit attendance' });
  }
});

// GET /api/attendance/summary?days=30 - class-wise daily percentage
router.get('/summary', auth, async (req, res) => {
  try {
    const { className, username } = req.user;
    const days = Number(req.query.days || 30);
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days + 1);

    const data = await Attendance.aggregate([
      { $match: { className, teacherUsername: username, date: { $gte: new Date(fromDate.toDateString()) } } },
      { $unwind: '$records' },
      {
        $group: {
          _id: '$date',
          total: { $sum: 1 },
          present: {
            $sum: {
              $cond: [{ $eq: ['$records.status', 'Present'] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          presentPct: { $multiply: [{ $divide: ['$present', '$total'] }, 100] }
        }
      },
      { $sort: { date: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get summary' });
  }
});

export default router;
