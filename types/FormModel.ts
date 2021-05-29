import { Moment } from 'moment'

export type UserInputs = {
  lastName: string
  firstName: string
}

export interface ISearchInputs {
  datePicker: Moment
  targetPerson: string
  registerPerson: string
}
