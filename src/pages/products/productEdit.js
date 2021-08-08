import React from "react";
import {NormalInput} from '../../components/common'

export class ProductEdit extends React.Component {
    render() {
        return (
            <div>
                <h4 className="page-titel mb-4 ">
                    Edit Product

                </h4>

                <div className="row">
                    <div className="col-md-12">
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <NormalInput/>
                            {/* <div id="emailHelp" class ="form-text">We'll never share your email with anyone else.</div> */}
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
