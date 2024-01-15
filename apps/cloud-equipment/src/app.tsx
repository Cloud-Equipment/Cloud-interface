import { BrowserRouter } from 'react-router-dom';
import { AppRouting } from './app-routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import Store from './Store/store';
import { GlobalLoading } from '@cloud-equipment/ui-components';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <AppRouting />
        <ToastContainer />
        <GlobalLoading />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
