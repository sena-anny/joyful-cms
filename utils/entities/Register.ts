import { User } from '@utils/entities/User'

export type Register = User

export const buildRegister = (
  data: FirebaseFirestore.DocumentData
): Register => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  }
}

export const buildRegisterList = (
  data: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Register[] => {
  const registers: Register[] = []
  data.forEach((doc) => {
    registers.push({
      id: doc.data().id,
      name: doc.data().name,
      createdAt: doc.data().createdAt || null,
      updatedAt: doc.data().updatedAt || null,
    })
  })
  return registers
}
