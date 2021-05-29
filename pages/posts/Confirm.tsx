import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Search } from '@components/Search'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  getRegisterList,
  getTargetList,
} from '@utils/repositories/fetchDataFromServerSide'
import { Register } from '@utils/entities/Register'
import { Target } from '@utils/entities/Target'

const Confirm = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const { registerList, targetList } = data
  return (
    <Layout>
      <Title title={'支援日誌 登録'} />
      <Container>
        <>
          <Search registerList={registerList} targetList={targetList} />
        </>
      </Container>
    </Layout>
  )
}

type Props = {
  data: { registerList: Register[]; targetList: Target[] }
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const targetList = await getTargetList()
  const registerList = await getRegisterList()

  return { props: { data: { registerList, targetList } } }
}

export default Confirm
