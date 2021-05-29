import firebase from '@utils/firebase/ClientApp'

export type PostModel = {
  id: string
  title: string
  date: string
  content: string
  targetId: string
  registerId: string
  createdAt?: number
  updatedAt?: number
}

export const buildPost = (data: FirebaseFirestore.DocumentData): PostModel => {
  return {
    id: data.id,
    title: data.title,
    date: data.date,
    content: data.content,
    targetId: data.targetId,
    registerId: data.registerId,
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  }
}

export const buildPostList = (
  data: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
): PostModel[] => {
  const posts: PostModel[] = []
  data.forEach((doc) => {
    posts.push({
      id: doc.data().id,
      title: doc.data().title,
      date: doc.data().date,
      content: doc.data().content,
      targetId: doc.data().targetId,
      registerId: doc.data().registerId,
      createdAt: doc.data().createdAt || null,
      updatedAt: doc.data().updatedAt || null,
    })
  })
  return posts
}
