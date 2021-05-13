import admin from '@utils/firebase/NodeApp'
import { buildTarget, buildTargetList, Target } from '@utils/entities/Target'
import {
  buildRegister,
  buildRegisterList,
  Register,
} from '@utils/entities/Register'

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

export const getTarget = async (id: string): Promise<Target> => {
  try {
    const db = admin.firestore()
    const targetsRef = db.collection('targets')
    const snapshot = await targetsRef.doc(id).get()
    return buildTarget(snapshot.data())
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}

export const getRegisterList = async (): Promise<Register[]> => {
  try {
    const db = admin.firestore()
    const targetsRef = db.collection('registers')
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await targetsRef.get()
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

export const getRegister = async (id: string): Promise<Register> => {
  try {
    const db = admin.firestore()
    const targetsRef = db.collection('registers')
    const snapshot = await targetsRef.doc(id).get()
    return buildRegister(snapshot.data())
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}
