import styles from './Card.module.scss'

export const Card = ({
  title,
  description,
  link,
}: {
  title: string
  description: string
  link: string
}): JSX.Element => {
  return (
    <a href={link} className={styles.card}>
      <h3>{title} &rarr;</h3>
      <p>{description}</p>
    </a>
  )
}
