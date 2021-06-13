import styles from './Search.module.scss'
import { Controller, useForm } from 'react-hook-form'
import {
  Checkbox,
  Chip,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core'
import { IFilterInputs } from '../types/FormModel'
import MomentUtils from '@date-io/moment'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import moment from 'moment'
import { Register } from '@utils/entities/Register'
import { Target } from '@utils/entities/Target'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { PostModel } from '@utils/entities/PostModel'

export const Filter = ({
  registerList,
  targetList,
  setPostList,
}: {
  registerList: Register[]
  targetList: Target[]
  setPostList: Dispatch<SetStateAction<PostModel[]>>
}): JSX.Element => {
  const { handleSubmit, control, reset } = useForm<IFilterInputs>()

  const [targetsName, setTargetsName] = useState<string[]>([])
  const [registersName, setRegistersName] = useState<string[]>([])

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const filterFirebase = async (data: IFilterInputs) => {
    // 日付と対象者と入力ユーザーを抽出
    const targetDate = data.datePicker.format('YYYYMMDD')
    console.log(targetDate, targetsName, registersName)

    setPostList([])
    return
  }

  const handleTargets = (event: ChangeEvent<{ value: string[] }>) => {
    setTargetsName(event.target.value)
  }

  const handleRegisters = (event: ChangeEvent<{ value: string[] }>) => {
    setRegistersName(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit(filterFirebase)} className={styles.search}>
      <div className={styles.form}>
        {/*全期間のチェックボックスも用意*/}
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
          name="targetPersons"
          control={control}
          defaultValue={targetsName}
          render={({ field }) => (
            <Select
              {...field}
              className={styles.select}
              multiple
              value={targetsName}
              onChange={handleTargets}
              input={<Input />}
              renderValue={(selected) =>
                (selected as string[]).map((value) => (
                  <Chip key={value} label={value} className={styles.chip} />
                ))
              }
              MenuProps={MenuProps}
            >
              {targetList.map((target) => {
                return (
                  <MenuItem value={target.name} key={target.id}>
                    <Checkbox checked={targetsName.indexOf(target.name) > -1} />
                    <ListItemText primary={target.name} />
                  </MenuItem>
                )
              })}
            </Select>
          )}
        />
      </div>
      <div className={styles.form}>
        <InputLabel shrink>入力者選択</InputLabel>
        <Controller
          name="registerPersons"
          control={control}
          defaultValue={registersName}
          render={({ field }) => (
            <Select
              {...field}
              className={styles.select}
              multiple
              value={registersName}
              onChange={handleRegisters}
              input={<Input />}
              renderValue={(selected) =>
                (selected as string[]).map((value) => (
                  <Chip key={value} label={value} className={styles.chip} />
                ))
              }
              MenuProps={MenuProps}
            >
              {registerList.map((register) => {
                return (
                  <MenuItem value={register.name} key={register.id}>
                    <Checkbox
                      checked={registersName.indexOf(register.name) > -1}
                    />
                    <ListItemText primary={register.name} />
                  </MenuItem>
                )
              })}
            </Select>
          )}
        />
      </div>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          setRegistersName([])
          setTargetsName([])
          reset({
            datePicker: moment(),
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