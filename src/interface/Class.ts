import { CommonModal } from './CommonModel'
import { ISchool } from './School'

export interface IClass extends CommonModal {
  name: string
  acadamic_year: string
  school: ISchool
}
