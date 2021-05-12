import admin from '@utils/firebase/NodeApp'
import { buildTarget, buildTargets, Target } from '@utils/entities/Target'
import {
  buildRegister,
  buildRegisters,
  Register,
} from '@utils/entities/Register'

export const getTargets = async (): Promise<Target[]> => {
  try {
    const db = admin.firestore()
    const targetsRef = db.collection('targets')
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await targetsRef.get()
    if (snapshot.empty) {
      return null
    }
    return buildTargets(snapshot)
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

export const getRegisters = async (): Promise<Register[]> => {
  try {
    const db = admin.firestore()
    const targetsRef = db.collection('targets')
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = await targetsRef.get()
    if (snapshot.empty) {
      return null
    }
    return buildRegisters(snapshot)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}

export const getRegister = async (id: string): Promise<Register> => {
  try {
    const db = admin.firestore()
    const targetsRef = db.collection('targets')
    const snapshot = await targetsRef.doc(id).get()
    return buildRegister(snapshot.data())
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}
