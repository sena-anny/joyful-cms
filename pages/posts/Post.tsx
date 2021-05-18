import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Search } from '@components/Search'

const Post = (): JSX.Element => {
  return (
    <Layout>
      <Title title={'支援日誌 登録'} />
      <Container>
        <>
          <Search />
        </>
      </Container>
    </Layout>
  )
}

export default Post
