import axios from 'axios'

export const getStudents = async (schoolId: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/v1/school/${schoolId}/student`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const getStudent = async (schoolId: string, studentId: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/v1/school/${schoolId}/student/${studentId}`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const createStudent = async (schoolId: string, student: any): Promise<any> => {
  try {
    const response = await axios.post(`/api/v1/school/${schoolId}/student`, student)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const updateStudent = async (schoolId: string, studentId: string, student: any): Promise<any> => {
  try {
    const response = await axios.put(`/api/v1/school/${schoolId}/student/${studentId}`, student)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const deleteStudent = async (schoolId: string, studentId: string): Promise<any> => {
  try {
    const response = await axios.delete(`/api/v1/school/${schoolId}/student/${studentId}`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
