import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    className: { type: String, required: true },
    teacherUsername: { type: String, required: true },
    records: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        status: { type: String, enum: ['Present', 'Absent'], required: true }
      }
    ]
  },
  { timestamps: true }
);

attendanceSchema.index({ date: 1, className: 1, teacherUsername: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
