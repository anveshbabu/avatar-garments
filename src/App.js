
import './assets/scss/app.scss';
import Routes from "./routes";
import { initializeFirebase } from './firebase.config';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
initializeFirebase()
function App() {

  return (
    <div>
      <ReactNotification />
      <Routes />
    </div>
  );
}

export default App;
