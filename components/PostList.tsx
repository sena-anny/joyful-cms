import styles from './PostList.module.scss'
import { PostModel } from '@utils/entities/PostModel'

function formatDate(date: string): string {
  return `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 9)}`
}

export const PostList = ({
  postList,
}: {
  postList: PostModel[]
}): JSX.Element => {
  return (
    <div className={styles.section}>
      <table>
        <thead>
          <tr>
            <th>支援実施日</th>
            <th>支援対象者</th>
            <th>記入者</th>
            <th>支援場面</th>
            <th>支援内容</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => {
            return (
              <tr key={post.id}>
                <td data-label="支援実施日">{formatDate(post.date)}</td>
                <td data-label="支援対象者">{post.targetName}</td>
                <td data-label="記入者">{post.registerName}</td>
                <td data-label="支援場面">{post.title}</td>
                <td data-label="支援内容">{post.content}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
