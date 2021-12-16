import logo from "./logo.svg";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import Edit from "./pages/edit";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>My ToDo App</h3>
        </header>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/create" element={<Create />}></Route>
          <Route exact path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
