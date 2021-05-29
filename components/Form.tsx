import styles from './Search.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { InputLabel, TextField } from '@material-ui/core'
import { IPostInputs } from '../types/FormModel'
import { Register } from '@utils/entities/Register'
import { Target } from '@utils/entities/Target'
import { useEffect, useState } from 'react'
import {
  getRegister,
  getTarget,
} from '@utils/repositories/fetchDataFromClientSide'

export const Form = ({
  title,
  content,
  targetDate,
  targetId,
  registerId,
  isLoading,
}: {
  title: string
  content: string
  targetDate: string
  targetId: string
  registerId: string
  isLoading: boolean
}): JSX.Element => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IPostInputs>()
  const [targetName, setTargetName] = useState<string>('')
  const [registerName, setRegisterName] = useState<string>('')

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const target: Target = await getTarget(targetId)
        setTargetName(target.name)
        const register: Register = await getRegister(registerId)
        setRegisterName(register.name)
      } catch (e) {
        console.error(e)
      }
    }
    fetchUserName()
  }, [title, content])

  const registerFirebase = async (data: IPostInputs) => {
    console.log(data)

    return
  }

  function formatDate(date: string): string {
    return `${date.slice(0, 4)}年${date.slice(4, 6)}月${date.slice(6, 9)}日`
  }

  return (
    <form onSubmit={handleSubmit(registerFirebase)} className={styles.search}>
      <div className={styles.form}>
        <p>支援実施日</p>
        {formatDate(targetDate)}
      </div>
      <div className={styles.form}>
        <InputLabel shrink>支援対象者</InputLabel>
        <p>{targetName}</p>
      </div>
      <div className={styles.form}>
        <InputLabel shrink>入力ユーザー</InputLabel>
        <p>{registerName}</p>
      </div>
      {!isLoading && (
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          defaultValue={title}
          render={({ field }) => (
            <TextField
              {...field}
              label="支援場面"
              variant="outlined"
              placeholder="*必須"
              margin="normal"
              helperText="（例）母の日カード作り"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      )}
      {errors.title && <p className={styles.warn}>入力してください</p>}
      {!isLoading && (
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          defaultValue={content}
          render={({ field }) => (
            <TextField
              {...field}
              label="内容"
              variant="outlined"
              placeholder="*必須"
              multiline
              rows={8}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      )}
      {errors.content && <p className={styles.warn}>入力してください</p>}

      <button
        className={styles.button}
        type="button"
        onClick={() => {
          reset({
            title: title,
            content: content,
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
