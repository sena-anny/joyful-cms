import styles from './PostList.module.scss'
import { PostModel } from '@utils/entities/PostModel'

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
            <th>最終更新日</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => {
            return (
              <tr key={post.id}>
                <td data-label="支援実施日">{post.date}</td>
                <td data-label="支援対象者">{post.targetId}</td>
                <td data-label="記入者">{post.registerId}</td>
                <td data-label="支援場面">{post.title}</td>
                <td data-label="支援内容">{post.content}</td>
                <td data-label="最終更新日">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
