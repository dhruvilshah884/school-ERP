import { CommonModal } from './CommonModel'
import { IEvent } from './Event'
import { IParent } from './Parent'
import { IUser } from './User'

export interface IConsentForm extends CommonModal {
  parent_Id: IUser
  event_id: IEvent
  status: 'GIVEN' | 'NOT_GIVEN'
}
