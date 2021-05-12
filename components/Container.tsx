import styles from '@components/Container.module.scss'

export const Container = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  return <div className={styles.grid}>{children}</div>
}
