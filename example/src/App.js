import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import RealGamepadDemo from './RealGamepadDemo';
import SimGamepadDemo from './SimGamepadDemo';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/simgamepaddemo" name="Sim Gamepad Demo"><SimGamepadDemo /></Route>
        <Route exact path="/realgamepaddemo" name="Real Gamepad Demo"><RealGamepadDemo /></Route>
        <Route path="/" name="Home"><Home /></Route>
      </Switch>
      </BrowserRouter>
  );
}


function Home() {
  return (
    <div>
    <h2>Home</h2>
    <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/simgamepaddemo">Sim Gamepad Demo</a>
            </li>
            <li>
              <a href="/realgamepaddemo">Real Gamepad Demo</a>
            </li>
          </ul>
      </nav>
  </div>
  );
}

export default App;
