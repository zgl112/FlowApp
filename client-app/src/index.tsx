import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.min.css";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
