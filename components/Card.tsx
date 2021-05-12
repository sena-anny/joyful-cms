import styles from './Card.module.scss'
import Link from 'next/link'

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
    <Link href={link}>
      <a className={styles.card}>
        <h3>{title} &rarr;</h3>
        <p>{description}</p>
      </a>
    </Link>
  )
}
