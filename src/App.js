
import './assets/scss/app.scss';
import Routes from "./routes";
import {initializeFirebase} from './firebase.config'
initializeFirebase()
function App() {

  return (
    <div>
    <Routes />
    </div>
  );
}

export default App;
 