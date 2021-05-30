import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getPostList } from '@utils/repositories/fetchDataFromClientSide'
import { PostModel } from '@utils/entities/PostModel'
import { useEffect, useState } from 'react'
import { PostList } from '@components/PostList'

const List = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [postList, setPostList] = useState<PostModel[]>([])
  useEffect(() => {
    setPostList(data.postList)
  }, [])

  return (
    <Layout>
      <Title title={'支援日誌一覧'} />
      <Container>
        <>
          {/*フィルターコンポーネント*/}
          {postList && <PostList postList={postList} />}
        </>
      </Container>
    </Layout>
  )
}

type Props = {
  data: { postList: PostModel[] }
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const postList: PostModel[] = await getPostList()

  return { props: { data: { postList } } }
}

export default List
