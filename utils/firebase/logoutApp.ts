import firebase from 'utils/firebase/ClientApp'
import 'firebase/auth'

export const logoutApp = async (): Promise<void> => {
  await firebase.auth().signOut()
}
