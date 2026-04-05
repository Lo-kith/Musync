import { AuthProvider } from './context/AuthContext'
import AppInner from './AppInner'

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
export default App