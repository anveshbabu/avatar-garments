import React from "react";
import { UserList } from '../../components/pages'

export class Users extends React.Component {
    render() {
        return (
            <div>
                <h4 className="page-titel mb-4 ">
                    Users
                </h4>

                <UserList/>
            </div>
        );
    }
}
