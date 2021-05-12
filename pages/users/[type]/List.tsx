import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getTargets } from '@utils/repositories/fetchData'
import { Target } from '@utils/entities/Target'

const List = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const { type, targets } = data

  return (
    <Layout>
      {type === 'targets' ? (
        <Title title={'支援対象者 一覧'} />
      ) : (
        <Title title={'管理ユーザー 一覧'} />
      )}
      <Container>
        <>
          <p>User : {targets.map((target) => target.name)}</p>
          <p>Type : {type}</p>
        </>
      </Container>
    </Layout>
  )
}

type Props = {
  data: { type: string; targets: Target[] }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const type = params.type as string
  const targets: Target[] = await getTargets()
  // eslint-disable-next-line no-console
  console.log(targets)

  return { props: { data: { type, targets } } }
}

export default List
