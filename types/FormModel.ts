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

export interface IFilterInputs {
  startDate: Moment
  endDate: Moment
  targetPersons: string[]
  registerPersons: string[]
}

export interface IPostInputs {
  title: string
  content: string
}
