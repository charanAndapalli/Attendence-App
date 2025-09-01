import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Dummy teacher user
const DUMMY_TEACHER = {
  id: 't1',
  username: 'teacher1',
  name: 'Ms. Priya',
  className: 'A'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Simple dummy auth: teacher1 / password123
  if (username === 'teacher1' && password === 'password123') {
    const token = jwt.sign(DUMMY_TEACHER, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token, user: DUMMY_TEACHER });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
