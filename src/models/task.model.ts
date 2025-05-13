import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        default: 'PENDING'
    },
    due_date: {
        type: Date,
        required: true
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    },
    comments: {
        type: String,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    }
},{timestamps: true, versionKey: false})
export const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema)