import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { isAuthenticated, getUserName } from "./services/auth";

import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";
import MyProfile from "./components/myprofile.component";
import Logout from "./components/logout.component";
import App from "./components/app.component";
import PageNotFound from "./components/PageNotFound.component";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';

import logo from './assets/images/soluti-logo.jpg';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <div className="App">
        <Navbar expand="lg" variant="light" bg="white">
            <Container>
                {(() => {
                    if (isAuthenticated()) {
                        return (
                            <Navbar.Brand href={"/app"}>
                                <img src={logo} className="d-inline-block align-top" alt="logo" loading="lazy" />
                            </Navbar.Brand>
                        )
                    } else {
                        return (
                            <Navbar.Brand href={"/"}>
                                <img src={logo} className="d-inline-block align-top" alt="logo" loading="lazy" />
                            </Navbar.Brand>
                        )
                    }
                })()}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {(() => {
                            if (isAuthenticated()) {
                                return (
                                    <NavDropdown title="Bem vindo" id="basic-nav-dropdown">
                                        <NavDropdown.Item href={"/app"}>Usuários</NavDropdown.Item>
                                        <NavDropdown.Item href={"/my-profile"}>Minha Conta</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href={"/logout"}>Sair</NavDropdown.Item>
                                    </NavDropdown>
                                )
                            } else {
                                return (
                                    <React.Fragment>
                                        <Nav.Link href={"/"}>Entrar</Nav.Link>
                                        <Nav.Link href={"/signup"}>Criar Conta</Nav.Link>
                                    </React.Fragment>
                                )
                            }
                        })()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <div className="auth-wrapper">
            <div className="auth-inner">
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <PrivateRoute path="/app" component={App} />
                    <PrivateRoute path="/my-profile" component={MyProfile} />
                    <PrivateRoute path="/logout" component={Logout} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </div>
        </div>
    </div>
  </BrowserRouter>
);

export default Routes;
