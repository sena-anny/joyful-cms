import styles from './Button.module.scss'
import Link from 'next/link'

export const Button = ({
  name,
  description,
  link,
}: {
  name: string
  description: string
  link: string
}): JSX.Element => {
  return (
    <Link href={link}>
      <a className={styles.button}>
        <p>{description}</p>
        <button>{name}</button>
      </a>
    </Link>
  )
}
