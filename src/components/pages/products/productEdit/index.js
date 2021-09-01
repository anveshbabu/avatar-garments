import React from "react";
import { NormalInput,NormalSelect,NormalButton } from '../../../common'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './productEdit.scss';
import { productObj } from '../../../../entityModel/product';
import SimpleReactValidator from 'simple-react-validator';
import { USER_TYPE, PRODUCT_STATUS, METER } from '../../../../service/constants';
import {createProduct,updateProduct} from '../../../../api/'
export class ProductEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isFormLoder: false,
            productObj
        }
        this.validator = new SimpleReactValidator({
            className: 'text-danger'
        });
    }
    componentDidMount() {
        let { productEditObj } = this.props;
        if (Object.keys(productEditObj).length > 0) {
            this.setState({ productObj: productEditObj })
        }
    }

    
    handleInputChange = (event) => {
        let { productObj } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name.split(".").length > 1 ? target.name.split(".") : target.name;
        console.log(value,name)

        if (!Array.isArray(name)) {
            this.setState({
                productObj: {
                    ...productObj,
                    [name]: value
                }
            }, () => console.log(productObj));

            
        } else {

            this.setState({
                productObj: {
                    ...productObj,
                    [name[0]]: {
                        ...productObj[name[0]],
                        [name[1]]: Number(value)
                    }
                }
            }, () => console.log(productObj))
        }

    }


    handleFormSubmit = () => {
        let { productObj } = this.state;
        let { toggle, supplierId } = this.props;
        this.setState({ isFormLoder: true });
        productObj.supplierId = supplierId;
        productObj.code =Math.floor(Math.random() * 1000000);
        productObj.completedDate =productObj.status === PRODUCT_STATUS.COMPLETED?new Date().toISOString():''

        productObj.wastageM = Number(productObj.totalLengthMeter) - ((Number(productObj.cutting.small) * METER.SMALL) + (Number(productObj.cutting.medium) * METER.MEDIUM) + (Number(productObj.cutting.large) * METER.LARGE));

        if (this.validator.allValid()) {
            let apiCall = productObj.hasOwnProperty('id') ? updateProduct(Object.assign({}, productObj), productObj.id) : createProduct(productObj)
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
        let { productObj,isFormLoder } = this.state
        let { isShow = false, toggle = '' } = this.props;
        let productStatusList=[{ label: 'In Progress', value: PRODUCT_STATUS.IN_PROGRESS }, { label: 'Completed', value: PRODUCT_STATUS.COMPLETED }]
        this.validator.purgeFields();
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
                                <NormalInput placeholder="Enter Product Name" name="name" onChange={this.handleInputChange} value={productObj.name} />
                                {this.validator.message('Product Name', productObj.name, 'required')}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">status</label>
                                <NormalSelect options={productStatusList} name="status" onChange={this.handleInputChange} value={productObj.status} placeholder="Seletct Status" />
                                {this.validator.message('status',productObj.status, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Inhouse Date</label>
                                <NormalInput type="date" placeholder="DD/MM/YYYY" name="inhouseDate" onChange={this.handleInputChange} value={productObj.inhouseDate} />
                                {this.validator.message('Inhouse Date', productObj.inhouseDate, 'required')}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Amount(INR)</label>
                                <NormalInput type="number" placeholder="Enter Amount(INR)" name="amount" onChange={this.handleInputChange} value={productObj.amount} />
                                {this.validator.message('Amount', productObj.amount, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Length in meters</label>
                                <NormalInput type="number" placeholder="Enter Total meters" name="totalLengthMeter" onChange={this.handleInputChange} value={productObj.totalLengthMeter} />
                                {this.validator.message('Total Length in meters', productObj.totalLengthMeter, 'required')}
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
                                <NormalInput type="number" placeholder="Enter Cutting(S)" name="cutting.small" onChange={this.handleInputChange} value={productObj.cutting.small} />
                                {this.validator.message('Cutting(S)', productObj.cutting.small, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Cutting(M)</label>
                                <NormalInput type="number" placeholder="Enter Cutting(M)" name="cutting.medium" onChange={this.handleInputChange} value={productObj.cutting.medium} />
                                {this.validator.message('Cutting(M)', productObj.cutting.medium, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Cutting(L)</label>
                                <NormalInput type="number" placeholder="Enter Cutting(L)" name="cutting.large" onChange={this.handleInputChange} value={productObj.cutting.large} />
                                {this.validator.message('Cutting(L)', productObj.cutting.large, 'required')}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput type="number" placeholder="Total Quantity" disabled={true} onChange={() => { }} value={(productObj.cutting.small) + (productObj.cutting.medium) + (productObj.cutting.large)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Meters Used</label>
                                <NormalInput type="number" placeholder="Total Meters Used" disabled={true} onChange={() => { }} value={(Number(productObj.cutting.small) * METER.SMALL) + (Number(productObj.cutting.medium) * METER.MEDIUM) + (Number(productObj.cutting.large) * METER.LARGE)} />
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
                                <NormalInput type="number" placeholder="Enter Stitching(S)" name="stitching.small" onChange={this.handleInputChange} value={productObj.stitching.small} />
                                {this.validator.message('Stitching(S)', productObj.stitching.small, `required|between:0,${productObj.cutting.small},num`, { messages: { between: 'The shipment(S) may not be greater than cutting(S).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Stitching(M)</label>
                                <NormalInput type="number" placeholder="Enter Stitching(M)" name="stitching.medium" onChange={this.handleInputChange} value={productObj.stitching.medium} />
                                {this.validator.message('Stitching(M)', productObj.stitching.medium, `required|between:0,${productObj.cutting.medium},num`,`required|between:0,${productObj.cutting.medium}`, { messages: { between: 'The shipment(M) may not be greater than cutting(M).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Stitching(L)</label>
                                <NormalInput type="number" placeholder="Enter Stitching(L)" name="stitching.large" onChange={this.handleInputChange} value={productObj.stitching.large} />
                                {this.validator.message('Stitching(L)', productObj.stitching.large, `required|between:0,${productObj.cutting.large},num`, { messages: { between: 'The shipment(L) may not be greater than cutting(L).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput type="number" placeholder="Total Quantity" disabled={true} onChange={() => { }} value={Number(productObj.stitching.small) + Number(productObj.stitching.medium) + Number(productObj.stitching.large)} />
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
                                <NormalInput type="number" placeholder="Enter Ironing(S)" name="ironing.small" onChange={this.handleInputChange} value={productObj.ironing.small} />
                                {this.validator.message('Ironing(S)', productObj.ironing.small, `required|between:0,${productObj.cutting.small},num`, { messages: { between: 'The shipment(S) may not be greater than cutting(S).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Ironing(M)</label>
                                <NormalInput type="number" placeholder="Enter Ironing(M)" name="ironing.medium" onChange={this.handleInputChange} value={productObj.ironing.medium} />
                                {this.validator.message('Ironing(M)', productObj.ironing.medium, `required|between:0,${productObj.cutting.medium},num`, { messages: { between: 'The shipment(M) may not be greater than cutting(M).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Ironing(L)</label>
                                <NormalInput type="number" placeholder="Enter Ironing(L)" name="ironing.large" onChange={this.handleInputChange} value={productObj.ironing.large} />
                                {this.validator.message('Ironing(L)', productObj.ironing.large, `required|between:0,${productObj.cutting.large},num`, { messages: { between: 'The shipment(L) may not be greater than cutting(L).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput type="number" placeholder="Total Quantity" disabled={true} onChange={() => { }} value={Number(productObj.ironing.small) + Number(productObj.ironing.medium) + Number(productObj.ironing.large)} />
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
                                <NormalInput type="number" placeholder="Enter Packing(S)" name="packing.small" onChange={this.handleInputChange} value={productObj.packing.small} />
                                {this.validator.message('Packing(S)', productObj.packing.small, `required|between:0,${productObj.cutting.small},num`, { messages: { between: 'The shipment(S) may not be greater than cutting(S).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Packing(M)</label>
                                <NormalInput type="number" placeholder="Enter Packing(M)" name="packing.medium" onChange={this.handleInputChange} value={productObj.packing.medium} />
                                {this.validator.message('Packing(M)', productObj.packing.medium, `required|between:0,${productObj.cutting.medium},num`, { messages: { between: 'The shipment(M) may not be greater than cutting(M).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Packing(L)</label>
                                <NormalInput type="number" placeholder="Enter Packing(L)" name="packing.large" onChange={this.handleInputChange} value={productObj.packing.large} />
                                {this.validator.message('Packing(L)', productObj.packing.large, `required|between:0,${productObj.cutting.large},num`, { messages: { between: 'The shipment(L) may not be greater than cutting(L).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput type="number" placeholder="Total Quantity" disabled={true} onChange={() => { }} value={Number(productObj.packing.small) + Number(productObj.packing.medium) + Number(productObj.packing.large)} />
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
                                <label className="form-label">Shipment(S)</label>
                                <NormalInput type="number" placeholder="Enter Shipment(S)" name="shipment.small" onChange={this.handleInputChange} value={productObj.shipment.small} />
                                {this.validator.message('Shipment(S)', productObj.shipment.small,`required|between:0,${productObj.cutting.small},num`, { messages: { between: 'The shipment(S) may not be greater than cutting(S).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Shipment(M)</label>
                                <NormalInput type="number" placeholder="Enter Shipment(M)" name="shipment.medium" onChange={this.handleInputChange} value={productObj.shipment.medium} />
                                {this.validator.message('Shipment(M)', productObj.shipment.medium, `required|between:0,${productObj.cutting.medium},num`, { messages: { between: 'The shipment(M) may not be greater than cutting(M).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Shipment(L)</label>
                                <NormalInput type="number" placeholder="Enter Shipment(L)" name="shipment.large" onChange={this.handleInputChange} value={productObj.shipment.large} />
                                {this.validator.message('Shipment(L)', productObj.shipment.large, `required|between:0,${productObj.cutting.large},num`, { messages: { between: 'The shipment(L) may not be greater than cutting(L).' } })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Total Quantity</label>
                                <NormalInput type="number" placeholder="Total Quantity" disabled={true} onChange={() => { }} value={Number(productObj.shipment.small) + Number(productObj.shipment.medium) + Number(productObj.shipment.large)} />
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
                <NormalButton label={productObj.hasOwnProperty('id') ?"Update":"Save"} loader={isFormLoder} onClick={this.handleFormSubmit} />
                    <NormalButton label="Cancel" className="btn-danger" disabled={isFormLoder} onClick={toggle} />
                </ModalFooter>
            </Modal>


        );
    }
}
