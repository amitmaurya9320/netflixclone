import SideBar from "./components/SideBar/SideBar";
import Topbar from "./components/Topbar/Topbar";
import "./App.css";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUserPage from "./pages/NewUserPage/NewUserPage";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";
import Login from "./pages/Login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import ListList from "./pages/ListList/ListList";
import List from "./pages/List/List";
import NewList from "./pages/NewList/NewList";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        {user && (
          <>
            <Topbar />
            <div className="container">
              <SideBar />
              <Route path="/lists">
                <ListList />
              </Route>
              <Route path="/list/:id">
                <List />
              </Route>
              <Route path="/newList">
                <NewList />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/newmovie">
                <NewProduct />
              </Route>
              <Route path="/product/:id">
                <Product />
              </Route>
              <Route path="/newUser">
                <NewUserPage />
              </Route>
              <Route path="/user/:id">
                <User />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
