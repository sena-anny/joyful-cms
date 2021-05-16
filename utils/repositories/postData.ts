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

    batch.set(
      ref.doc(targetName),
      {
        name: targetName,
        id: getTimeStamp(),
        createdAt: getTimeStamp(),
        updateAt: getTimeStamp(),
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

    batch.set(
      ref.doc(registerName),
      {
        name: registerName,
        id: getTimeStamp(),
        createdAt: getTimeStamp(),
        updateAt: getTimeStamp(),
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
