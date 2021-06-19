import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getPostList } from '@utils/repositories/fetchDataFromClientSide'
import { PostModel } from '@utils/entities/PostModel'
import { useEffect, useState } from 'react'
import { PostList } from '@components/PostList'
import {
  getRegisterList,
  getTargetList,
} from '@utils/repositories/fetchDataFromServerSide'
import { Register } from '@utils/entities/Register'
import { Target } from '@utils/entities/Target'
import { Filter } from '@components/Filter'
import { Button } from '@material-ui/core'
import styles from '@components/Title.module.scss'

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
          {open ? (
            <Button
              className={styles.button}
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              閉じる
            </Button>
          ) : (
            <Button
              className={styles.button}
              variant="outlined"
              color="primary"
              onClick={() => setOpen(true)}
            >
              詳細検索
            </Button>
          )}
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
