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
                    <hr />
                    <div className="row">
                        {/* <div className="col-12">
                            <h4 className="content-title">Cutting</h4>
                        </div> */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Cutting(S)</label>
                                <NormalInput placeholder="Enter Cutting(S)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Cutting(M)</label>
                                <NormalInput placeholder="Enter Cutting(M)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Cutting(L)</label>
                                <NormalInput placeholder="Enter Cutting(L)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput placeholder="Total Quantity" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Meters Used</label>
                                <NormalInput placeholder="Total Meters Used" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {/* <div className="col-12">
                            <h4 className="content-title">Cutting</h4>
                        </div> */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Stitching(S)</label>
                                <NormalInput placeholder="Enter Stitching(S)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Stitching(M)</label>
                                <NormalInput placeholder="Enter Stitching(M)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Stitching(L)</label>
                                <NormalInput placeholder="Enter Stitching(L)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput placeholder="Total Quantity" />
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        {/* <div className="col-12">
                            <h4 className="content-title">Cutting</h4>
                        </div> */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Ironing(S)</label>
                                <NormalInput placeholder="Enter Ironing(S)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Ironing(M)</label>
                                <NormalInput placeholder="Enter Ironing(M)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Ironing(L)</label>
                                <NormalInput placeholder="Enter Ironing(L)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput placeholder="Total Quantity" />
                            </div>
                        </div>
                    </div>

                   
                    <hr />
                    <div className="row">
                        {/* <div className="col-12">
                            <h4 className="content-title">Cutting</h4>
                        </div> */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Packing(S)</label>
                                <NormalInput placeholder="Enter Ironing(S)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Packing(M)</label>
                                <NormalInput placeholder="Enter Packing(M)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Packing(L)</label>
                                <NormalInput placeholder="Enter Packing(L)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput placeholder="Total Quantity" />
                            </div>
                        </div>
                    </div>
                   

                    <hr/>
                    <div className="row">
                        {/* <div className="col-12">
                            <h4 className="content-title">Cutting</h4>
                        </div> */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Shipment(S)</label>
                                <NormalInput placeholder="Enter Shipment(S)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Shipment(M)</label>
                                <NormalInput placeholder="Enter Shipment(M)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Shipment(L)</label>
                                <NormalInput placeholder="Enter Shipment(L)" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput placeholder="Total Quantity" />
                            </div>
                        </div>
                    </div>

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
