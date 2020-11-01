import React, { Component } from "react";
import api from "../services/api";
import { logout } from "../services/auth";
import { isAuthenticated } from "../services/auth";

export default class Logout extends Component {
    
    render() {
        return(
            <div>
                {(() => {
                    if (isAuthenticated()) {
                        try {
                            const response = api.post("/auth/logout");
                            logout();
                            this.props.history.push("/");
                        } catch (err) {
                            this.props.history.push("/app");
                            console.log('Error')
                        }
                    } else {
                        this.props.history.push("/");
                    }
                })()}
            </div>
        );
        
    }
}