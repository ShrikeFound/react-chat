
//React Suite
import { Route, Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import SignIn from './pages/SignIn';
import './styles/main.scss';


function App() {
  return (
    <Switch>
      <Route>
        <SignIn/>
      </Route>
    </Switch>
  );
}

export default App;
