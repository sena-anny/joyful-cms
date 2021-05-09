import Image from 'next/image'
import styles from './Header.module.scss'
import { useUser } from '../context/UserContext'

export const Header = (): JSX.Element => {
  // ログイン判定
  const { setUser, isSignIn, setIsSignedIn } = useUser()
  const logoutCMS = (): void => {
    setUser(null)
    setIsSignedIn(false)
  }
  return (
    <header className={styles.header}>
      <a href="/">
        <Image
          src="/joyful-logo.png"
          alt="ジョイフル"
          height={'64'}
          width={'64'}
        />
      </a>
      {isSignIn && (
        <>
          <button onClick={logoutCMS}>Logout</button>
        </>
      )}
    </header>
  )
}
