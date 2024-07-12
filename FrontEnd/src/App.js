import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Dashboard />
    </div>
  );
}

export default App;
