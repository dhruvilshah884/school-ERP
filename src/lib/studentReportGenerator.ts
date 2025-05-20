import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment'

export const generateStudentReport = async (schoolId: any, studentId: any) => {
  try {
    const res = await axios.get(`/api/v1/school/${schoolId}/student/${studentId}`)
    const data = res.data.student

    const doc = new jsPDF()
    const typedDoc = doc as jsPDF & { lastAutoTable?: any }

    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Student Report', 14, 20)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Name: ${data.student.user_id.name}`, 14, 35)
    doc.text(`Email: ${data.student.user_id.email}`, 14, 42)
    doc.text(`Gender: ${data.student.user_id.gender}`, 14, 49)
    doc.text(`Class: ${data.student.class_id.name}`, 14, 56)

    doc.setFont('helvetica', 'bold')
    doc.text('Attendance Summary', 14, 70)
    doc.setFont('helvetica', 'normal')
    autoTable(doc, {
      startY: 75,
      head: [['Present Days', 'Absent Days', 'Attendance %']],
      body: [[data.attendance.present_days, data.attendance.absent_days, `${data.attendance.attendance_percentage}%`]]
    })

    let currentY = (typedDoc.lastAutoTable?.finalY || 90) + 10
    const marksBody = data.marks.flatMap((mark: any) =>
      mark.list.map((item: any) => [item.subject_id.name, item.marks_obtained, item.max_marks])
    )

    doc.setFont('helvetica', 'bold')
    doc.text('Marks Summary', 14, currentY)
    doc.setFont('helvetica', 'normal')
    doc.text(`Exam Name: ${data.marks[0].exam_name}`, 14, currentY + 7)
    doc.text(
      `Total: ${data.marks.reduce((acc: any, mark: any) => acc + mark.total_obtained, 0)} / ${data.marks.reduce(
        (acc: any, mark: any) => acc + mark.total_max,
        0
      )}`,
      14,
      currentY + 14
    )
    doc.text(`Percentage: ${data.marks[0].percentage}%`, 14, currentY + 21)
    autoTable(doc, {
      startY: currentY + 28,
      head: [['Subject', 'Marks Obtained', 'Max Marks']],
      body: marksBody
    })

    currentY = (typedDoc.lastAutoTable?.finalY || 120) + 10
    const recheckingBody = data.rechecking.map((r: any) => [r.exam_id.name, r.subject_id.name, r.marks])
    doc.setFont('helvetica', 'bold')
    doc.text('Rechecking Summary', 14, currentY)
    doc.setFont('helvetica', 'normal')
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Exam Name', 'Subject Name', 'Marks']],
      body: recheckingBody
    })

    currentY = (typedDoc.lastAutoTable?.finalY || 140) + 10
    const certificateBody = data.certificate.map((cert: any) => [
      cert.certificate_type,
      cert.certificate_number,
      cert.certificate_url,
      moment(cert.date_issued).format('DD-MM-YYYY'),
      moment(cert.date_expired).format('DD-MM-YYYY')
    ])
    doc.setFont('helvetica', 'bold')
    doc.text('Certificates', 14, currentY)
    doc.setFont('helvetica', 'normal')
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Type', 'Number', 'URL', 'Issued', 'Expired']],
      body: certificateBody
    })

    currentY = (typedDoc.lastAutoTable?.finalY || 160) + 10
    const transportBody = data.studentTransportation.map((t: any) => [
      t.bus.busDriverName,
      t.bus.busNumber,
      t.bus.busDriverPhone,
      t.pickup_location,
      t.dropoff_location,
      t.pickup_time,
      t.dropoff_time
    ])
    doc.setFont('helvetica', 'bold')
    doc.text('Student Transportation', 14, currentY)
    doc.setFont('helvetica', 'normal')
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Driver Name', 'Bus No.', 'Phone', 'Pickup Location', 'Dropoff Location', 'Pickup Time', 'Dropoff Time']],
      body: transportBody
    })

    currentY = (typedDoc.lastAutoTable?.finalY || 180) + 10
    const libraryBody = data.library.map((l: any) => [
      l.bookName,
      l.libraryName,
      moment(l.date).format('DD-MM-YYYY'),
      moment(l.dueDate).format('DD-MM-YYYY'),
      moment(l.returnDate).format('DD-MM-YYYY'),
      l.status,
      l.fineAmount
    ])
    doc.setFont('helvetica', 'bold')
    doc.text('Library Records', 14, currentY)
    doc.setFont('helvetica', 'normal')
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Book Name', 'Library Name', 'Date', 'Due', 'Returned', 'Status', 'Fine']],
      body: libraryBody
    })

    doc.save(`${data.student.user_id.name}_report.pdf`)
  } catch (error) {
    console.error('Error generating student report:', error)
    return error
  }
}
