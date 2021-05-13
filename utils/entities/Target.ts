import { User } from '@utils/entities/User'

export type Target = User

export const buildTarget = (data: FirebaseFirestore.DocumentData): Target => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  }
}

export const buildTargetList = (
  data: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Target[] => {
  const targets: Target[] = []
  data.forEach((doc) => {
    targets.push({
      id: doc.data().id,
      name: doc.data().name,
      createdAt: doc.data().createdAt || null,
      updatedAt: doc.data().updatedAt || null,
    })
  })
  return targets
}
