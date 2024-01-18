import { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'react-toastify/dist/ReactToastify.css';

import { AppRouting } from './app-routing';
import Store from './Store/store';
import { GlobalLoading } from '@cloud-equipment/ui-components';
import ReactQueryProvider from './contexts/react-query/ReactQueryProvider';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <ReactQueryProvider>
              <AppRouting />
            </ReactQueryProvider>
          </Suspense>
          <ToastContainer />
          <GlobalLoading />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
