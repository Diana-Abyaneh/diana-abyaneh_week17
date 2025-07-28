import HomePage from "./components/HomePage"
import { ContactProvider } from "./context/ContactContext"

function App() {
  return (
    <ContactProvider>
      <HomePage />
    </ContactProvider>
  )
}

export default App