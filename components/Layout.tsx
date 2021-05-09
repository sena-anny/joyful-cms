import { Meta } from '@components/Meta'
import { Footer } from '@components/Footer'
import styles from './Layout.module.css'
import { Header } from '@components/Header'

type Props = { children: JSX.Element[] }

export const Layout = (props: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <Meta />
      <Header />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  )
}
