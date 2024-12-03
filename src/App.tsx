import { Provider } from 'react-redux'
import { AuthLayout } from './layouts/auth-layout'
import RegisterPage from './pages/auth/register-page'
import { store } from './app/api/store'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <Provider store={store}>
      <AuthLayout>
          <RegisterPage />
      </AuthLayout>
      <Toaster />
    </Provider>
  )
}

export default App
