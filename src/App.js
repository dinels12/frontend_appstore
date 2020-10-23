import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Business from "./components/Dashboard/Business";
import Navbar from "./components/Navigation/Navigation";
import Settings from "./components/Dashboard/Settings";
import axios from "axios";
import Cookies from "js-cookie";
import ShopView from "./components/ShopView";
import WelcomeScreen from "./components/WelcomeScreen";
import { development, production } from "./env";
const web = process.env.NODE_ENV === "production" ? production : development;

export default class App extends Component {
  state = {
    user: { role: "GUEST" },
    company: {},
    products: [],
    loading: true,
  };

  componentDidMount() {
    const sesion = Cookies.get("jwt");
    if (sesion) {
      this.getUser(sesion);
    } else {
      this.setState({ loading: false });
    }
  }

  getUser = async (token) => {
    const res = await axios
      .get(
        `${web}/user`,
        {
          headers: {
            token,
          },
        },
        { withCredentials: true }
      )
      .catch((err) => {
        if (err) console.log(err.response.data.message);
      });
    if (res) {
      if (res.data.role === "USER") {
        return this.setState({ user: res.data, loading: false });
      }
      if (res.data.role === "COMPANY") {
        this.setState({ user: res.data });
        this.getCompany(token);
        return this.getCompanyProducts(token);
      }
    }
  };

  getCompany = async (token) => {
    const res = await axios
      .get(
        `${web}/company`,
        {
          headers: {
            token,
          },
        },
        { withCredentials: true }
      )
      .catch((err) => {
        if (err) console.log(err.response.data.message);
      });
    if (res) {
      this.setState({ company: res.data });
    }
  };

  getCompanyProducts = async (token) => {
    const res = await axios
      .get(
        `${web}/company/products`,
        {
          headers: {
            token,
            company: this.state.company,
          },
        },
        { withCredentials: true }
      )
      .catch((err) => {
        if (err) console.log(err.response.data.message);
      });
    if (res) {
      this.setState({ companyProducts: res.data, loading: false });
    }
  };

  render() {
    const sesion = Cookies.get("jwt");
    const { loading, user, company, companyProducts } = this.state;
    if (loading) {
      return null;
    } else if (user.role === "GUEST" && !sesion) {
      return (
        <>
          <Router>
            <Navbar user={user} />
            <Switch>
              <Route exact path='/' component={WelcomeScreen} />
              <Route path='/shop/:id' component={ShopView} />
              <Redirect to='/' />
            </Switch>
          </Router>
        </>
      );
    } else if (user.role === "USER" && sesion) {
      return (
        <>
          <Router>
            <Navbar user={user} />
            <Switch>
              <Route exact path='/'>
                <Dashboard user={user} />
              </Route>
              <Route path='/settings'>
                <Settings user={user} />
              </Route>
              <Route path='/shop/:id'>
                <ShopView />
              </Route>
            </Switch>
          </Router>
        </>
      );
    } else if (user.role === "COMPANY" && sesion) {
      return (
        <>
          <Router>
            <Navbar user={user} company={company} />
            <Switch>
              <Route exact path='/'>
                <Business
                  user={user}
                  company={company}
                  products={companyProducts}
                  getUser={this.getUser}
                />
              </Route>
              <Redirect to='/' />
            </Switch>
          </Router>
        </>
      );
    }
  }
}
