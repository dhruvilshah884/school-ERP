"use client"

import { useContext, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { useQuery } from "react-query"
import { AuthContext } from "@/context/AuthContext"
import { useParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import PageBreadcrumb from "@/components/ui/PageBreadCrumb"
import ComponentCard from "@/components/ui/ComponentCard"
import { getStudent } from "@/api-handlers/student"
import { Progress } from "@/components/ui/progress"

export default function StudentDetailsPage() {
  const [activeTab, setActiveTab] = useState("details")

  const params = useParams()
  const { user } = useContext(AuthContext)
  const schoolId = user?.school?._id || ""
  const studentId = params?.id || ""

  const { data: studentData, isFetching } = useQuery(["fetchStudentById", schoolId, studentId], () =>
    getStudent(schoolId.toString() || "", studentId.toString() || ""),
  )

  const studentDetails = studentData?.student?.student || {}
  console.log(studentData , "studentData")
  const attendance = studentData?.student?.attendance || []
  console.log(attendance , "attendance")
  const certificates = studentData?.student?.certificate || []
  const library = studentData?.student?.library || []
  const marks = studentData?.student?.marks || []
  const transportation = studentData?.student?.studentTransportation || []

  // Format date function
  const formatDate = (dateString:any) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate age from DOB
  const calculateAge = (dob:any) => {
    if (!dob) return "N/A"
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="ml-8 mr-8">
      <PageBreadcrumb pageTitle="Student" />
      <ComponentCard title="Student Details">
        <div className="mx-auto p-4">
          {isFetching ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <div>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt={studentDetails?.user_id?.name || "Student"}
                  />
                  <AvatarFallback>
                    {studentDetails?.user_id?.name
                      ? studentDetails.user_id.name
                          .split(" ")
                          .map((n:any) => n[0])
                          .join("")
                          .toUpperCase()
                      : "ST"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{studentDetails?.user_id?.name || "Student Name"}</CardTitle>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary">{studentDetails?.admission_number || "N/A"}</Badge>
                    <Badge variant="outline">Class {studentDetails?.class_id?.name || "N/A"}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="academics">Academics</TabsTrigger>
                    <TabsTrigger value="library">Library</TabsTrigger>
                    <TabsTrigger value="certificates">Certificates</TabsTrigger>
                    <TabsTrigger value="transport">Transport</TabsTrigger>
                  </TabsList>

                  {/* Details Tab */}
                  <TabsContent value="details" className="mt-4">
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.user_id?.name || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Admission Number</Label>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.admission_number || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{formatDate(studentDetails?.dob)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{calculateAge(studentDetails?.dob)} years</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Class</Label>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.class_id?.name || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Academic Year</Label>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.class_id?.acadamic_year || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.user_id?.email || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.user_id?.phone || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.address || "N/A"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Blood Group</Label>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-muted-foreground" />
                            <span>{studentDetails?.blood_group || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Guardian Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Guardian Name</Label>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>{studentDetails?.guardian_name || "N/A"}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Guardian Contact</Label>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{studentDetails?.guardian_contact || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Medical Information</h3>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Medical History</Label>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <span>{studentDetails?.medical_history || "No medical history available"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Attendance Tab */}
                  <TabsContent value="attendance" className="mt-4">
                    {attendance && attendance.length > 0 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Present Days</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{attendance[0]?.present_days || 0}</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{attendance[0]?.absent_days || 0}</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Attendance Percentage</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{attendance[0]?.attendance_percentage || 0}%</div>
                              <Progress value={attendance[0]?.attendance_percentage || 0} className="h-2 mt-2" />
                            </CardContent>
                          </Card>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Remarks</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {attendance[0]?.attendance_records?.map((record:any, index:any) => (
                              <TableRow key={index}>
                                <TableCell>{formatDate(record.date)}</TableCell>
                                <TableCell>
                                  <Badge variant={record.status === "Present" ? "success" : "destructive"}>
                                    {record.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{record.remarks || "-"}</TableCell>
                              </TableRow>
                            )) || (
                              <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                  No attendance records available
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Attendance Records</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          There are no attendance records available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Academics Tab */}
                  <TabsContent value="academics" className="mt-4">
                    {marks && marks.length > 0 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{marks[0]?.overall_grade || "N/A"}</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Average Percentage</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{marks[0]?.average_percentage || 0}%</div>
                              <Progress value={marks[0]?.average_percentage || 0} className="h-2 mt-2" />
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{marks[0]?.class_rank || "N/A"}</div>
                            </CardContent>
                          </Card>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">Subject Marks</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Marks Obtained</TableHead>
                              <TableHead>Total Marks</TableHead>
                              <TableHead>Percentage</TableHead>
                              <TableHead>Grade</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {marks[0]?.subject_marks?.map((subject:any, index:any) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{subject.subject_name}</TableCell>
                                <TableCell>{subject.marks_obtained}</TableCell>
                                <TableCell>{subject.total_marks}</TableCell>
                                <TableCell>
                                  {((subject.marks_obtained / subject.total_marks) * 100).toFixed(2)}%
                                </TableCell>
                                <TableCell>{subject.grade}</TableCell>
                              </TableRow>
                            )) || (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                  No subject marks available
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Academic Records</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          There are no academic records available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Library Tab */}
                  <TabsContent value="library" className="mt-4">
                    {library && library.length > 0 ? (
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
                          {library[0]?.books?.map((book:any, index:any) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{book.book_title}</TableCell>
                              <TableCell>{formatDate(book.issue_date)}</TableCell>
                              <TableCell>{formatDate(book.due_date)}</TableCell>
                              <TableCell>{book.return_date ? formatDate(book.return_date) : "-"}</TableCell>
                              <TableCell>
                                <Badge variant={book.status === "Returned" ? "success" : "warning"}>
                                  {book.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{book.fine ? `₹${book.fine}` : "-"}</TableCell>
                            </TableRow>
                          )) || (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center">
                                No library records available
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Library Records</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          There are no library records available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Certificates Tab */}
                  <TabsContent value="certificates" className="mt-4">
                    {certificates && certificates.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {certificates.map((certificate:any, index:any) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle className="text-base">{certificate.certificate_name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Issue Date:</span>
                                  <span className="text-sm">{formatDate(certificate.issue_date)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Certificate ID:</span>
                                  <span className="text-sm">{certificate.certificate_id}</span>
                                </div>
                                {certificate.description && (
                                  <div className="pt-2">
                                    <span className="text-sm text-muted-foreground">Description:</span>
                                    <p className="text-sm mt-1">{certificate.description}</p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" size="sm" className="w-full">
                                <FileText className="mr-2 h-4 w-4" />
                                View Certificate
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Award className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Certificates</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          There are no certificates available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Transport Tab */}
                  <TabsContent value="transport" className="mt-4">
                    {transportation && transportation.length > 0 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Transport Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Route Number</Label>
                                    <div className="flex items-center gap-2">
                                      <Bus className="w-4 h-4 text-muted-foreground" />
                                      <span>{transportation[0]?.route_number || "N/A"}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Vehicle Number</Label>
                                    <div className="flex items-center gap-2">
                                      <Bus className="w-4 h-4 text-muted-foreground" />
                                      <span>{transportation[0]?.vehicle_number || "N/A"}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Pickup Point</Label>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-muted-foreground" />
                                      <span>{transportation[0]?.pickup_point || "N/A"}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Pickup Time</Label>
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-muted-foreground" />
                                      <span>{transportation[0]?.pickup_time || "N/A"}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Drop Point</Label>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-muted-foreground" />
                                      <span>{transportation[0]?.drop_point || "N/A"}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Drop Time</Label>
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-muted-foreground" />
                                      <span>{transportation[0]?.drop_time || "N/A"}</span>
                                    </div>
                                  </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-muted-foreground">Driver Name</Label>
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <span>{transportation[0]?.driver_name || "N/A"}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-muted-foreground">Driver Contact</Label>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span>{transportation[0]?.driver_contact || "N/A"}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Fee Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-muted-foreground">Transport Fee</Label>
                                  <div className="text-2xl font-bold">₹{transportation[0]?.transport_fee || "0"}</div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-muted-foreground">Payment Status</Label>
                                  <div>
                                    <Badge
                                      variant={transportation[0]?.payment_status === "Paid" ? "success" : "warning"}
                                    >
                                      {transportation[0]?.payment_status || "Pending"}
                                    </Badge>
                                  </div>
                                </div>
                                {transportation[0]?.payment_date && (
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-muted-foreground">
                                      Last Payment Date
                                    </Label>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-muted-foreground" />
                                      <span>{formatDate(transportation[0]?.payment_date)}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Bus className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Transport Information</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          There is no transportation information available for this student.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit Student</Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
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
