/**
*
* Disclaimer: Source code mentioned below is(are) Intellectual Property of
* Crayon Data Holdings Limited (including its subsidiaries and affiliates).
* Crayon Data Holdings Limited reserves right to own and control it the way
* it may deem fit. You must refrain from use, access, read, modify, add or
* delete, sell or use in any other package or programme pertaining to such
* source code without explicit prior written approval of
* Crayon Data Holding Limited. Breach of the same shall attract penalty as
* applicable.
*
*/
import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { NormalButton, AbIf } from '../../index';
import './modal.scss';
import { MODAL } from "../../../../service/constants";

export class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.modal,
            modalImg: ''
        }
    }



    componentWillMount() {
        let { type } = this.props;
        if (type === MODAL.TYPE.SUCCESS) {
            this.setState({ modalImg: '/avatar-garments/images/alert/success.svg' })
        } else if (type === MODAL.TYPE.WARNING) {
            this.setState({ modalImg: '/avatar-garments/images/alert/warning.svg' })
        } else if (type === MODAL.TYPE.DANGER) {
            this.setState({ modalImg: '/avatar-garments/images/alert/danger.svg' })
        }
    }



    componentDidUpdate(prevProps) {
        let { type } = this.props;
        if (prevProps.type !== type) {
            if (type === MODAL.TYPE.SUCCESS) {
                this.setState({ modalImg: '/avatar-garments/images/alert/success.svg' })
            } else if (type === MODAL.TYPE.WARNING) {
                this.setState({ modalImg: '/avatar-garments/images/alert/warning.svg' })
            } else if (type === MODAL.TYPE.DANGER) {
                this.setState({ modalImg: '/avatar-garments/images/alert/danger.svg' })
            }


        }



    }


    render() {

        let { show, onToggle, type, title, sucessBtn = 'deactivate', cancleBtn = "cancel", btn = false, subText = '' } = this.props
        let { modalImg = "/avatar-garments/images/alert/warning.svg" } = this.state;
        return (
            <Modal isOpen={show} className={'modal-dialog-centered app-alert-modal'}>
                {/* <ModalHeader toggle={onToggle}>Modal title</ModalHeader> */}
                <ModalBody>
                    <div className="row justify-content-md-center">
                        <div className="col-md-12 text-center">
                            <img className="float-right cursor-pointer" onClick={() => onToggle(false)} src="/images/icons/close-modal.svg" alt="" />
                            <img className="modal-img" src={modalImg} alt="" />
                        </div>
                        <div className="col-md-10  text-center">
                            <h4>{title}</h4>
                            <p>{subText}</p>
                        </div>
                    </div>

                </ModalBody>
                <AbIf show={type === MODAL.TYPE.WARNING || btn}>
                    <ModalFooter className="text-center">
                        <NormalButton label={cancleBtn} className="btn-secondary alert-btn" onClick={() => onToggle(false)} />
                        <NormalButton label={sucessBtn} className="btn-primary alert-btn" onClick={() => onToggle(true)} />
                    </ModalFooter>
                </AbIf>
            </Modal>
        );
    }
}
