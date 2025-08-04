import { ContactProvider } from "./context/ContactContext";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <ContactProvider>
      <HomePage />
    </ContactProvider>
  );
}

export default App;
