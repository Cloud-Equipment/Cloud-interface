import { BrowserRouter } from 'react-router-dom';
import { AppRouting } from './app-routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import Store from './Store/store';
import { GlobalLoading } from '@cloud-equipment/ui-components';
import { Suspense } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactQueryProvider from './contexts/react-query/ReactQueryProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // Change primary color to Teal 500
    },
    secondary: {
      main: '#ff5722', // Change secondary color to Deep Orange 500
    },
    // You can customize other colors here
  },
});

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <ReactQueryProvider>
              <ThemeProvider theme={theme}>
                <AppRouting />
              </ThemeProvider>
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
