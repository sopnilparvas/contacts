import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import About from "./components/layout/About";
import Alert from "./components/Alert";
import ContactState from "./context/contacts/ContactState";
import { AuthProvider } from "./context/auth/AuthState";
import { AlertProvider } from "./context/alert/AlertState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ContactState>
        <AlertProvider>
          <Router>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/about' component={About} />
                <Route exact path='/' component={Home} />
              </Switch>
            </div>
          </Router>
        </AlertProvider>
      </ContactState>
    </AuthProvider>
  );
}

export default App;
