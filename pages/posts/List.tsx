import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { PostModel } from '@utils/entities/PostModel'
import { useEffect, useState } from 'react'
import { PostList } from '@components/PostList'
import {
  getRegisterList,
  getTargetList,
  getPostList,
} from '@utils/repositories/fetchDataFromServerSide'
import { Register } from '@utils/entities/Register'
import { Target } from '@utils/entities/Target'
import { Filter } from '@components/Filter'
import { Toggle } from '@components/Toggle'

const List = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [postList, setPostList] = useState<PostModel[]>([])
  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {
    setPostList(data.postList)
  }, [])

  return (
    <Layout>
      <Title title={'支援日誌一覧'} />
      <Container>
        <>
          <Toggle open={open} setOpen={setOpen} />
          {open && (
            <Filter
              registerList={data.registerList}
              targetList={data.targetList}
              setPostList={setPostList}
            />
          )}
          {postList && <PostList postList={postList} />}
        </>
      </Container>
    </Layout>
  )
}

type Props = {
  data: {
    postList: PostModel[]
    registerList: Register[]
    targetList: Target[]
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const postList: PostModel[] = await getPostList()
  const registerList = await getRegisterList()
  const targetList = await getTargetList()

  return { props: { data: { postList, registerList, targetList } } }
}

export default List
