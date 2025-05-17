import { NextApiRequest } from 'next'
import { IAuthUser } from './AuthUser'
import { ITeacher } from './Teacher'

export type NextApiRequestWithUser = NextApiRequest & { user: IAuthUser } & {teacher:ITeacher}
