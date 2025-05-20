import { models } from '@/models'
import { Types } from 'mongoose'

export class StudentService {
  private student = models.Student

  public async createStudent(data: any): Promise<any> {
    const student = await this.student.create(data)
    return student
  }
  public async getStudents(school: string): Promise<any> {
    const students = await this.student
      .find({ isDeleted: false, school: school })
      .populate('user_id')
      .populate('school')
      .populate('class_id')
    return students
  }
  public async getStudent(id: string): Promise<any> {
    const student = await this.student.findById(id).populate('user_id').populate('school').populate('class_id')
    return student
  }
  public async updateStudent(id: string, data: any): Promise<any> {
    const student = await this.student.findByIdAndUpdate(id, data, { new: true })
    return student
  }
  public async deleteStudent(id: string): Promise<any> {
    const student = await this.student.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return student
  }
  public async getMedicalHistory(id: string): Promise<any> {
    const student = await this.student.findById(id)
    return student.medical_history
  }
  public async getStudentByClass(classId: string): Promise<any> {
    const students = await this.student.find({ class_id: classId })
    return students
  }
  public async getAllDetailsByStudentId(id: string) {
    const student = await this.student.findById(id).populate('user_id').populate('school').populate('class_id')

    if (!student) throw new Error('Student not found')
    const attendance = await models.Attendance.find({ student_id: id, isDeleted: false })
    const attendanceStats = await models.Attendance.aggregate([
      { $match: { student_id: new Types.ObjectId(id), isDeleted: false } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])
    let present_days = 0
    let absent_days = 0
    let total_days = 0

    for (const row of attendanceStats) {
      if (row._id === 'PRESENT') present_days = row.count
      if (row._id === 'ABSENT') absent_days = row.count
      total_days += row.count
    }

    const attendance_percentage = total_days === 0 ? 0 : (present_days / total_days) * 100

    const marksAgg = await models.Marks.aggregate([
      { $match: { student_id: new Types.ObjectId(id), isDeleted: false } },
      {
        $group: {
          _id: '$exam_id',
          totalObtained: { $sum: '$marks_obtained' },
          totalMax: { $sum: '$max_marks' },
          rows: { $push: '$$ROOT' }
        }
      },
      {
        $addFields: {
          percentage: {
            $cond: [{ $eq: ['$totalMax', 0] }, 0, { $multiply: [{ $divide: ['$totalObtained', '$totalMax'] }, 100] }]
          }
        }
      },
      {
        $lookup: {
          from: 'exams',
          localField: '_id',
          foreignField: '_id',
          as: 'exam'
        }
      },
      { $unwind: '$exam' }
    ])
    await Promise.all(
      marksAgg.map(exam =>
        models.Marks.populate(exam.rows, { path: "subject_id" })
      )
    );

    const [fee, rechecking, certificate, studentTransportation, library] = await Promise.all([
      models.FeePayment.find({ student_id: id, isDeleted: false }),
      models.Rechecking.find({ student_id: id, isDeleted: false }).populate('subject_id exam_id approved_by'),
      models.Certificate.find({ student_id: id, isDeleted: false }),
      models.StudentTransportation.find({ student_id: id, isDeleted: false }).populate('bus'),
      models.Library.find({ student_id: id, isDeleted: false })
    ])

    return {
      student,
      attendance: {
        present_days,
        absent_days,
        attendance_percentage: Number(attendance_percentage.toFixed(2)),
        attendance
      },
      marks: marksAgg.map(m => ({
        exam_id: m._id,
        exam_name: m.exam?.name,
        list: m.rows,
        total_obtained: m.totalObtained,
        total_max: m.totalMax,
        percentage: Number(m.percentage.toFixed(2))
      })),
      fee,
      rechecking,
      certificate,
      studentTransportation,
      library
    }
  }
}
