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
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const searchFirebase = async (data: ISearchInputs) => {
    // 日付と対象者と入力ユーザーを抽出
    const targetDate = data.datePicker.format('YYYYMMDD')
    const targetId = data.targetPerson
    const registerId = data.registerPerson

    await router.push({
      pathname: '/posts/Post',
      query: { targetDate, targetId, registerId },
    })

    return
  }

  return (
    <form onSubmit={handleSubmit(searchFirebase)} className={styles.search}>
      <div className={styles.form}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Controller
            name="datePicker"
            control={control}
            defaultValue={moment()}
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
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*// @ts-ignore*/}
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
            datePicker: moment(),
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
  )
}
