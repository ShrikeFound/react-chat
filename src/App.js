
//React Suite
import { Route, Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { UserProvider } from './context/user.context';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './styles/main.scss';


function App() {
  return (
    <UserProvider>
    <Switch>
      
      <PublicRoute path="/signin">
        <SignIn/>
      </PublicRoute>
      <PrivateRoute path="/">
        <Home/>
      </PrivateRoute>
      </Switch>
      </UserProvider>
  );
}

export default App;
