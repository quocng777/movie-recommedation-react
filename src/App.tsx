import { AuthLayout } from './layouts/auth-layout'
import RegisterPage from './pages/auth/register-page'

function App() {

  return (
    <>
      <AuthLayout>
          <RegisterPage />
      </AuthLayout>
    </>
  )
}

export default App
