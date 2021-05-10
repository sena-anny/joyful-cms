import { Layout } from '@components/Layout'
import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Card } from '@components/Card'

export const Home = (): JSX.Element => (
  <Layout>
    <Title title={'支援日誌管理ツール'} />
    <Container>
      <Card
        title={'支援日誌 登録'}
        description={'支援日誌の登録/編集を実施します'}
        link={'https://nextjs.org/docs'}
      />

      <Card
        title={'支援日誌 閲覧'}
        description={'登録済の支援日誌を確認します'}
        link={'https://nextjs.org/docs'}
      />

      <Card
        title={'利用者さん 登録'}
        description={'利用者さんの新規登録を実施します'}
        link={'https://nextjs.org/docs'}
      />

      <Card
        title={'ユーザー 登録'}
        description={'ユーザーの新規登録を実施します'}
        link={'https://nextjs.org/docs'}
      />
    </Container>
  </Layout>
)

export default Home
