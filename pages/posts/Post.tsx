import { Title } from '@components/Title'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { PostModel } from '@utils/entities/PostModel'
import { useRouter } from 'next/router'
import { getPost } from '@utils/repositories/fetchDataFromClientSide'
import { useEffect, useState } from 'react'
import { Form } from '@components/Form'

const Post = (): JSX.Element => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (router.query) {
      const id = `${router.query.targetDate}-${router.query.targetId}-${router.query.registerId}`
      const fetchPost = async (): Promise<PostModel> => {
        try {
          return await getPost(id)
        } catch (e) {
          return null
        }
      }
      fetchPost().then((data) => {
        if (data !== null) {
          setTitle(data.title)
          setContent(data.content)
        }
        setLoading(false)
      })
    }
  }, [router.query])

  return (
    <Layout>
      <Title title={'支援日誌 登録'} />
      <Container>
        <Form
          title={title}
          content={content}
          targetDate={router.query.targetDate as string}
          targetId={router.query.targetId as string}
          registerId={router.query.registerId as string}
          isLoading={loading}
        />
      </Container>
    </Layout>
  )
}

export default Post
