import { ApiResponse } from '@/interface/ApiResponse'
import axios from 'axios'

export const CommonSignup = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await axios.post('/api/v1/auth/signup', data)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
export const CommonLogin = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await axios.post('/api/v1/auth/login', data)
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}

export const fetchCurrentUser = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get('/api/v1/auth/me')
    return response.data
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
