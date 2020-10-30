import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Dashboard, Settings } from "./components/User";
import Business from "./components/Company/Business";
import Navbar from "./components/Navigation/Navigation";
import WelcomeScreen from "./components/WelcomeScreen";
import ShopView from "./components/ShopView";
import { useQuery, gql } from "@apollo/client";
import {
  EditProduct,
  CreateProduct,
} from "./components/Company/ProductHandler";
import {
  AdminWelcomeScreen,
  AdminCompaniesData,
  AdminUsersData,
} from "./components/Admin/";
import { Login, Register } from "./components/Auth";

// import io from "socket.io-client";
// const socket = io("http://localhost:8080");

// socket.on("connect", () => {
//   console.log("server connected");
// });
// socket.on("disconnect", () => {
//   console.log("user is disconnected");
// });

const GET_USER = gql`
  query userData($token: String!) {
    getUser(token: $token) {
      _id
      nick
      name
      lastname
      role
      email
      lastLogin
      createdAt
    }
  }
`;
const GET_COMPANY = gql`
  query getCompany($ownerId: ID!) {
    getCompany(ownerId: $ownerId) {
      products {
        _id
        title
        description
        imageURL
        public_ID
        stock
        price
        active
        publishAds
        createdAt
      }
      company {
        _id
        nick
        name
        location
        description
        ownerId
        active
        schedule
        plan
        maxProductActive
        createdAt
        planPayDate
        expiredPlanDate
      }
    }
  }
`;
const GET_DATA = gql`
  query getServerData {
    getServerData {
      users {
        _id
        name
        lastname
        nick
        role
        email
        lastLogin
        createdAt
        banned
      }
      companies {
        _id
        nick
        name
        location
        description
        ownerId
        active
        schedule
        plan
        maxProductActive
        createdAt
        planPayDate
        expiredPlanDate
      }
    }
  }
`;

export function AdminApp({ user }) {
  const { loading, error, data } = useQuery(GET_DATA, { pollInterval: 1000 });
  if (loading) return null;
  if (error) return <div>Error: {error.message}</div>;

  const {
    getServerData: { users, companies },
  } = data;

  return (
    <>
      <Router>
        <Navbar user={user} />
        <Switch>
          <Route exact path='/'>
            <AdminWelcomeScreen />
          </Route>
          <Route exact path='/users'>
            <AdminUsersData data={users} />
          </Route>
          <Route exact path='/companies'>
            <AdminCompaniesData data={companies} />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    </>
  );
}

export function CompanyApp({ user }) {
  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: { ownerId: user._id },
    pollInterval: 1000,
  });
  if (loading) return null;
  if (error) return <div>Error: ${error.message}</div>;
  if (data) {
    const {
      getCompany: { company, products },
    } = data;
    localStorage.setItem("companyId", company._id);
    return (
      <>
        <Router>
          <Navbar user={user} company={company} />
          <Switch>
            <Route exact path='/'>
              <Business user={user} company={company} products={products} />
            </Route>
            <Route path='/product/new' component={CreateProduct} />
            <Route path='/product/edit/:id' component={EditProduct} />
            <Redirect to='/' />
          </Switch>
        </Router>
      </>
    );
  }
}

export function MainApp({ token }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { token },
    pollInterval: 1000,
  });
  if (loading) return null;
  if (error) return <div>`Error: ${error.message}`</div>;
  const { getUser } = data;
  if (!getUser) {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  }
  if (getUser.role === "USER" && token) {
    return (
      <>
        <Router>
          <Navbar user={getUser} />
          <Switch>
            <Route exact path='/'>
              <Dashboard user={getUser} />
            </Route>
            {/* <Route path='/profile'>
              <Profile user={getUser} />
            </Route>
            <Route path='/search'>
              <Search user={getUser} />
            </Route> */}
            <Route path='/settings'>
              <Settings user={getUser} />
            </Route>
            <Route path='/shop/:id'>
              <ShopView />
            </Route>
          </Switch>
        </Router>
      </>
    );
  } else if (getUser.role === "COMPANY" && token) {
    return <CompanyApp user={getUser} />;
  } else if (getUser.role === "ADMIN" && token) {
    return <AdminApp user={getUser} />;
  }
}

export default function App() {
  const [user] = useState({ role: "GUEST" });
  const token = localStorage.getItem("token");
  if (token) return <MainApp token={token} />;
  return (
    <>
      <Router>
        <Navbar user={user} />
        <Switch>
          <Route exact path='/' component={WelcomeScreen} />
          <Route path='/login' component={Login} />
          <Route path='/sign-up' component={Register} />
          <Route exact path='/shop/:id' component={ShopView} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </>
  );
}
