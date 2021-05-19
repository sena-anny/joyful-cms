import firebase from '@utils/firebase/ClientApp'
import { UserInputs } from '../../types/FormModel'

export const createTargetUser = async (data: UserInputs): Promise<string> => {
  if (!data) {
    return 'null'
  }
  const targetName = data.lastName + data.firstName

  try {
    const db = firebase.firestore()
    const batch = db.batch()
    const ref = db.collection('targets')
    const timeStamp = getTimeStamp()

    batch.set(
      ref.doc(timeStamp.toString()),
      {
        name: targetName,
        id: timeStamp,
        createdAt: timeStamp,
        updateAt: timeStamp,
      },
      { merge: true }
    )

    await batch.commit()

    return 'success'
  } catch (e) {
    return `error: ${e}`
  }
}

export const createRegisterUser = async (data: UserInputs): Promise<string> => {
  if (!data) {
    return 'null'
  }
  const registerName = data.lastName + data.firstName

  try {
    const db = firebase.firestore()
    const batch = db.batch()
    const ref = db.collection('registers')
    const timeStamp = getTimeStamp()

    batch.set(
      ref.doc(timeStamp.toString()),
      {
        name: registerName,
        id: timeStamp,
        createdAt: timeStamp,
        updateAt: timeStamp,
      },
      { merge: true }
    )

    await batch.commit()

    return 'success'
  } catch (e) {
    return `error: ${e}`
  }
}

function getTimeStamp(): number {
  return new Date().getTime()
}
