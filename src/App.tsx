import { Provider } from 'react-redux'
import { AuthLayout } from './layouts/auth-layout'
import { store } from './app/api/store'
import { Toaster } from './components/ui/toaster'
import LoginPage from './pages/auth/login-page'

function App() {

  return (
    <Provider store={store}>
      <AuthLayout>
          <LoginPage />
      </AuthLayout>
      <Toaster />
    </Provider>
  )
}

export default App
