import axios from 'axios'

export const getTeachers = async (schoolId: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/v1/school/${schoolId}/teacher`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const getTeacher = async (schoolId: string, teacherId: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/v1/school/${schoolId}/teacher/${teacherId}`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const createTeacher = async (schoolId: string, teacher: any): Promise<any> => {
  try {
    const response = await axios.post(`/api/v1/school/${schoolId}/teacher`, teacher)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const updateTeacher = async (schoolId: string, teacherId: string, teacher: any): Promise<any> => {
  try {
    const response = await axios.put(`/api/v1/school/${schoolId}/teacher/${teacherId}`, teacher)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const deleteTeacher = async (schoolId: string, teacherId: string): Promise<any> => {
  try {
    const response = await axios.delete(`/api/v1/school/${schoolId}/teacher/${teacherId}`)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
