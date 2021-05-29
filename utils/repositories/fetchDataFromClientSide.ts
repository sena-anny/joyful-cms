import { buildPost, buildPostList, PostModel } from '@utils/entities/PostModel'
import firebase from '@utils/firebase/ClientApp'

export const getPostList = async (): Promise<PostModel[]> => {
  try {
    const db = firebase.firestore()
    const postsRef = db.collection('posts')
    const snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await postsRef.get()
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

export const getPost = async (id: string): Promise<PostModel> => {
  try {
    const db = firebase.firestore()
    const postsRef = db.collection('posts')
    const snapshot = await postsRef.doc(id).get()
    return buildPost(snapshot.data())
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}
