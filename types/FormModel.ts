import { Moment } from 'moment'

export type UserInputs = {
  lastName: string
  firstName: string
}

export interface ISearchInputs {
  MUIPicker: Moment
  targetPerson: string
  registerPerson: string
}
