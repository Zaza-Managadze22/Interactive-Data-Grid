import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Demo from "./Demo";

function App() {
  return (
    <ErrorBoundary>
      <Demo />
    </ErrorBoundary>
  );
}

export default App;
