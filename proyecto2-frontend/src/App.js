import './App.scss';
import { useWindowSize } from "@uidotdev/usehooks";
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import store from './store/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const size = useWindowSize();
  return (
    <div className="App" style={{height: size.height, width: size.width}}>
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <AppRoutes/>
        </Provider>
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          closeOnClick
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
