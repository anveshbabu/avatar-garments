import React from "react";
import SimpleReactValidator from 'simple-react-validator';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NormalInput, NormalSelect, NormalButton, NormalCheckbox } from '../../../common'
import { passwordUpdate } from '../../../../api'
export class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            passWordObj: {
                new: '',
                reEnter: ''
            },
            isErr: false,
            isFormLoder: false
        }
        this.validator = new SimpleReactValidator({
            className: 'text-danger'
        });
    }

    handleInputChange = (event) => {
        let { passWordObj } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            passWordObj: {
                ...passWordObj,
                [name]: value
            }
        })
    }

    handleFormSubmit = () => {
        let { passWordObj } = this.state;
        let {toggle = '' } = this.props;
        if (passWordObj.new === passWordObj.reEnter) {
            this.setState({ isErr: false,isFormLoder:true });
            passwordUpdate(passWordObj.new).then((data) => {
                this.setState({ isFormLoder: false });
                toggle('success')
            }).catch((error) => {
                this.setState({ isFormLoder: false });
                console.error(error)
            });
        } else {
            this.setState({ isErr: true })
        }
    }
    render() {
        let { isShow = false, toggle = '' } = this.props;
        let { passWordObj, isFormLoder, isErr } = this.state;
        return (
            <Modal isOpen={isShow} toggle={toggle} >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">New password</h5>
                    <button type="button" className="btn-close" onClick={isFormLoder?toggle:''} aria-label="Close"></button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">confirmation Password</label>
                                <NormalInput name="new" onChange={this.handleInputChange} value={passWordObj.new} placeholder="Enter New Password" />
                                {/* {this.validator.message('New', userObj.status, 'required')} */}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Retype New Password</label>
                                <NormalInput name="reEnter" onChange={this.handleInputChange} value={passWordObj.reEnter} placeholder="Retype New Password" />
                                {/* {this.validator.message('New', userObj.status, 'required')} */}
                            </div>
                        </div>
                    </div>
                    {isErr ?
                        <small className="text-danger">New password and confirmation password do not match.</small> : ""}
                </ModalBody>
                <ModalFooter>
                    <NormalButton loader={isFormLoder} label={"Update"} onClick={this.handleFormSubmit} />
                    <NormalButton label="Cancel" className="btn-danger" disabled={isFormLoder} onClick={toggle} />
                </ModalFooter>
            </Modal>
        );
    }
}
