import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generateStudentReport = async (schoolId: any, studentId: any) => {
  try {
    const res = await axios.get(`/api/v1/school/${schoolId}/student/${studentId}`)
    const data = res.data.student

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text('Student Report', 10, 10)
    doc.setFontSize(16)
    doc.text(`Name: ${data.student.user_id.name}`, 14, 30)
    doc.text(`Email: ${data.student.user_id.email}`, 14, 36)
    doc.text(`Gender: ${data.student.user_id.gender}`, 14, 42)
    doc.text(`Class: ${data.student.class_id.name}`, 14, 48)

    doc.text('Attendance Summary', 14, 60)
    autoTable(doc, {
      startY: 65,
      head: [['Present Days', 'Absent Days', 'Attendance %']],
      body: [[data.attendance.present_days, data.attendance.absent_days, `${data.attendance.attendance_percentage}%`]]
    })
    const body = data.marks.flatMap((mark: any) => {
      return mark.list.map((item: any) => {
        const subject = item.subject_id.name
        const marks_obtained = item.marks_obtained
        const max_marks = item.max_marks
        return [subject, marks_obtained, max_marks]
      })
    })
    doc.text('Marks Summary', 14, 100)
    doc.text(`Exam Name: ${data.marks[0].exam_name}`, 14, 105)
    doc.text(
      `Obtain Marks: ${data.marks.reduce((acc: any, mark: any) => acc + mark.total_obtained, 0)} / ${data.marks.reduce(
        (acc: any, mark: any) => acc + mark.total_max,
        0
      )}`,
      14,
      110
    )
    doc.text(`Percentage: ${data.marks[0].percentage}%`, 14, 120)
    autoTable(doc, {
      startY: 125,
      head: [['Subject', 'Marks Obtained', 'Max Marks']],
      body: body
    })
    doc.text('Rechecking Summery' , 14 , 130)
    doc.text(`Total Rechecking: ${data.rechecking.total_rechecking}`, 14, 155)
    


    doc.save(`${data.student.user_id.name}_report.pdf`)
  } catch (error) {
    console.log(error)
    return error
  }
}
