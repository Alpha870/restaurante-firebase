import './App.css';
import Controlador from './components/Controlador';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <h1>Bienvenido</h1>
      <Controlador />
      <ToastContainer />
    </div>
  );
}

export default App;
