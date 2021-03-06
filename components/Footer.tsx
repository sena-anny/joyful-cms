import Image from 'next/image'
import styles from './Footer.module.scss'

export const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <Image src="/vercel.svg" alt="Vercel Logo" height={'32'} width={'64'} />
    </a>
    <p>
      © {new Date().getFullYear()}{' '}
      <a href="https://joyfultama.com"> Joyful Tama </a> All rights reserved.
    </p>
  </footer>
)
