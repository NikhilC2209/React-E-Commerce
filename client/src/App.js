import './App.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from "./routes/LandingPage/LandingPage";
import Login from "./routes/Login";
import Registration from "./routes/Register";
import Browse from "./routes/Browse/Browse";
import Cart from "./routes/Cart/Cart";
import Checkout from "./routes/Checkout";
import Error404 from "./routes/Error404/Error404";

const App = () => {
  return (
    <Router>
      <Route path = "/" component={Header}/>
      <Switch>
        <Route exact path = "/" component={LandingPage}/>
        <Route exact path = "/form/login" component={Login}/>
        <Route exact path = "/form/register" component={Registration}/>
        <Route exact path = "/browse" component={Browse}/>
        <Route exact path = "/cart" component={Cart}/>
        <Route exact path = "/checkout" component={Checkout}/>
        <Route component={Error404}/>
      </Switch>  
    </Router>  
  );
}

export default App;
