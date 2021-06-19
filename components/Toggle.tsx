import styles from './Toggle.module.scss'
import { Button } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'

export const Toggle = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}): JSX.Element => {
  return (
    <>
      {open ? (
        <div className={styles.toggle}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            閉じる{' '}
          </Button>
        </div>
      ) : (
        <div className={styles.toggle}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpen(true)}
          >
            詳細検索
          </Button>
        </div>
      )}
    </>
  )
}
