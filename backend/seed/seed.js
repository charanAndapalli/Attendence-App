import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Student from '../models/Student.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    await Student.deleteMany({ className: 'A' });

    const students = Array.from({ length: 20 }).map((_, i) => ({
      name: `Student ${i + 1}`,
      rollNumber: (i + 1).toString().padStart(2, '0'),
      className: 'A'
    }));

    await Student.insertMany(students);
    console.log('Seeded 20 students for class A');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
