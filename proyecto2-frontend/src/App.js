import './App.scss';
import { useWindowSize } from "@uidotdev/usehooks";
import AppRoutes from './routes/AppRoutes';


function App() {
  const size = useWindowSize();
  return (
    <div className="App" style={{height: size.height, width: size.width}}>
      <AppRoutes/>
    </div>
  );
}

export default App;
