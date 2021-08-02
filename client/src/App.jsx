import "./App.scss";
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom';
import Home from './page/Home/Home';
import Watch from './page/Watch/Watch';
import Register from './page/Register/Register';
import Login from './page/Login/Login'
import { useContext } from "react";
import {AuthContext} from './context/authContext/AuthContext'
function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
    <Switch>
      <Route exact path = '/'>
          {user ?<Home/>:<Redirect to ='/register'/>}
      </Route>
      <Route path = '/register'>
        {!user?<Register/>:<Redirect to ='/'/>}
      </Route>
      <Route path = '/login'>
        {!user?<Login/>:<Redirect to ='/'/>}
      </Route>

        <Route path = '/movies'>
          {user?<Home type = 'movie'/>:<Redirect to= '/login'/>}
      </Route>
      <Route path = '/series'>
          {user?<Home type = 'series'/>:<Redirect to= '/login'/>}
      </Route>
      <Route path = '/watch'>
          {user?<Watch/>:<Redirect to= '/login'/>}      
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
