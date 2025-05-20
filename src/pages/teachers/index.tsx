'use client'
import React, { useState, useEffect, useContext } from 'react'
import { Pencil, Trash2, Plus, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import DashboardLayout from '@/layouts/DashboardLayout'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/use-toast'
import { AuthContext } from '@/context/AuthContext'
import { useQuery, useMutation } from 'react-query'
import { deleteTeacher, getTeachers } from '@/api-handlers/teacher'
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

export default function TeacherPage() {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const pageSize = 10
  const { toast } = useToast()
  const schoolId = user?.school?._id as string
  const [page, setPage] = React.useState(1)
  const [deleteTeacherId, setDeleteTeacherId] = useState<string | null>(null)
  const [teacherName, setTeacherName] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: teacherList, refetch } = useQuery(
    ['TeacherList', schoolId, page],
    () => getTeachers(schoolId as string),
    {
      onSuccess: (data: any) => {},
      onError: error => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch Teacher list'
        })
      }
    }
  )

  const { mutate: handleDelete } = useMutation((teacherId: string) => deleteTeacher(schoolId as string, teacherId), {
    onSuccess: data => {
      toast({
        variant: 'destructive',
        title: 'Success',
        description: 'Teacher deleted successfully'
      })
      refetch()
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete Teacher'
      })
    }
  })

  const teacherData = teacherList?.data || []
  console.log(teacherData, 'teacherdata')

  return (
    <div className='ml-8 mr-8'>
      <PageBreadcrumb pageTitle='Teachers' />
      <div className='space-y-6'>
        <ComponentCard
          title='Teacher Table'
          tillBarRight={
            <Button onClick={() => router.push('/teacher/create')}>
              <Plus className='h-4 w-4 mr-0 md:mr-2' />
              <span className='hidden sm:inline'>Add Teacher</span>
            </Button>
          }
        >
          {' '}
          <div className='flex items-center space-x-2'>
            <Input
              type='search'
              placeholder='Search by name...'
              className='pl-8'
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
                        Teacher Name{' '}
                      </TableCell>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Gender{' '}
                      </TableCell>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Email{' '}
                      </TableCell>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Designation{' '}
                      </TableCell>
                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'>
                        Subject_Specialization{' '}
                      </TableCell>

                      <TableCell className='px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400'>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className='divide-y divide-gray-100 dark:divide-white/[0.05]'>
                    {teacherData.map((item: any) => (
                      <TableRow key={item._id} className='border-b last:border-b-0'>
                        <TableCell className='py-2 px-5 text-sm '>{item.user_id?.name}</TableCell>
                        <TableCell className='py-2 px-5 text-sm '>{item.user_id?.gender}</TableCell>

                        <TableCell className='py-2 px-5 text-sm '>{item.user_id?.email}</TableCell>
                        <TableCell className='py-2 px-5 text-sm '>{item.designation}</TableCell>
                        <TableCell className='py-2 px-5 text-sm '>{item.subject_specialization}</TableCell>

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
                              onClick={() => router.push(`/teachers/${item._id}/view`)}
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
                                    setDeleteTeacherId(item._id as string)
                                    setTeacherName(`${item?.name as string}`)
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
                                      setDeleteTeacherId(null)
                                      setTeacherName(null)
                                    }}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className='bg-red-500 hover:bg-red-600'
                                    onClick={() => {
                                      if (deleteTeacherId) {
                                        handleDelete(deleteTeacherId)
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
        </ComponentCard>
      </div>
    </div>
  )
}
TeacherPage.layout = DashboardLayout
TeacherPage.isSecureRoute = true
