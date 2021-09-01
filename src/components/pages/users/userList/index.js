import React from "react";
import './userList.scss'
import { UserEdit } from '../userEdit'
import { Dialog, NormalDropdown } from "../../../common";
import { MODAL, STATUS } from "../../../../service/constants";
import { getAllUser, updateUser } from '../../../../api';
export class UserList extends React.Component {
    state = {
        userList: [],
        alertModel: {
            isShow: false,
            type: '',
            title: '',
            id: '',
            index: -1,
            okBtn: '',
            actionLoder: false
        },
        deleteUserIndex: -1,
        isNodata: false,
        isLoder:false
    }



    componentDidMount() {
        this.getAllUserList()
    }


    getAllUserList = () => {
        this.setState({ isLoder: true });
        getAllUser().then((userList) => {
            this.setState({ isLoder: false, userList, isNodata: userList.length === 0 });
        }).catch((error) => {
            this.setState({ isLoder: false });
            console.error(error)
        });

    }

    //handleLogOut function call start
    handleMoreOptions = (type, i) => {
        console.log(i)
        let { alertModel, userList } = this.state;
        if (type.target.value !== 'Edit') {
            alertModel.isShow = true;
            alertModel.type = MODAL.TYPE.WARNING;
            alertModel.okBtn = 'yes, Delete'
            alertModel.title = 'Are you sure you want to Delete this account';
            this.setState({ alertModel, deleteUserIndex: i });
        } else {
            this.props.openUserForm(userList[i])
        }
    }
    //handleAlert 
    handleAlertModal = (value) => {
        let { alertModel, userList, deleteUserIndex } = this.state;
        if (value) {
            let userObj = userList[deleteUserIndex];
            userObj.status = STATUS.DELETED;
            alertModel.actionLoder = true;
            this.setState({ alertModel });
            updateUser(Object.assign({}, userObj), userObj.id).then((data) => {
                alertModel.isShow = false;
                alertModel.actionLoder = false;
                this.setState({ isFormLoder: false, alertModel, deleteUserIndex: -1 });
                // toggle('success')
            }).catch((error) => {
                this.setState({ isFormLoder: false });
                console.error(error)
            });


        } else {
            alertModel.isShow = false;
            this.setState({ isAlertModul: true })
        }
    }
    render() {
        let { userList, alertModel, isNodata,isLoder } = this.state;
        let optionsList = [

            {
                icon: "bi bi-pencil-fill",
                label: "Edit"
            },
            // {
            //     icon: "bi bi-pencil-fill",
            //     label: "Mark as De-active"
            // },
            {
                icon: "bi bi-trash-fill",
                label: "Delete"
            }
        ]
        return (

            <div className="row">
                <div className="col">
                    <table class="table table-borderless user-list table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Designation </th>
                                <th scope="col">User Type</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        {isLoder ?
                            <>
                                {[1, 2, 3, 4, 5, 6].map((data, i) =>
                                    <tbody className="loader-body">
                                        <tr>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                            <td ><label className="skeletonLoader" >&nbsp;</label></td>
                                        </tr>
                                    </tbody>
                                )}
                            </>
                            :
                            <tbody>
                                {!isNodata && userList.map(({ fName, lName, email, phone, userType, designation, status }, i) =>
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{fName} {lName}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td>{designation}</td>
                                        <td>{userType}</td>
                                        <td className="active status-text">{status}</td>
                                        <td>
                                            <NormalDropdown
                                                optionsList={optionsList}
                                                direction="left"
                                                caret={false}
                                                className="bg-transparent p-0 no-caret"
                                                labelIcon="bi bi-three-dots"
                                                onClick={(e) => this.handleMoreOptions(e, i)}
                                            />

                                        </td>
                                    </tr>
                                )}
                                {isNodata ?
                                    <tr>
                                        <td colSpan="8" className="text-center">No data available</td>
                                    </tr> : ''}
                            </tbody>
                        }
                    </table>

                </div>

                <Dialog show={alertModel.isShow} actionLoder={alertModel.actionLoder} sucessBtn={alertModel.okBtn} onToggle={this.handleAlertModal} type={alertModel.type} title={alertModel.title} />

            </div>
        );
    }
}
