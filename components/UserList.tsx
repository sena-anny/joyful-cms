import styles from './UserList.module.scss'
import { User } from '@utils/entities/User'

export const UserList = ({ userList }: { userList: User[] }): JSX.Element => {
  return (
    <div className={styles.section}>
      <table>
        <thead>
          <tr>
            <th>お名前</th>
            <th>登録日</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.id}>
                <td data-label="お名前">{user.name}</td>
                <td data-label="登録日">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
