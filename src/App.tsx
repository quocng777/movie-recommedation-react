import { Provider } from 'react-redux'
import { AuthLayout } from './layouts/auth-layout'
import RegisterPage from './pages/auth/register-page'
import { store } from './app/api/store'

function App() {

  return (
    <Provider store={store}>
      <AuthLayout>
          <RegisterPage />
      </AuthLayout>
    </Provider>
  )
}

export default App
