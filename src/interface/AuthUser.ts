import { ISchool } from './School'
import { IUser } from './User'

export interface IAuthUser extends IUser {
  school: ISchool
}
