import React from "react";
import { NormalInput, NormalSelect,NormalButton } from '../../../common'
import { Button, Modal,  ModalBody, ModalFooter } from 'reactstrap';
import './userEdit.scss';
import { userObj } from '../../../../entityModel/user';
import SimpleReactValidator from 'simple-react-validator';
import { USER_TYPE, STATUS } from '../../../../service/constants';
import { createAuthentication, updateUser } from '../../../../api'
export class UserEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userObj,
            isFormLoder: false,
        }
        this.validator = new SimpleReactValidator({
            className: 'text-danger'
        });
    }


    componentDidMount() {
        let { userObjForm } = this.props;
        console.log(userObjForm)
        if (!!userObjForm) {
            this.setState({ userObj: userObjForm })
        }
    }

    handleInputChange = (event) => {
        let { userObj } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name)
        this.setState({
            userObj: {
                ...userObj,
                [name]: value
            }
        }, () => console.log(userObj))
    }


    handleFormSubmit = () => {
        let { userObj } = this.state;
        let { toggle } = this.props;
        this.setState({ isFormLoder: true });
        if (this.validator.allValid()) {
            let apiCall = userObj.hasOwnProperty('id') ? updateUser(Object.assign({}, userObj), userObj.id) : createAuthentication(userObj)
            apiCall.then((data) => {
                this.setState({ isFormLoder: false });
                toggle('success')
            }).catch((error) => {
                this.setState({ isFormLoder: false });
                console.error(error)
            });
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }


    }

    render() {
        let { isShow = false, toggle = '' } = this.props;
        let { userObj,isFormLoder } = this.state;
        let userTypeOpp = [{ label: 'Admin', value: USER_TYPE.ADMIN }, { label: 'User', value: USER_TYPE.USER }]
        let statusTypeOpp = [{ label: 'Active', value: STATUS.ACTIVE }, { label: 'in-active', value: STATUS.IN_ACTIVE }]
        return (


            <Modal isOpen={isShow} toggle={toggle} className='edit-modal'>
                {/* <ModalHeader  ></ModalHeader> */}
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">User Edit</h5>
                    <button type="button" className="btn-close" onClick={toggle} aria-label="Close"></button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <NormalInput placeholder="Enter First Name" name="fName" onChange={this.handleInputChange} value={userObj.fName} />
                                {this.validator.message('First Name', userObj.fName, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <NormalInput placeholder="Enter Last Name" name="lName" onChange={this.handleInputChange} value={userObj.lName} />
                                {this.validator.message('Last Name', userObj.lName, 'required')}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <NormalInput placeholder="Enter Email" name="email" onChange={this.handleInputChange} value={userObj.email} />
                                {this.validator.message('Email', userObj.email, 'required|email')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <NormalInput placeholder="Enter Phone" name="Phone" onChange={this.handleInputChange} value={userObj.phone} />
                                {this.validator.message('Phone', userObj.phone, 'required|phone')}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <NormalInput placeholder="Enter Designation" name="designation" onChange={this.handleInputChange} value={userObj.designation} />
                                {this.validator.message('Designation', userObj.designation, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Employee code</label>
                                <NormalInput placeholder="Enter Employee code" name="empCode" onChange={this.handleInputChange} value={userObj.empCode} />
                                {this.validator.message('Employee code', userObj.empCode, 'required')}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">User Type</label>
                                <NormalSelect options={userTypeOpp} name="userType" onChange={this.handleInputChange} value={userObj.userType} placeholder="Seletct Type" />
                                {this.validator.message('User Type', userObj.userType, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <NormalSelect name="status" onChange={this.handleInputChange} value={userObj.status} options={statusTypeOpp} placeholder="Seletct Status" />
                                {this.validator.message('Status', userObj.status, 'required')}
                            </div>
                        </div>
                    </div>


                    <hr />


                    {/* <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Shipment</label>
                                <NormalInput placeholder="Enter Total Shipment" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Completed Shipment</label>
                                <NormalInput placeholder="Enter Completed Shipment" />
                            </div>
                        </div>
                    </div> */}


                </ModalBody>
                <ModalFooter>
                    <NormalButton loader={isFormLoder} label={userObj.hasOwnProperty('id') ? "Update" : 'Save'} onClick={this.handleFormSubmit}/>
                    <NormalButton label="Cancel" className="btn-danger" disabled={isFormLoder} onClick={toggle} />
                </ModalFooter>
            </Modal>


        );
    }
}
