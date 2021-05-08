import styles from './Title.module.scss'

export const Title = ({ title }: { title: string }): JSX.Element => {
  return <h2 className={styles.title}>{title}</h2>
}
