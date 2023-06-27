import './App.scss';
import { useWindowSize } from "@uidotdev/usehooks";
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  const size = useWindowSize();
  return (
    <div className="App" style={{height: size.height, width: size.width}}>
      <AppRoutes/>
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
