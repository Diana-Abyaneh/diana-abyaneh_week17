import { ContactProvider } from "./context/ContactContext";
import HomePage from "./components/HomePage";

function App() {
  return (
    <ContactProvider>
      <HomePage />
    </ContactProvider>
  );
}

export default App;
