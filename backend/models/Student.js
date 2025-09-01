import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    className: { type: String, required: true } // e.g., 'A'
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
