import React, { Component } from "react";
import InputMask from 'react-input-mask';

import api from "../services/api";

import DataTable from './data-table';

export default class App extends Component {

    state = {
        users: [],
        error: ""
    }

    componentDidMount = async e => {
        try{
            const response = await api.get("/users/list");
            this.setState({ users: response.data.data });
            console.log(response.data.data);
        }catch (err) {
            this.setState({
                error:
                "Houve um problema ao carregar seus dados, tente novamente, se o problema persistir avise nosso suporte."
            });
        }
    }

    dataTable() {
        return this.state.users.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Email</td>
                            <td>CPF</td>
                            <td>Cidade</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.dataTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}