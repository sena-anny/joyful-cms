import admin from '@utils/firebase/NodeApp'
import { buildTargetList, Target } from '@utils/entities/Target'
import { buildRegisterList, Register } from '@utils/entities/Register'
import { buildPostList, PostModel } from '@utils/entities/PostModel'

export const getTargetList = async (): Promise<Target[]> => {
  try {
    const db = admin.firestore()
    const targetsRef = db.collection('targets')
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await targetsRef.get()
    if (snapshot.empty) {
      return null
    }
    return buildTargetList(snapshot)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}

export const getRegisterList = async (): Promise<Register[]> => {
  try {
    const db = admin.firestore()
    const registersRef = db.collection('registers')
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await registersRef.get()
    if (snapshot.empty) {
      return null
    }
    return buildRegisterList(snapshot)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}

export const getPostList = async (): Promise<PostModel[]> => {
  try {
    const db = admin.firestore()
    const postsRef = db.collection('posts')
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await postsRef.get()
    if (snapshot.empty) {
      return null
    }
    return buildPostList(snapshot)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}
