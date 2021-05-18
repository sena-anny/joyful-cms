import styles from './Search.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { ISearchInputs } from '../types/FormModel'

export const Search = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ISearchInputs>()

  const searchFirebase = (data: ISearchInputs) => {
    // eslint-disable-next-line no-console
    console.log(data)
    return
  }

  return (
    <>
      <form onSubmit={handleSubmit(searchFirebase)} className={styles.search}>
        <div className={styles.form}>
          <InputLabel shrink>支援対象者選択</InputLabel>
          <Controller
            name="targetPerson"
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} className={styles.select}>
                <MenuItem value={'XXX'}>選択してください</MenuItem>
                <MenuItem value={'AAA'}>Bさん</MenuItem>
              </Select>
            )}
          />
          {errors.targetPerson && (
            <p className={styles.warn}>支援対象者を選択してください</p>
          )}
        </div>
        <div className={styles.form}>
          <InputLabel shrink>入力ユーザー選択</InputLabel>
          <Controller
            name="registerPerson"
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} className={styles.select}>
                <MenuItem value={'XX'}>選択してください</MenuItem>
                <MenuItem value={'B'}>Bさん</MenuItem>
              </Select>
            )}
          />
          {errors.registerPerson && (
            <p className={styles.warn}>入力ユーザーを選択してください</p>
          )}
        </div>
        <button
          className="reset"
          type="button"
          onClick={() => {
            reset({
              registerPerson: '',
              targetPerson: '',
            })
          }}
        >
          リセット
        </button>
        <button className="submit" type="submit">
          検索
        </button>
      </form>
    </>
  )
}
