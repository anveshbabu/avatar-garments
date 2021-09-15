
import './assets/scss/app.scss';
import Routes from "./routes";
import { initializeFirebase } from './firebase.config';
import 'react-notifications-component/dist/theme.css'
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
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
