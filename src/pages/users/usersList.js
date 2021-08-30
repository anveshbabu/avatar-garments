import React from "react";
import { UserList, UserEdit } from '../../components/pages';
import { NormalButton } from '../../components/common';

export class Users extends React.Component {
    state = {
        isUserEditModal: false,
        userObjForm: {}

    }


    handleOpenForm = (data) => {
        this.setState({ isUserEditModal: true, userObjForm: data })
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

            <UserList openUserForm={this.handleOpenForm} />
            {isUserEditModal ?
                <UserEdit isShow={isUserEditModal} userObjForm={userObjForm} toggle={() => this.setState({ isUserEditModal: false })} /> : ""}
        </div>
    );
}
}
