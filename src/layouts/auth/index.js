import React from "react";
import './auth.scss'
export class AuthLayout extends React.Component {
    render() {
        return (
            <div className="auth-layout">

                <div class="container-fluid">
                    <div class="row no-gutter">
                        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div class="col-md-8 col-lg-6">
                            <div class="login d-flex align-items-center py-5">
                                <div class="container">
                                    {this.props.children}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
