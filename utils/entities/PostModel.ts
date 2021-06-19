import firebase from '@utils/firebase/ClientApp'

export type PostModel = {
  id: string
  title: string
  date: string
  content: string
  targetName: string
  registerName: string
  createdAt?: number
  updatedAt?: number
}

export const buildPost = (data: FirebaseFirestore.DocumentData): PostModel => {
  return {
    id: data.id,
    title: data.title,
    date: data.date,
    content: data.content,
    targetName: data.targetName,
    registerName: data.registerName,
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
      targetName: doc.data().targetName,
      registerName: doc.data().registerName,
      createdAt: doc.data().createdAt || null,
      updatedAt: doc.data().updatedAt || null,
    })
  })
  return posts
}
