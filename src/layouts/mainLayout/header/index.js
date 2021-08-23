import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss'
import { Dialog, NormalDropdown } from "../../../components/common";
import { MODAL } from "../../../service/constants";
import { history } from "../../../helpers";
export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertModel: {
                isShow: false,
                type: '',
                title: '',
                id: '',
                index: -1,
                okBtn: ''
            }
        };
    }

    //handleLogOut function call start
    handleLogOut = () => {
        let { alertModel } = this.state;
        alertModel.isShow = true;
        alertModel.type = MODAL.TYPE.WARNING;
        alertModel.okBtn = 'yes, Log Out'
        alertModel.title = 'Are you sure you want to Log Out';
        this.setState({ alertModel })
    }

    //handleAlert 
    handleAlertModal = (value) => {
        let { alertModel } = this.state;
        if (value) {
            alertModel.isShow = false;
           
            history.push(`/auth/login`);
        } else {
            alertModel.isShow = false;
        }
        this.setState({ alertModel })
    }
    render() {
        let { alertModel } = this.state;
        return (
            <header className="p-3 mb-3 border-bottom app-header shadow ">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-dark text-decoration-none">
                            <svg id="bootstrap" viewBox="0 0 118 94" className="bi me-2" width="40" height="32">
                                <title>Bootstrap</title>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
                            </svg>
                            <span class="fs-4">Double header</span>
                        </a>

                        <ul className="nav nav-pills col-12 col-lg-auto my-2 me-lg-3 justify-content-center my-md-0 text-smal">
                            <li className="nav-item"><NavLink to="/dashboard" className="nav-link px-2">Dashboard</NavLink ></li>
                            <li className="nav-item"><NavLink to="/supplier" className="nav-link px-2">Products</NavLink ></li>
                            <li className="nav-item"><NavLink to="/users" className="nav-link px-2">Users</NavLink ></li>
                        </ul>



                        <div className="dropdown text-end" onClick={this.handleLogOut}>
                            <a  className="d-block link-light text-decoration-none dropdown-toggle">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Dialog show={alertModel.isShow} sucessBtn={alertModel.okBtn} onToggle={this.handleAlertModal} type={alertModel.type} title={alertModel.title} />

            </header>
        );
    }
}
