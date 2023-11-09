
import { BrowserRouter,Routes, Route} from "react-router-dom";


import './App.css';
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="App">
  
    <Outlet/>
    </div>
  );
}

export default App;
