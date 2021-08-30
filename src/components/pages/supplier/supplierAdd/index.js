import React from "react";
import { NormalInput, NormalButton } from '../../../common'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { supplierObj } from '../../../../entityModel/supplier';
import './supplierAdd.scss';
import { createSupplier } from '../../../../api/supplier';
import SimpleReactValidator from 'simple-react-validator';
export class SupplierAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            supplierObj,
            isFormLoder: false,
        }
        this.validator = new SimpleReactValidator({
            className: 'text-danger'
        });
    }



    handleInputChange = (event) => {
        let { supplierObj } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            supplierObj: {
                ...supplierObj,
                [name]: value
            }
        })
    }

    handleFormSubmit = () => {
        let { supplierObj } = this.state;
        let { toggle } = this.props;
        supplierObj.code = Math.floor(Math.random() * 1000000);
        this.setState({ isFormLoder: true });
        if (this.validator.allValid()) {
            createSupplier(supplierObj).then((data) => {
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
        let { isShow = false, toggle = '', isFormLoder } = this.props;
        let { supplierObj } = this.state;
        return (


            <Modal isOpen={isShow} toggle={toggle} className='edit-modal'>
                {/* <ModalHeader  ></ModalHeader> */}
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Supplier</h5>
                    <button type="button" className="btn-close" onClick={toggle} aria-label="Close"></button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Supplier Name</label>
                                <NormalInput placeholder="Enter Supplier Name" name="name" onChange={this.handleInputChange} value={supplierObj.name} />
                                {this.validator.message('Supplier Name', supplierObj.name, 'required')}
                            </div>
                        </div>
                    </div>



                </ModalBody>
                <ModalFooter>
                    <NormalButton label="Save" loader={isFormLoder} onClick={this.handleFormSubmit} />
                    <NormalButton label="Cancel" className="btn-danger" disabled={isFormLoder} onClick={toggle} />
                </ModalFooter>
            </Modal>


        );
    }
}
