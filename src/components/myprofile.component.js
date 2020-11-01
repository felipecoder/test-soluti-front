import React, { Component } from "react";
import InputMask from 'react-input-mask';

import api, { storage } from "../services/api";

import { maskDate, unmaskDate } from "../services/maskDate";

export default class MyProfile extends Component {

    state = {
        user: [],
        address: [],
        name: "",
        password: "",
        password_confirmation: "",
        current_password: "",
        birthday: "",
        biometry: "",
        street: "",
        city: "",
        state: "",
        number: "",
        region: "",
        complement: "",
        error: ""
    };

    componentDidMount = async e => {
        try{
            const response = await api.get("/auth/user-profile");
            this.setState({ user: response.data.data.user });
            this.setState({ address: response.data.data.address });
            this.setData();
            console.log(response.data.data);
        }catch (err) {
            this.setState({
                error:
                "Houve um problema ao carregar seus dados, tente novamente, se o problema persistir avise nosso suporte."
            });
        }
    }

    setData() {
        this.setState({
            name: this.state.user.name,
            email: this.state.user.email,
            birthday: this.state.user.birthday,
            street: this.state.address.street,
            city: this.state.address.city,
            state: this.state.address.state,
            number: this.state.address.number,
            region: this.state.address.region,
            complement: this.state.address.complement,
        })
    }

    handleUpdate = async e => {        
        e.preventDefault();
        const { name, email, password, password_confirmation, identity, birthday, street, city, state, number, region, complement, biometry, current_password } = this.state;

        if (!name || !email || !birthday || !street || !city || !state || !region || !current_password) {
            this.setState({ error: "Preencha todos os campos para continuar!" });
        } else if (password || password_confirmation) {
            if (password.length < 6 || password_confirmation.length < 6) {
                this.setState({ error: "A senha deve ter no minino 6 caracteres" });
            } else if (password.valueOf() !== password_confirmation.valueOf()) {
                this.setState({ error: "As senhas não conferem" });
            }
        } else {

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let formdata = new FormData();
            formdata.append('name', this.state.name);
            formdata.append('birthday', maskDate( birthday.valueOf() ));
            formdata.append('street', this.state.street);
            formdata.append('city', this.state.city);
            formdata.append('state', this.state.state);
            formdata.append('number', this.state.number);
            formdata.append('region', this.state.region);
            formdata.append('complement', this.state.complement);
            formdata.append('current_password', this.state.current_password);

            if (password || password_confirmation) {
                formdata.append('password', this.state.password);
                formdata.append('password_confirmation', this.state.password_confirmation);
            }
            
            if (biometry) {
                formdata.append('biometry', this.state.biometry, this.state.biometry.name);
            }

            formdata.append('_method', 'PUT');

            try {
                const response = await api.post("/auth/update", formdata);
            } catch (err) {
                this.setState({
                    error:
                    "Houve um problema com a atualização de cadastro, tente novamente, se o problema persistir avise nosso suporte."
                });
            }
        }
    };

    download(){
        var link = storage + this.state.user.biometry;
        return link;
    }

    render() {
        return (
            <form className="register" onSubmit={this.handleUpdate} method="post" encType="multipart/form-data">
                <h3>Minha Conta</h3>

                {this.state.error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{this.state.error}</div>}

                <div className="row">
                    <div className="form-group col-6">
                        <label>Nome</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ name: e.target.value })} value={this.state.name} placeholder="Digite seu nome" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={e => this.setState({ email: e.target.value })} value={this.state.user.email} placeholder="Digite seu email" disabled/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Senha</label>
                        <input type="password" className="form-control" onChange={e => this.setState({ password: e.target.value })} placeholder="Digite sua senha"/>
                    </div>

                    <div className="form-group col-6">
                        <label>Confirmação de Senha</label>
                        <input type="password" className="form-control" onChange={e => this.setState({ password_confirmation: e.target.value })} placeholder="Digite a confirmação de senha"/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Data de Nascimento</label>
                        <InputMask mask="99/99/9999" className="form-control" onChange={e => this.setState({ birthday: e.target.value })} value={unmaskDate(this.state.birthday)} placeholder="Digite sua data de nascimento" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>CPF</label>
                        <InputMask mask="999.999.999-99" className="form-control" onChange={e => this.setState({ identity: e.target.value })} value={this.state.user.identity} placeholder="Digite seu CPF" disabled/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Rua</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ street: e.target.value })} value={this.state.street} placeholder="Digite sua rua" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Número</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ number: e.target.value })} value={this.state.number} placeholder="Digite o número da sua residencia"/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Bairro</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ region: e.target.value })} value={this.state.region} placeholder="Digite seu bairro" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Cidade</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ city: e.target.value })} value={this.state.city} placeholder="Digite sua cidade" required/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-6">
                        <label>Estado</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ state: e.target.value })} value={this.state.state} placeholder="Digite seu Estado" required/>
                    </div>

                    <div className="form-group col-6">
                        <label>Complemento</label>
                        <input type="text" className="form-control" onChange={e => this.setState({ complement: e.target.value })} value={this.state.complement} placeholder=""/>
                    </div>
                </div>

                <div className="form-group">
                    <label>Biometria</label>
                    <div className="form-group col-6">
                        <a class="btn btn-success" href={this.download()} role="button">Download</a>
                    </div>
                    <input type="file" name="file" className="form-control" onChange={this.handleImageChange} accept=".wsq"/>
                </div>

                <div className="form-group">
                    <label>Senha Atual</label>
                    <input type="password" className="form-control" onChange={e => this.setState({ current_password: e.target.value })} required/>
                </div>

                <button type="submit" className="btn btn-success btn-block">Atualizar Cadastro</button>
            </form>
        );
    }
}