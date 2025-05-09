import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from '../src/serviceWorkerRegistration'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>  commented for once rendering (uncomment when deployment. it will automatically be fixed on deployment)
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
console.log(process.env.NODE_ENV) //necessary for installable !!
serviceWorkerRegistration.register()