import React from "react";
import { NormalInput } from '../../../common'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './productEdit.scss';
export class ProductEdit extends React.Component {
    render() {
        let { isShow = false, toggle = '' } = this.props
        return (


            <Modal isOpen={isShow} toggle={toggle} className='edit-modal'>
                {/* <ModalHeader  ></ModalHeader> */}
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Product Edit</h5>
                    <button type="button" className="btn-close" onClick={toggle} aria-label="Close"></button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <NormalInput placeholder="Enter Product Name" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Product Type</label>
                                <NormalInput placeholder="Enter Product Type" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Inhouse Date</label>
                                <NormalInput type="date" placeholder="DD/MM/YYYY" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Amount(INR)</label>
                                <NormalInput placeholder="Enter Amount(INR)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Length in meters</label>
                                <NormalInput placeholder="Enter Total meters" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Cutting</label>
                                <NormalInput placeholder="Enter Total Cutting" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Completed Cutting</label>
                                <NormalInput placeholder="Enter Completed Cutting" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Stitching</label>
                                <NormalInput placeholder="Enter Total Stitching" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Completed Stitching</label>
                                <NormalInput placeholder="Enter Completed Stitching" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Ironing</label>
                                <NormalInput placeholder="Enter Total Ironing" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Completed Ironing</label>
                                <NormalInput placeholder="Enter Completed Ironing" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Packing</label>
                                <NormalInput placeholder="Enter Total Packing" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Completed Packing</label>
                                <NormalInput placeholder="Enter Completed Packing" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
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
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Save</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>


        );
    }
}
