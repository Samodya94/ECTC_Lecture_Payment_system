import { BrowserRouter,Routes, Route} from "react-router-dom";

import LecHome from "./Pages/Lecturer/lecHome";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/lecindex" element=<LecHome/>></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
