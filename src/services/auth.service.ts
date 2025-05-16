import { models } from '@/models'
import { IUser } from '@/interface/User'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
  private user = models.User

  public async signup(data: IUser): Promise<any> {
    const user = await this.user.findOne({ email: data.email })

    if (user) {
      throw new Error('Email already exists')
    }
    const hashedPassword = await hash(data.password, 10)

    const newUser = await this.user.create({
      ...data,
      password: hashedPassword,
      verfication_otp: Math.floor(100000 + Math.random() * 900000).toString(),
      otp_expiry_time: new Date(Date.now() + 10 * 60 * 1000)
    })

    const tokenData = await this.createToken({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: '',
      phone: newUser.phone,
      gender: newUser.gender,
      role: newUser.role,
      school: newUser.school
    })
    return {
      user: newUser,
      token: tokenData.token
    }
  }
  public async login(data: IUser): Promise<any> {
    const user = await this.user.findOne({ email: data.email, isDeleted: false })
    if (!user) {
      throw new Error('User not found')
    }
    const isPasswordValid = await compare(data.password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }
    const tokenData = await this.createToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: '',
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      school: user.school
    })
    return {
      user,
      token: tokenData.token
    }
  }
  public async roles(role: string): Promise<any> {
    const user = await this.user.findOne({ role, isDeleted: false })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
  public async verifyOtp(id: string, otp: string): Promise<any> {
    const user = await this.user.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    if (user.otp_expiry_time < new Date()) {
      throw new Error('OTP expired')
    }
    if (user.verfication_otp !== otp) {
      throw new Error('Invalid OTP')
    }
    user.isVerified = true
    await user.save()
    return user
  }
  public async resendOtp(id: string): Promise<any> {
    const user = await this.user.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    if (user.isVerified) {
      throw new Error('User already verified')
    }
    user.verfication_otp = Math.floor(100000 + Math.random() * 900000).toString()
    user.otp_expiry_time = new Date(Date.now() + 10 * 60 * 1000)
    await user.save()
    return user
  }
  public async resetPassword(data: IUser): Promise<any> {
    const user = await this.user.findOne({ email: data.email, isDeleted: false })
    if (!user) {
      throw new Error('User not found')
    }
    if (!user.isVerified) {
      throw new Error('User not verified')
    }
    if (user.password === data.password) {
      throw new Error('New password should be different from old password')
    }
    const hashedPassword = await hash(data.password, 10)
    user.password = hashedPassword
    await user.save()
    return user
  }
  public async commonSignup(data: any, schoolId: string): Promise<any> {
    try {
      const existingUser = await this.user.findOne({ email: data.email })
      if (existingUser) {
        throw new Error('Email already exists')
      }

      const hashedPassword = await hash(data.password, 10)

      const newUser = await this.user.create({
        ...data,
        school: schoolId,
        password: hashedPassword,
        verification_otp: Math.floor(100000 + Math.random() * 900000).toString(),
        otp_expiry_time: new Date(Date.now() + 10 * 60 * 1000)
      })

      if (data.role === 'STUDENT') {
        await models.Student.create({
          user_id: newUser._id,
          school: schoolId,
          admission_number: data.admission_number,
          class_id: data.class_id,
          division: data.division,
          dob: data.dob,
          blood_group: data.blood_group,
          address: data.address,
          guardian_name: data.guardian_name,
          guardian_contact: data.guardian_contact,
          medical_history: data.medical_history
        })
      }

      if (data.role === 'TEACHER') {
        await models.Teacher.create({
          user_id: newUser._id,
          school: schoolId,
          designation: data.designation,
          subject_specialization: data.subject_specialization
        })
      }

      if (data.role === 'PARENT') {
        await models.Parent.create({
          user_id: newUser._id,
          school: schoolId,
          student_id: data.student_id
        })
      }

      const userObj = newUser.toObject()
      delete userObj.password
      delete userObj.verification_otp

      const { token } = this.createToken(userObj)

      return {
        message: 'Signup successful',
        token,
        user: userObj
      }
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed')
    }
  }
  public async createStudentByTeacher(data: any, schoolId: string): Promise<any> {
    try {
      const existingUser = await this.user.findOne({ email: data.email })
      if (existingUser) {
        throw new Error('Email already exists')
      }
      const hashedPassword = await hash(data.password, 10)
      const newUser = await this.user.create({
        ...data,
        school: schoolId,
        password: hashedPassword,
        verification_otp: Math.floor(100000 + Math.random() * 900000).toString(),
        otp_expiry_time: new Date(Date.now() + 10 * 60 * 1000)
      })
      await models.Student.create({
        user_id: newUser._id,
        school: schoolId,
        admission_number: data.admission_number,
        class_id: data.class_id,
        division: data.division,
        dob: data.dob,
        blood_group: data.blood_group,
        address: data.address,
        guardian_name: data.guardian_name,
        guardian_contact: data.guardian_contact,
        medical_history: data.medical_history
      })
      const userObj = newUser.toObject()
      delete userObj.password
      delete userObj.verification_otp
      const { token } = this.createToken(userObj)
      return {
        message: 'Student created successfully',
        token,
        user: userObj
      }
    } catch (error: any) {
      throw new Error(error.message || 'Student creation failed')
    }
  }

  public createToken(user: IUser): any {
    const dataStoredInToken: any = { ...user, password: undefined }
    const secretKey: any = process.env.SECRET_KEY

    return { token: jwt.sign(dataStoredInToken, secretKey) }
  }
  public async me(id: string): Promise<any> {
    const user = await this.user.findById(id).populate('school')
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
