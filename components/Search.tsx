import styles from './Search.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { ISearchInputs } from '../types/FormModel'
import MomentUtils from '@date-io/moment'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import moment from 'moment'
import { Register } from '@utils/entities/Register'
import { Target } from '@utils/entities/Target'

export const Search = ({
  registerList,
  targetList,
}: {
  registerList: Register[]
  targetList: Target[]
}): JSX.Element => {
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
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              name="MUIPicker"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="対象日選択"
                  format="yyyy/MM/DD"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={styles.form}>
          <InputLabel shrink>支援対象者選択</InputLabel>
          <Controller
            name="targetPerson"
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} className={styles.select}>
                {targetList.map((target) => (
                  <MenuItem value={target.id} key={target.id}>
                    {target.name}
                  </MenuItem>
                ))}
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
                {registerList.map((register) => (
                  <MenuItem value={register.id} key={register.id}>
                    {register.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.registerPerson && (
            <p className={styles.warn}>入力ユーザーを選択してください</p>
          )}
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            reset({
              MUIPicker: moment(),
              registerPerson: '',
              targetPerson: '',
            })
          }}
        >
          リセット
        </button>
        <button className={styles.button} type="submit">
          登録
        </button>
      </form>
    </>
  )
}
