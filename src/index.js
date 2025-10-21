import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./components/App/App";
//import * as serviceWorker from "./serviceWorker";
import "tachyons";

createRoot(document.getElementById('root')).render( <App />);