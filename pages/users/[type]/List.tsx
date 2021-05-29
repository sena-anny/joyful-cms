import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {
  getRegisterList,
  getTargetList,
} from '@utils/repositories/fetchDataFromServerSide'
import { User } from '@utils/entities/User'
import { UserList } from '@components/UserList'
import { Button } from '@components/Button'

const List = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const { type, userList } = data

  return (
    <Layout>
      {type === 'targets' ? (
        <Title title={'支援対象者 一覧'} />
      ) : (
        <Title title={'管理ユーザー 一覧'} />
      )}
      <Container>
        <>
          <UserList userList={userList} />
          <Button
            name={'登録'}
            description={'新規登録します'}
            link={`/users/${type}/Edit`}
          />
        </>
      </Container>
    </Layout>
  )
}

type Props = {
  data: { type: string; userList: User[] }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const type = params.type as string
  let userList: User[] = undefined
  switch (type) {
    case 'targets':
      userList = await getTargetList()
      break
    case 'registers':
      userList = await getRegisterList()
      break
  }

  return { props: { data: { type, userList } } }
}

export default List
