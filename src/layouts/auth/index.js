import React from "react";
import './auth.scss'
export class AuthLayout extends React.Component {
    render() {
        return (
            <div className="auth-layout">

                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
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
