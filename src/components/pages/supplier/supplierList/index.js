import React from "react";
import { NormalInput } from '../../../common'
import './supplierList.scss';
import {history} from '../../../../helpers'
export class SupplierList extends React.Component {
    render() {
        return (
            <>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="input-group search-input mb-3">
                            <span className="input-group-text bi bi-search"></span>
                            <NormalInput />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card product-card">
                            {/* <img src="..." className="card-img-top" alt="..." /> */}
                            <div className="card-body">
                            <span className="badge bg-danger float-end">wastage: 20M</span>
                                <h5 className="card-title">Raman & co</h5>
                                <small className="text-muted">001</small>
                                {/* <hr> */}
                                {/* <div className="">
                                    <h4 className="f5">wastage: <span className="text-danger">20M</span> </h4>

                                </div> */}
                                <table className="table mt-2">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Over</th>
                                            <th scope="col">Comp</th>
                                            <th scope="col">Bal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Cutting</strong></td>
                                            <td>18</td>
                                            <td>11</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Stitching</strong></td>
                                            <td>18</td>
                                            <td>11</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Ironing</strong></td>
                                            <td>18</td>
                                            <td>11</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Packing</strong></td>
                                            <td>18</td>
                                            <td>11</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Shipment</strong></td>
                                            <td>18</td>
                                            <td>11</td>
                                            <td>3</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                            <div className="text-center card-footer">
                                <button className="btn btn-primary btn-sm" type="button" onClick={()=>history.push('/supplier/product')}>Manage Supplier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
