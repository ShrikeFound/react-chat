
//React Suite
import { Route, Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './styles/main.scss';


function App() {
  return (
    <Switch>
      <Route path="/signin">
        <SignIn/>
      </Route>
      <PrivateRoute path="/">
        <Home/>
      </PrivateRoute>
    </Switch>
  );
}

export default App;
