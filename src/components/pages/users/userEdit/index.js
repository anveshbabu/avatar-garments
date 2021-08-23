import React from "react";
import { NormalInput, NormalSelect } from '../../../common'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './userEdit.scss';
export class UserEdit extends React.Component {
    render() {
        let { isShow = false, toggle = '' } = this.props
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
                                <NormalInput placeholder="Enter First Name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <NormalInput placeholder="Enter Last Name" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <NormalInput placeholder="Enter Email" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <NormalInput placeholder="Enter Phone" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <NormalInput placeholder="Enter Designation" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Employee code</label>
                                <NormalInput placeholder="Enter Employee code" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">User Type</label>
                                <NormalSelect options={[{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'User' }]} placeholder="Seletct Type" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <NormalSelect value='Active' options={[{ label: 'Active', value: 'Active' }, { label: 'De-active', value: 'De-active' }]} placeholder="Seletct Status" />
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
                    <Button color="primary" onClick={toggle}>Save</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


        );
    }
}
