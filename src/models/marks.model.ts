import mongoose from "mongoose"

const markSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    exam_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    marks_obtained: {
        type: Number,
        required: true
    },
    max_marks: {
        type: Number,
        required: true
    },
    entered_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_locked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true , versionKey: false })
export const marksModel = mongoose.models.Marks || mongoose.model('Marks', markSchema)
