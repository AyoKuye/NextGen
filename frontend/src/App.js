
import './App.css';
import Login from './components/Login';
import Projects from './components/Projects';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/projects" element={<Projects/>} />
          <Route path="/" element={<Login/>} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
