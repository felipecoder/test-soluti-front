import React, { Component } from "react";
import { Link } from "react-router-dom"
import InputMask from 'react-input-mask';

import api from "../services/api";

import { maskDate } from "../services/maskDate";

export default class SignUp extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        identity: "",
        birthday: "teste.jpg",
        biometry: "",
        street: "",
        city: "",
        state: "",
        number: "",
        region: "",
        complement: "",
        error: ""
    };

    handleImageChange = (e) => {
        this.setState({
            biometry: e.target.files[0]
        })
    };

    handleSignUp = async e => {        
        e.preventDefault();
        const { name, email, password, password_confirmation, identity, birthday, street, city, state, number, region, complement, biometry } = this.state;

        if (!name || !email || !password || !password_confirmation || !identity || !birthday || !street || !city || !state || !region) {
            this.setState({ error: "Preencha todos os campos para continuar!" });
        } else if (password.length < 6 || password_confirmation.length < 6) {
            this.setState({ error: "A senha deve ter no minino 6 caracteres" });
        } else if (password.valueOf() !== password_confirmation.valueOf()) {
            this.setState({ error: "As senhas não conferem" });
        } else {

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let formdata = new FormData();
            formdata.append('name', this.state.name);
            formdata.append('email', this.state.email);
            formdata.append('password', this.state.password);
            formdata.append('password_confirmation', this.state.password_confirmation);
            formdata.append('identity', this.state.identity);
            formdata.append('birthday', maskDate( birthday.valueOf() ));
            formdata.append('street', this.state.street);
            formdata.append('city', this.state.city);
            formdata.append('state', this.state.state);
            formdata.append('number', this.state.number);
            formdata.append('region', this.state.region);
            formdata.append('complement', this.state.complement);
            formdata.append('biometry', this.state.biometry, this.state.biometry.name);

            try {
                const response = await api.post("/auth/register", formdata, config);
                this.props.history.push("/");
            } catch (err) {
                this.setState({
                    error:
                    "Houve um problema com o cadastro, tente novamente, se o problema persistir avise nosso suporte."
                });
            }
        }
    };

    render() {
        return (
            <form className="register" onSubmit={this.handleSignUp} method="post" encType="multipart/form-data">
                <h3>Cadastro</h3>

                {this.state.error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{this.state.error}</div>}

                <div className="row">
                    <div className="form-group col-6">
                        <label>Nome</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ name: e.target.value })} placeholder="Digite seu nome" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={e => this.setState({ email: e.target.value })} placeholder="Digite seu email" required/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Senha</label>
                        <input type="password" className="form-control" onChange={e => this.setState({ password: e.target.value })} placeholder="Digite sua senha" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Confirmação de Senha</label>
                        <input type="password" className="form-control" onChange={e => this.setState({ password_confirmation: e.target.value })} placeholder="Digite a confirmação de senha" required/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Data de Nascimento</label>
                        <InputMask mask="99/99/9999" className="form-control" onChange={e => this.setState({ birthday: e.target.value })} placeholder="Digite sua data de nascimento" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>CPF</label>
                        <InputMask mask="999.999.999-99" className="form-control" onChange={e => this.setState({ identity: e.target.value })} placeholder="Digite seu CPF" required/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Rua</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ street: e.target.value })} placeholder="Digite sua rua" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Número</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ number: e.target.value })} placeholder="Digite o número da sua residencia" />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Bairro</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ region: e.target.value })} placeholder="Digite seu bairro" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Cidade</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ city: e.target.value })} placeholder="Digite sua cidade" required/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Estado</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ state: e.target.value })} placeholder="Digite seu Estado" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Complemento</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ complement: e.target.value })} placeholder="" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Biometria</label>
                    <input type="file" name="file" className="form-control" onChange={this.handleImageChange} accept=".wsq" required/>
                </div>

                <button type="submit" className="btn btn-success btn-block">Cadastrar</button>
                <p className="forgot-password text-right">
                    Já tem conta? <Link to={"/"}>Faça login</Link>
                </p>
            </form>
        );
    }
}