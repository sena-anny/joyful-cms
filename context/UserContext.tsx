import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import firebase from '../utils/firebase/ClientApp'
import { SignIn } from '@components/SignIn'

type UserContextType = {
  user: firebase.UserInfo | null | undefined
  setUser: Dispatch<SetStateAction<firebase.UserInfo | null>>
  loadingUser: boolean
  isSignIn: boolean
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType>(null)

export default function UserContextComp({
  children,
}: {
  children: JSX.Element
}): JSX.Element {
  const [isSignIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<firebase.UserInfo | null | undefined>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    fetch('/api/ipAuth')
      .then((res) => {
        if (res.ok || res.status == 200) {
          return
        }
      })
      .catch((err) => console.error('エラー発生', err))

    const unsubscribe: firebase.Unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => {
        try {
          if (user) {
            // User is signed in.
            const { uid, displayName, email, photoURL } = user
            // You could also look for the user doc in your Firestore (if you have one):
            // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
            setUser({ uid, displayName, email, photoURL } as firebase.UserInfo)
            setIsSignedIn(true)
          } else {
            setUser(null)
            setIsSignedIn(false)
          }
        } catch (error) {
          // Most probably a connection error. Handle appropriately.
          console.error('Error at FirebaseAuth')
          setIsSignedIn(false)
        } finally {
          setLoadingUser(false)
        }
      })

    // Unsubscribe auth listener on unmount
    return () => unsubscribe()
  }, [])

  if (isSignIn) {
    return (
      <UserContext.Provider
        value={{ user, setUser, loadingUser, isSignIn, setIsSignedIn }}
      >
        {children}
      </UserContext.Provider>
    )
  }
  return (
    <UserContext.Provider
      value={{ user, setUser, loadingUser, isSignIn, setIsSignedIn }}
    >
      <SignIn />
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => useContext(UserContext)
