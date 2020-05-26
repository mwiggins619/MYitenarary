import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./Component/Landing";
import Users from "./Component/Users";
import Login from "./Component/Login";
import Cities from "./Component/Cities";
import AddCity from "./Component/AddCity";
import Footer from "./Component/Footer";
import Itinerary from "./Component/Itinerary";
import "bootstrap/dist/css/bootstrap.min.css";

import Notfound from "./Component/Notfound";
import Header from "./Component/Header";
import UserAccount from "./Component/UserAccount";
import LogOut from "./Component/LogOut";

function App() {
  return (
    <Router>
      <Header />

      <div className="App">
        {/* <Link to="/"></Link>

        <Link to="/Users"></Link>
        <Link to="/UserAccount"></Link>
        <Link to="/login"></Link>
        <Link to="/LogOut"></Link>
        <Link to="/Cities"></Link>
        <Link to="/Itineraries"></Link>
        <Link to="/AddCity"></Link> */}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/Users" component={Users} />
          <Route path="/UserAccount" component={UserAccount} />
          <Route exact path="/Login" component={Login} />
          <Route path="/LogOut" component={LogOut} />
          <Route exact path="/Cities" component={Cities} />
          <Route exact path="/AddCity" component={AddCity} />
          <Route exact path="/Itineraries" component={Itinerary} />
          <Route exact path="/Itineraries/all/:city" component={Itinerary} />
          <Route component={Notfound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
