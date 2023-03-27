
import './App.css';
import Login from './components/Login';
import Projects from './components/Projects';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Login/>} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
