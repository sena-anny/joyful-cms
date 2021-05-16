import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@material-ui/core'
import {
  createRegisterUser,
  createTargetUser,
} from '@utils/repositories/postData'
import { UserInputs } from '../../../types/FormModel'

const Edit = (): JSX.Element => {
  const router = useRouter()
  const { type } = router.query
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
      // eslint-disable-next-line no-console
      console.log('result', result)
    }
    result = await createRegisterUser(data)
    // eslint-disable-next-line no-console
    console.log('result', result)
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
            <label>姓</label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
            {errors.lastName && <p className="warn">姓を入力してください</p>}
            <label>名</label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
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
        </>
      </Container>
    </Layout>
  )
}

export default Edit
