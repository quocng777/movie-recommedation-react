import { Provider } from 'react-redux'
import { store } from './app/api/store'
import { Toaster } from './components/ui/toaster'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthLoader } from './app/context/auth-loader'

function App() {

  return (
    <Provider store={store}>
      <AuthLoader>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </AuthLoader>
    </Provider>
  )
}

export default App
