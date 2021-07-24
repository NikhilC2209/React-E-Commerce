import './App.css';
import Header from "./components/Header";
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import Registration from "./routes/Register";
import Browse from "./routes/Browse";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path = "/" component={LandingPage}/>
      <Route exact path = "/form/login" component={Login}/>
      <Route exact path = "/form/register" component={Registration}/>
      <Route exact path = "/browse" component={Browse}/>
      <Route exact path = "/cart" component={Cart}/>
      <Route exact path = "/checkout" component={Checkout}/>
    </BrowserRouter>  
  );
}

export default App;
