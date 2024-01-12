import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Store from "./Store/store";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
