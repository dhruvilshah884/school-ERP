'use client'
import React, { useState, useContext } from 'react'
import { Pencil, Trash2, Plus, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/use-toast'
import { AuthContext } from '@/context/AuthContext'
import { useQuery, useMutation } from 'react-query'
import { deleteStudent, getStudents } from '@/api-handlers/student'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import PageBreadcrumb from '@/components/ui/PageBreadCrumb'
import ComponentCard from '@/components/ui/ComponentCard'

export default function StudentPage() {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const pageSize = 10
  const { toast } = useToast()
  const schoolId = user?.school?._id as string
  const [page, setPage] = React.useState(1)
  const [deleteStudentId, setDeleteStudentId] = useState<string | null>(null)
  const [studentName, setStudentName] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedGender, setSelectedGender] = useState('')

  const { data: studentList, refetch } = useQuery(
    ['customerslist', schoolId, page],
    () => getStudents(schoolId as string),
    {
      onSuccess: (data: any) => {},
      onError: error => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch Student list'
        })
      }
    }
  )

  const { mutate: handleDelete } = useMutation((studentId: string) => deleteStudent(schoolId as string, studentId), {
    onSuccess: data => {
      toast({
        variant: 'destructive',
        title: 'Success',
        description: 'Student deleted successfully'
      })
      refetch()
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete Student'
      })
    }
  })

  const studentData = studentList?.students || []

  const filterStudents = studentData.filter((student: any) => {
    const studentName = `${student.user_id?.name} ${student.user_id?.last_name}`.toLowerCase()
    const matchesName = studentName.includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === '' || student.class_id?.name === selectedClass
    const matchesGender = selectedGender === '' || student.user_id.gender === selectedGender

    return matchesName && matchesClass && matchesGender
  })

  const resetFilters = () => {
    setSelectedClass('')
    setSelectedGender('')
  }

  return (
    <div className='ml-8 mr-8'>
      <PageBreadcrumb pageTitle='Students' />
      <div className='space-y-6'>
        <ComponentCard
          title='Students Table'
          tillBarRight={
            <Button onClick={() => router.push('/customers/create')}>
              <Plus className='h-4 w-4 mr-0 md:mr-2' />
              <span className='hidden sm:inline'>Add Students</span>
            </Button>
          }
        >
          {' '}
          <div className='flex items-center space-x-2'>
            <Select onValueChange={value => setSelectedClass(value)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a class' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Classes</SelectLabel>
                  {[...new Set(studentData.map((s: any) => s.class_id?.name))].map((className: any) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={value => setSelectedGender(value)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a gender' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {(selectedClass || selectedGender) && (
              <button
                onClick={resetFilters}
                className='text-sm text-gray-500 hover:text-gray-700 dark:text-white/[0.60] dark:hover:text-white'
              >
                Remove Filter
              </button>
            )}

            <Input
              type='search'
              placeholder='Search by name...'
              className='pl-5'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
            <div className='max-w-full overflow-x-auto'>
              <div className='min-w-[1102px]'>
                <Table>
                  <TableHeader className='border-b border-gray-100 dark:border-white/[0.05]'>
                    <TableRow>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Student Name{' '}
                      </TableCell>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Gender{' '}
                      </TableCell>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Email{' '}
                      </TableCell>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Class/Division{' '}
                      </TableCell>

                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400'>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className='divide-y divide-gray-100 dark:divide-white/[0.05]'>
                    {filterStudents.map((item: any) => (
                      <TableRow key={item._id} className='border-b last:border-b-0'>
                        <TableCell className='py-2 px-5 text-sm '>{item.user_id?.name}</TableCell>
                        <TableCell className='py-2 px-5 text-sm '>{item.user_id?.gender}</TableCell>

                        <TableCell className='py-2 px-5 text-sm '>{item.user_id?.email}</TableCell>
                        <TableCell className='py-2 px-5 text-sm '>
                          {item.class_id?.name}/{item?.division}
                        </TableCell>

                        <TableCell className='py-2 text-sm '>
                          <div className='flex space-x-1 justify-end '>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-blue-100'
                              onClick={() => router.push(`/customers/${item._id}/edit`)}
                            >
                              <Pencil className='h-3 w-3' />
                              <span className='sr-only text-center'>Edit</span>
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-100'
                              onClick={() => router.push(`/students/${item._id}/view`)}
                            >
                              <Eye className='h-3 w-3' />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-100'
                                  onClick={() => {
                                    setDeleteStudentId(item._id as string)
                                    setStudentName(`${item?.name as string}`)
                                  }}
                                >
                                  <Trash2 className='h-3 w-3' />
                                  <span className='sr-only'>Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure you want to delete {item.user_id?.name}?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    onClick={() => {
                                      setDeleteStudentId(null)
                                      setStudentName(null)
                                    }}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className='bg-red-500 hover:bg-red-600'
                                    onClick={() => {
                                      if (deleteStudentId) {
                                        handleDelete(deleteStudentId)
                                      }
                                    }}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}{' '}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          {/* <div className='flex items-center justify-between mt-3'>
                <p className='text-sm text-muted-foreground'>
                  Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, customersData.length)} of {''}
                  {count} entries
                </p>
                <div className='flex items-center space-x-2'>
                  <Button variant='outline' size='sm' onClick={handlePreviousPage} disabled={page === 1}>
                    <ChevronLeft className='h-4 w-4' />
                    Previous
                  </Button>
                  <Button variant='outline' size='sm' onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              </div> */}
        </ComponentCard>
      </div>
    </div>
  )
}
StudentPage.layout = DashboardLayout
StudentPage.isSecureRoute = true
