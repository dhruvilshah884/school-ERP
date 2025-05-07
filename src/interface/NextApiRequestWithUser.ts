import { NextApiRequest } from 'next'
import { IAuthUser } from './AuthUser'

export type NextApiRequestWithUser = NextApiRequest & { user: IAuthUser }
