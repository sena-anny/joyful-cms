import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import {
  createRegisterUser,
  createTargetUser,
} from '@utils/repositories/postData'
import { UserInputs } from '../../../types/FormModel'
import { useState } from 'react'
import { DialogWrapper } from '@components/DialogWrapper'

const Edit = (): JSX.Element => {
  const router = useRouter()
  const { type } = router.query
  const [openDialog, setDialog] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>('')
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserInputs>()

  const submitFirebase = async (data: UserInputs) => {
    let result = ''
    if (type === 'targets') {
      result = await createTargetUser(data)
      setDialog(true)
      setAlert(`result is ${result}`)
    }
    result = await createRegisterUser(data)
    setDialog(true)
    setAlert(`result is ${result}`)
  }

  return (
    <Layout>
      {type === 'targets' ? (
        <Title title={'支援対象者 登録'} />
      ) : (
        <Title title={'管理ユーザー 登録'} />
      )}
      <Container>
        <>
          <form onSubmit={handleSubmit(submitFirebase)} className={'form'}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="姓"
                  variant="outlined"
                  placeholder="*必須"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            {errors.lastName && <p className="warn">姓を入力してください</p>}
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="名"
                  variant="outlined"
                  placeholder="*必須"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            {errors.firstName && <p className="warn">名を入力してください</p>}
            <button
              className="reset"
              type="button"
              onClick={() => {
                reset({ lastName: '', firstName: '' })
              }}
            >
              リセット
            </button>
            <button className="submit" type="submit">
              登録
            </button>
          </form>
          <DialogWrapper
            open={openDialog}
            title="結果"
            body={alert}
            setModal={setDialog}
          />
        </>
      </Container>
    </Layout>
  )
}

export default Edit
