import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import './scss/style.scss';
import RealGamepadDemo from './RealGamepadDemo';
import SimGamepadDemo from './SimGamepadDemo';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/simgamepaddemo" name="Sim Gamepad Demo"><SimGamepadDemo /></Route>
        <Route exact path="/realgamepaddemo" name="Real Gamepad Demo"><RealGamepadDemo /></Route>
        <Route path="/" name="Home"><Home /></Route>
      </Switch>
      </HashRouter>
  );
}


function Home() {
  return (
    <div>
    <h2>Home</h2>
    <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/simgamepaddemo">Sim Gamepad Demo</Link>
            </li>
            <li>
              <Link to="/realgamepaddemo">Real Gamepad Demo</Link>
            </li>
          </ul>
      </nav>
  </div>
  );
}

export default App;
