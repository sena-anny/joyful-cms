export type Target = {
  id: number
  name: string
  createdAt?: number
  updatedAt?: number
}

export const buildTarget = (data: FirebaseFirestore.DocumentData): Target => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  }
}

export const buildTargets = (
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
