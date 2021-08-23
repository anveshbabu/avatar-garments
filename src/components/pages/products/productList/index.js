import React from "react";
import { NormalInput } from '../../../common'
import './productList.scss'
import { Link } from "react-router-dom";
import { ProductEdit } from '../productEdit'
export class ProductList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isProductFormModal: false
        }
    }


    render() {
        let { isProductFormModal } = this.state;
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
                <div className="row mb-2">
                    <div className="col-md-6">
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Pending </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Completed</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-4">
                            <div className="card product-card">
                                {/* <img src="..." className="card-img-top" alt="..." /> */}
                                <div className="card-body">
                                   
                                    <h5 className="card-title">Raman & co   <small className="text-muted float-end d-flex">001</small></h5>
                                  
                                    <span className="text-danger float-end">wastage: 20M</span>
                                    <span className="text-total">wastage: 20M</span>
                                    {/* <hr> */}
                                    {/* <div className="">
                                    <h4 className="f5">wastage: <span className="text-danger">20M</span> </h4>

                                </div> */}
                                    <table className="table mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Small</th>
                                                <th scope="col">Medium</th>
                                                <th scope="col">Large</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>Cutting</strong></td>
                                                <td>2</td>
                                                <td>4</td>
                                                <td>3</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Stitching</strong></td>
                                                <td>2</td>
                                                <td>4</td>
                                                <td>3</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Ironing</strong></td>
                                                <td>2</td>
                                                <td>4</td>
                                                <td>3</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Packing</strong></td>
                                                <td>2</td>
                                                <td>4</td>
                                                <td>3</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Shipment</strong></td>
                                                <td>2</td>
                                                <td>4</td>
                                                <td>3</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td><strong>In-house Date:</strong></td>
                                                <td  colspan="4">12th Aug, 2021</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Completed Date:</strong></td>
                                                <td  colspan="4"> 12th Aug, 2021</td>
                                            </tr>
                                        </tbody>
                                    </table>
                               <p className="updated-text mb-0">Updated By <strong>Muralidharan</strong> on <strong>25th Aug, 2021</strong></p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                                <div className="text-center card-footer">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <Link className="nav-link text-primary" onClick={() => this.setState({ isProductFormModal: !isProductFormModal })}>View </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-success" onClick={() => this.setState({ isProductFormModal: !isProductFormModal })}>Edit</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-danger" href="#">Delete</a>
                                    </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                </div>
                <ProductEdit isShow={isProductFormModal} toggle={() => this.setState({ isProductFormModal: !isProductFormModal })} />
            </>
        );
    }
}
