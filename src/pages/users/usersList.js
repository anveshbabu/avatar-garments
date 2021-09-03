import React from "react";
import { UserList, UserEdit } from '../../components/pages';
import { NormalButton } from '../../components/common';

export class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserEditModal: false,
            userObjForm: {}

        }
        this.userList = React.createRef();
    }



    handleOpenForm = (data) => {
        this.setState({ isUserEditModal: true, userObjForm: data });

    }

    handleUserEditHide = (data) => {
        this.setState({ isUserEditModal: false, userObjForm: {} })
        if (data === 'success') {
            this.userList.current.getAllUserList();
        }
    }

    render() {
        let { isUserEditModal, userObjForm } = this.state;
        return (
            <div>

                <div className="row">
                    <div className="col-md-6">
                        <h4 className="page-titel mb-4 ">Users</h4>
                    </div>
                    <div className="col-md-6 text-end">
                        <NormalButton label='Add New' className="btn-sm btn-primary" onClick={() => this.setState({ isUserEditModal: true })} />
                    </div>
                </div>

                <UserList ref={this.userList} openUserForm={this.handleOpenForm} />
                {isUserEditModal ?
                    <UserEdit isShow={isUserEditModal} userObjForm={userObjForm} toggle={this.handleUserEditHide} /> : ""}
            </div>
        );
    }
}
