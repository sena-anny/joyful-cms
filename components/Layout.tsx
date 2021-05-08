import { Meta } from '@components/Meta'
import { Footer } from '@components/Footer'
import styles from './Layout.module.css'

type Props = { children: JSX.Element[] }

export const Layout = (props: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <Meta />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  )
}
