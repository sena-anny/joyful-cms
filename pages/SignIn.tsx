import { Layout } from '@components/Layout'
import { Title } from '@components/Title'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../utils/firebase/ClientApp'
import 'firebase/auth'

const uiConfig: firebaseui.auth.Config = {
  // Popup sign in flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export const SignIn = (): JSX.Element => (
  <Layout>
    {/* TODO: Headerコンポーネント*/}
    <Title title={'支援日誌管理ツール'} />
    {/* TODO:コンテナ化 */}
    <p>サインインしてください</p>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </Layout>
)
