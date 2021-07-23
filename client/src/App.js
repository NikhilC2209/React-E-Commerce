import './App.css';
import Header from "./components/Header";
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import Registration from "./routes/Register";
import Browse from "./routes/Browse";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path = "/" component={LandingPage}/>
      <Route exact path = "/form/login" component={Login}/>
      <Route exact path = "/form/register" component={Registration}/>
      <Route exact path = "/browse" component={Browse}/>
    </BrowserRouter>  
  );
}

export default App;
