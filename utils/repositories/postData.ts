import firebase from '@utils/firebase/ClientApp'
import { UserInputs } from '../../types/FormModel'
import { PostModel } from '@utils/entities/PostModel'

export const createTargetUser = async (data: UserInputs): Promise<string> => {
  if (!data) {
    return 'error: no data'
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
    return 'error: no data'
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

export const registerPost = async (data: PostModel): Promise<string> => {
  if (!data) {
    return 'error: no data'
  }

  try {
    const db = firebase.firestore()
    const batch = db.batch()
    const ref = db.collection('posts')
    const timeStamp = getTimeStamp()

    batch.set(
      ref.doc(data.id),
      {
        id: data.id,
        title: data.title,
        date: data.date,
        content: data.content,
        targetId: data.targetId,
        registerId: data.registerId,
        createdAt: timeStamp,
        updatedAt: timeStamp,
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
