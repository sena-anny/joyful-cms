import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import firebase from '../utils/firebase/ClientApp'
import { SignIn } from '../pages/SignIn'

type UserContextType = {
  user: firebase.UserInfo | null | undefined
  setUser: Dispatch<SetStateAction<firebase.UserInfo>>
  loadingUser: boolean
}

export const UserContext = createContext<UserContextType>(null)

export default function UserContextComp({
  children,
}: {
  children: JSX.Element
}): JSX.Element {
  const [isSignIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<firebase.UserInfo | null | undefined>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const unsubscribe: firebase.Unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        try {
          if (user) {
            // User is signed in.
            const { uid, displayName, email, photoURL } = user
            // You could also look for the user doc in your Firestore (if you have one):
            // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
            setIsSignedIn(true)
            setUser({ uid, displayName, email, photoURL } as firebase.UserInfo)
          } else setUser(null)
        } catch (error) {
          // Most probably a connection error. Handle appropriately.
        } finally {
          setLoadingUser(false)
        }
      })

    // Unsubscribe auth listener on unmount
    return () => unsubscribe()
  }, [])

  if (isSignIn) {
    return (
      <UserContext.Provider value={{ user, setUser, loadingUser }}>
        {children}
      </UserContext.Provider>
    )
  }
  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      <SignIn />
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
