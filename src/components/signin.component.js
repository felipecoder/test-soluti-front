import React, { Component } from "react";
import { Link } from "react-router-dom"


import api from "../services/api";
import { login, username } from "../services/auth";

export default class SignUp extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("/auth/login", { email, password });
                login(response.data.data.access_token);
                username(response.data.data.user.name);
                this.props.history.push("/app");
            } catch (err) {
                this.setState({
                    error:
                    "Houve um problema com o login, verifique suas credenciais."
                });
            }
        }
    };

    render() {
        return (
            <form className="login" onSubmit={this.handleSignIn}>
                <h3>Fazer Login</h3>
                
                {this.state.error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{this.state.error}</div>}

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" id="email" onChange={e => this.setState({ email: e.target.value })} className="form-control" placeholder="Digite seu email" />
                </div>

                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" id="password" onChange={e => this.setState({ password: e.target.value })} className="form-control" placeholder="Digite sua senha" />
                </div>

                <button type="submit" className="btn btn-success btn-block">Entrar</button>
                <p className="forgot-password text-right">
                    Esqueceu sua senha? <Link to={"/forgot-password"}>Clique aqui</Link>
                </p>
            </form>
        );
    }
}