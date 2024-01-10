import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
