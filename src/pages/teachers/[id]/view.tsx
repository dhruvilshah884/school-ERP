'use client'

import { useContext, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
  Download,
  School,
  Book
} from 'lucide-react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useQuery } from 'react-query'
import { AuthContext } from '@/context/AuthContext'
import { useParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import PageBreadcrumb from '@/components/ui/PageBreadCrumb'
import ComponentCard from '@/components/ui/ComponentCard'
import { getTeacher } from '@/api-handlers/teacher'
import { Progress } from '@/components/ui/progress'

export default function TeacherDetailsPage() {
  const [activeTab, setActiveTab] = useState('details')

  const params = useParams()
  const { user } = useContext(AuthContext)
  const schoolId = user?.school?._id || ''
  const teacherId = params?.id || ''
  const { data: teacherData, isFetching } = useQuery(['fetchTeacherById', schoolId, teacherId], () =>
    getTeacher(schoolId.toString() || '', teacherId.toString() || '')
  )
  const teacherDetails = teacherData?.data?.teacher || {}
  const assignments = teacherData?.data?.assignment || []
  const attendance = teacherData?.data?.facultAttendance || []

  console.log(attendance, 'attendance')
  const subject = teacherData?.data?.subject || []

  const formatDate = (dateString: any) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
      <PageBreadcrumb pageTitle='Teacher' />
      <ComponentCard title='Teacher Details'>
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
                    alt={teacherDetails?.user_id?.name || 'Teacher'}
                  />
                  <AvatarFallback>
                    {teacherDetails?.user_id?.name
                      ? teacherDetails.user_id.name
                          .split(' ')
                          .map((n: any) => n[0])
                          .join('')
                          .toUpperCase()
                      : 'ST'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className='text-2xl'>{teacherDetails?.user_id?.name || 'Student Name'}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className='grid w-full grid-cols-6'>
                    <TabsTrigger value='details'>Details</TabsTrigger>
                    <TabsTrigger value='attendance'>Attendance</TabsTrigger>
                    <TabsTrigger value='assignments'>Assignments</TabsTrigger>
                    <TabsTrigger value='subject'>Subjects</TabsTrigger>
                  </TabsList>

                  {/* Details Tab */}
                  <TabsContent value='details' className='mt-4'>
                    <div className='grid gap-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Full Name</Label>
                          <div className='flex items-center gap-2'>
                            <User className='w-4 h-4 text-muted-foreground' />
                            <span>{teacherDetails?.user_id?.name || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Email</Label>
                          <div className='flex items-center gap-2'>
                            <Mail className='w-4 h-4 text-muted-foreground' />
                            <span>{teacherDetails?.user_id?.email || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Phone</Label>
                          <div className='flex items-center gap-2'>
                            <Phone className='w-4 h-4 text-muted-foreground' />
                            <span>{teacherDetails?.user_id?.phone || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Designation</Label>
                          <div className='flex items-center gap-2'>
                            <Book className='w-4 h-4 text-muted-foreground' />
                            <span>{teacherDetails?.designation || 'N/A'}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label className='text-sm font-medium text-muted-foreground'>Specialization</Label>
                          <div className='flex items-center gap-2'>
                            <Book className='w-4 h-4 text-muted-foreground' />
                            <span>{teacherDetails?.subject_specialization || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  </TabsContent>

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

                      {attendance?.faculty && attendance.faculty.length > 0 ? (
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
                                {attendance.faculty.map((record: any) => (
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
                  {/* Assignments Tab */}
                  <TabsContent value='assignments' className='mt-4'>
                    {assignments && assignments.length > 0 ? (
                      <div className='space-y-4'>
                        {assignments.map((assignment: any) => (
                          <Card key={assignment._id}>
                            <CardHeader>
                              <CardTitle>{assignment.title || 'Untitled Assignment'}</CardTitle>
                              <CardDescription>Due Date: {formatDate(assignment.due_date)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>{assignment.description || 'No description available.'}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
                        <h3 className='text-lg font-medium'>No Assignments</h3>
                        <p className='text-sm text-muted-foreground mt-2'>No assignment records found.</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Subjects Tab */}
                  <TabsContent value='subject' className='mt-4'>
                    {subject && subject.length > 0 ? (
                      <div className='space-y-4'>
                        {subject.map((subj: any) => (
                          <Card key={subj._id}>
                            <CardHeader>
                              <CardTitle>{subj.name}</CardTitle>
                              <CardDescription>
                                Class: {subj.class_id?.name} ({subj.class_id?.acadamic_year})
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
                        <h3 className='text-lg font-medium'>No Subjects</h3>
                        <p className='text-sm text-muted-foreground mt-2'>No subject records found for this teacher.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button variant='outline'>Edit Teacher</Button>
                <Button>
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
TeacherDetailsPage.layout = DashboardLayout
TeacherDetailsPage.isSecureRoute = true
