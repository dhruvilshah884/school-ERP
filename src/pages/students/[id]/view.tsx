'use client'

import { useContext, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
  Clock,
  Bus,
  Award,
  AlertCircle,
  Download
} from 'lucide-react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useQuery } from 'react-query'
import { AuthContext } from '@/context/AuthContext'
import { useParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import PageBreadcrumb from '@/components/ui/PageBreadCrumb'
import ComponentCard from '@/components/ui/ComponentCard'
import { getStudent } from '@/api-handlers/student'
import { Progress } from '@/components/ui/progress'
import { generateStudentReport } from '@/lib/studentReportGenerator'

export default function StudentDetailsPage() {
  const [activeTab, setActiveTab] = useState('details')

  const params = useParams()
  const { user } = useContext(AuthContext)
  const schoolId = user?.school?._id || ''
  const studentId = params?.id || ''

  const { data: studentData, isFetching } = useQuery(['fetchStudentById', schoolId, studentId], () =>
    getStudent(schoolId.toString() || '', studentId.toString() || '')
  )

  const studentDetails = studentData?.student?.student || {}
  console.log(studentData, 'studentData')
  const attendance = studentData?.student?.attendance || []
  console.log(attendance, 'attendance')
  const certificates = studentData?.student?.certificate || []
  const libraryRecords = studentData?.student?.library || []
  const marks = studentData?.student?.marks || []
  const transportations = studentData?.student?.studentTransportation || []

  // Format date function
  const formatDate = (dateString: any) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Calculate age from DOB
  const calculateAge = (dob: any) => {
    if (!dob) return 'N/A'
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  const getStatusBadgeColor = (status: string) => {
    status = status.toLowerCase()
    if (status === 'present') return 'bg-green-100 text-green-800 border-green-200'
    if (status === 'absent') return 'bg-red-100 text-red-800 border-red-200'
    if (status === 'paid') return 'bg-green-100 text-green-800 border-green-200'
    if (status === 'overdue') return 'bg-amber-100 text-amber-800 border-amber-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className='ml-8 mr-8'>
      <PageBreadcrumb pageTitle='Student' />
      <ComponentCard title='Student Details'>
        <div className='mx-auto p-4'>
          {isFetching ? (
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <Skeleton className='h-20 w-20 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-6 w-40' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </div>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-64 w-full' />
            </div>
          ) : (
            <div>
              <CardHeader className='flex flex-row items-center gap-4'>
                <Avatar className='w-20 h-20'>
                  <AvatarImage
                    src='/placeholder.svg?height=80&width=80'
                    alt={studentDetails?.user_id?.name || 'Student'}
                  />
                  <AvatarFallback>
                    {studentDetails?.user_id?.name
                      ? studentDetails.user_id.name
                          .split(' ')
                          .map((n: any) => n[0])
                          .join('')
                          .toUpperCase()
                      : 'ST'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className='text-2xl'>{studentDetails?.user_id?.name || 'Student Name'}</CardTitle>
                  <div className='flex gap-2 mt-1'>
                    <Badge variant='secondary'>{studentDetails?.admission_number || 'N/A'}</Badge>
                    <Badge variant='outline'>Class {studentDetails?.class_id?.name || 'N/A'}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className='grid w-full grid-cols-6'>
                    <TabsTrigger value='details'>Details</TabsTrigger>
                    <TabsTrigger value='attendance'>Attendance</TabsTrigger>
                    <TabsTrigger value='academics'>Academics</TabsTrigger>
                    <TabsTrigger value='library'>Library</TabsTrigger>
                    <TabsTrigger value='certificates'>Certificates</TabsTrigger>
                    <TabsTrigger value='transport'>Transport</TabsTrigger>
                  </TabsList>

                  {/* Details Tab */}
                  <TabsContent value='details' className='mt-4'>
                    <div className='grid gap-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Full Name</Label>
                          <div className='flex items-center gap-2'>
                            <User className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.user_id?.name || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Admission Number</Label>
                          <div className='flex items-center gap-2'>
                            <FileText className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.admission_number || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Date of Birth</Label>
                          <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4 text-muted-foreground' />
                            <span>{formatDate(studentDetails?.dob)}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Age</Label>
                          <div className='flex items-center gap-2'>
                            <User className='w-4 h-4 text-muted-foreground' />
                            <span>{calculateAge(studentDetails?.dob)} years</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Class</Label>
                          <div className='flex items-center gap-2'>
                            <GraduationCap className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.class_id?.name || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Academic Year</Label>
                          <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.class_id?.acadamic_year || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Email</Label>
                          <div className='flex items-center gap-2'>
                            <Mail className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.user_id?.email || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Phone</Label>
                          <div className='flex items-center gap-2'>
                            <Phone className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.user_id?.phone || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Address</Label>
                          <div className='flex items-center gap-2'>
                            <MapPin className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.address || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Blood Group</Label>
                          <div className='flex items-center gap-2'>
                            <AlertCircle className='w-4 h-4 text-muted-foreground' />
                            <span>{studentDetails?.blood_group || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className='text-lg font-semibold mb-2'>Guardian Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label className='text-sm font-medium text-muted-foreground'>Guardian Name</Label>
                            <div className='flex items-center gap-2'>
                              <User className='w-4 h-4 text-muted-foreground' />
                              <span>{studentDetails?.guardian_name || 'N/A'}</span>
                            </div>
                          </div>
                          <div className='space-y-2'>
                            <Label className='text-sm font-medium text-muted-foreground'>Guardian Contact</Label>
                            <div className='flex items-center gap-2'>
                              <Phone className='w-4 h-4 text-muted-foreground' />
                              <span>{studentDetails?.guardian_contact || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className='text-lg font-semibold mb-2'>Medical Information</h3>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Medical History</Label>
                          <div className='flex items-start gap-2'>
                            <AlertCircle className='w-4 h-4 text-muted-foreground mt-0.5' />
                            <span>{studentDetails?.medical_history || 'No medical history available'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Attendance Tab */}
                  <TabsContent value='attendance'>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-sm font-medium'>Present Days</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className='text-2xl font-bold text-green-600'>{attendance?.present_days || 0}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-sm font-medium'>Absent Days</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className='text-2xl font-bold text-red-600'>{attendance?.absent_days || 0}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-sm font-medium'>Attendance Percentage</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className='text-2xl font-bold'>{attendance?.attendance_percentage || 0}%</div>
                            <Progress
                              value={attendance?.attendance_percentage || 0}
                              className='h-2 mt-2'
                              style={{
                                backgroundColor: attendance?.attendance_percentage < 50 ? '#fecaca' : '#dcfce7'
                              }}
                            />
                          </CardContent>
                        </Card>
                      </div>

                      {attendance?.attendance && attendance.attendance.length > 0 ? (
                        <Card>
                          <CardHeader>
                            <CardTitle>Attendance Records</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {attendance.attendance.map((record: any) => (
                                  <TableRow key={record._id}>
                                    <TableCell>{formatDate(record.date)}</TableCell>
                                    <TableCell>
                                      <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
                          <Clock className='h-12 w-12 text-muted-foreground mb-4' />
                          <h3 className='text-lg font-medium'>No Attendance Records</h3>
                          <p className='text-sm text-muted-foreground mt-2'>
                            There are no attendance records available for this student.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value='academics'>
                    {marks?.length ? (
                      <div className='space-y-6'>
                        {marks.map((exam: any) => (
                          <Card key={exam.exam_id}>
                            <CardHeader>
                              <CardTitle className='flex items-center gap-2'>
                                <BookOpen className='h-5 w-5' />
                                {exam.exam_name ?? 'Exam'}
                                <span className='ml-auto text-sm font-normal'>
                                  {exam.total_obtained}/{exam.total_max} ({exam.percentage.toFixed(2)}%)
                                </span>
                              </CardTitle>
                              <Progress
                                value={exam.percentage}
                                className='h-1.5 mt-2'
                                style={{
                                  backgroundColor: exam.percentage < 50 ? '#fecaca' : '#dcfce7'
                                }}
                              />
                            </CardHeader>

                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Marks Obtained</TableHead>
                                    <TableHead>Max Marks</TableHead>
                                    <TableHead className='text-right'>%</TableHead>
                                  </TableRow>
                                </TableHeader>

                                <TableBody>
                                  {exam.list.map((mark: any) => {
                                    const pct = (mark.marks_obtained / mark.max_marks) * 100
                                    return (
                                      <TableRow key={mark._id}>
                                        <TableCell className='font-medium'>
                                          {mark.subject_id?.name ?? 'Subject'}
                                        </TableCell>
                                        <TableCell>{mark.marks_obtained}</TableCell>
                                        <TableCell>{mark.max_marks}</TableCell>
                                        <TableCell className='text-right'>
                                          {pct.toFixed(2)}%
                                          <Progress
                                            value={pct}
                                            className='h-1.5 mt-1 w-20 ml-auto'
                                            style={{
                                              backgroundColor: pct < 50 ? '#fecaca' : '#dcfce7'
                                            }}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
                        <BookOpen className='h-12 w-12 text-muted-foreground mb-4' />
                        <h3 className='text-lg font-medium'>No Academic Records</h3>
                        <p className='text-sm text-muted-foreground mt-2'>
                          There are no academic records available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value='library'>
                    {libraryRecords && libraryRecords.length > 0 ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className='flex items-center gap-2'>
                            <BookOpen className='h-5 w-5' />
                            Library Records
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Book Title</TableHead>
                                <TableHead>Issue Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Return Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Fine</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {libraryRecords.map((record: any) => (
                                <TableRow key={record._id}>
                                  <TableCell className='font-medium'>{record.bookName}</TableCell>
                                  <TableCell>{formatDate(record.date)}</TableCell>
                                  <TableCell>{formatDate(record.dueDate)}</TableCell>
                                  <TableCell>{record.returnDate ? formatDate(record.returnDate) : '-'}</TableCell>
                                  <TableCell>
                                    <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
                                  </TableCell>
                                  <TableCell>{record.fineAmount ? `₹${record.fineAmount}` : '-'}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
                        <BookOpen className='h-12 w-12 text-muted-foreground mb-4' />
                        <h3 className='text-lg font-medium'>No Library Records</h3>
                        <p className='text-sm text-muted-foreground mt-2'>
                          There are no library records available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value='certificates'>
                    {certificates && certificates.length > 0 ? (
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {certificates.map((certificate: any) => (
                          <Card key={certificate._id} className='overflow-hidden'>
                            <CardHeader className='bg-blue-50'>
                              <CardTitle>{certificate.certificate_type}</CardTitle>
                            </CardHeader>
                            <CardContent className='pt-4'>
                              <div className='space-y-2'>
                                <div className='flex justify-between'>
                                  <span className='text-sm text-muted-foreground'>Certificate Number:</span>
                                  <span className='text-sm font-medium'>{certificate.certificate_number}</span>
                                </div>
                                <div className='flex justify-between'>
                                  <span className='text-sm text-muted-foreground'>Issue Date:</span>
                                  <span className='text-sm'>{formatDate(certificate.date_issued)}</span>
                                </div>
                                <div className='flex justify-between'>
                                  <span className='text-sm text-muted-foreground'>Expiry Date:</span>
                                  <span className='text-sm'>{formatDate(certificate.date_expired)}</span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className='border-t bg-blue-50/50 pt-3'>
                              <Button size='sm' variant='outline' className='w-full' asChild>
                                <a href={certificate.certificate_url} target='_blank' rel='noopener noreferrer'>
                                  <Download className='mr-2 h-4 w-4' />
                                  View Certificate
                                </a>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
                        <Award className='h-12 w-12 text-muted-foreground mb-4' />
                        <h3 className='text-lg font-medium'>No Certificates</h3>
                        <p className='text-sm text-muted-foreground mt-2'>
                          There are no certificates available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value='transport'>
                    {transportations && transportations.length > 0 ? (
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <Card>
                          <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                              <Bus className='h-5 w-5' />
                              Transportation Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Transport ID</Label>
                                <p className='font-medium'>{transportations[0].transportation_id}</p>
                              </div>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Bus Driver Name</Label>
                                <p className='font-medium'>{transportations[0].bus.busDriverName}</p>
                              </div>

                              <div>
                                <Label className='text-sm text-muted-foreground'>Bus Driver Name</Label>
                                <p className='font-medium'>{transportations[0].bus.busDriverPhone}</p>
                              </div>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Bus Driver Name</Label>
                                <p className='font-medium'>{transportations[0].bus.busNumber}</p>
                              </div>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Bus Driver Name</Label>
                                <p className='font-medium'>{transportations[0].bus.busRoute}</p>
                              </div>

                              <div>
                                <Label className='text-sm text-muted-foreground'>Payment Status</Label>
                                <Badge className={getStatusBadgeColor(transportations[0].payment_status)}>
                                  {transportations[0].payment_status}
                                </Badge>
                              </div>
                            </div>

                            <Separator />

                            <div className='grid grid-cols-1 gap-4'>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Pickup Location</Label>
                                <p className='font-medium'>{transportations[0].pickup_location}</p>
                              </div>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Pickup Time</Label>
                                <p className='font-medium'>{transportations[0].pickup_time}</p>
                              </div>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Dropoff Location</Label>
                                <p className='font-medium'>{transportations[0].dropoff_location}</p>
                              </div>
                              <div>
                                <Label className='text-sm text-muted-foreground'>Dropoff Time</Label>
                                <p className='font-medium'>{transportations[0].dropoff_time}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Route Map Placeholder */}
                        <Card>
                          <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                              <MapPin className='h-5 w-5' />
                              Route Map
                            </CardTitle>
                          </CardHeader>
                          <CardContent className='h-64 bg-muted flex items-center justify-center'>
                            <div className='text-center'>
                              <MapPin className='h-10 w-10 text-muted-foreground mx-auto mb-2' />
                              <p className='text-muted-foreground'>Route map visualization</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
                        <Bus className='h-12 w-12 text-muted-foreground mb-4' />
                        <h3 className='text-lg font-medium'>No Transport Information</h3>
                        <p className='text-sm text-muted-foreground mt-2'>
                          There is no transportation information available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button variant='outline'>Edit Student</Button>
                <Button onClick={() => generateStudentReport(schoolId, studentId)}>
                  <Download className='mr-2 h-4 w-4' />
                  Download Profile
                </Button>
              </CardFooter>
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  )
}

StudentDetailsPage.layout = DashboardLayout
StudentDetailsPage.isSecureRoute = true
