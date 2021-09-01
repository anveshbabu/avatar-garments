import React from "react";
import { NormalInput,NormalButton } from '../../../common'
import './productList.scss'
import { Link } from "react-router-dom";
import { ProductEdit } from '../productEdit'
import { getAllProducts } from '../../../../api';
import moment from 'moment';
export class ProductList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isProductFormModal: false,
            productList: [],
            productEditObj:{}
        }
    }

    componentDidMount() {
        this.getAllProductList();
    }

    getAllProductList = () => {
        this.setState({ isFormLoder: true });
        getAllProducts().then((productList) => {
            this.setState({ isFormLoder: false, productList, isNodata: productList.length === 0 });
        }).catch((error) => {
            this.setState({ isFormLoder: false });
            console.error(error)
        });
    }

    handleTogleEditModule=(data)=>{
        let { isProductFormModal } = this.state;
        this.setState({ isProductFormModal: !isProductFormModal,productEditObj:{} })
        if(data==='success'){
            this.getAllProductList()
        }
    
    }


    render() {
        let { match: { params: { supplierId } } } = this.props;
        let { isProductFormModal,isNodata , productList,productEditObj } = this.state;
        return (
            <>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="input-group search-input mb-3">
                            <span className="input-group-text bi bi-search"></span>
                            <NormalInput />
                        </div>
                    </div>
                    <div className="col-md-6 text-end">
                        <NormalButton label='Add New' className="btn-sm btn-primary" onClick={() => this.setState({ isProductFormModal: true })} />
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
                {!isNodata && productList.map(({ name, code = '',completedDate, totalLengthMeter,cutting,inhouseDate, stitching, ironing, packing,shipment, wastage, id ,updatedBy}, i) =>
                    <div className="col-md-4 mb-4">
                        <div className="card product-card">
                            {/* <img src="..." className="card-img-top" alt="..." /> */}
                            <div className="card-body">

                                <h5 className="card-title">R{name}   <small className="text-muted float-end d-flex">{code}</small></h5>

                                <span className="text-danger float-end">wastage: {wastage}M</span>
                                <span className="text-total">Total: {totalLengthMeter}M</span>
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
                                                <td>{cutting.small}</td>
                                                <td>{cutting.medium}</td>
                                                <td>{cutting.large}</td>
                                                <td>{cutting.small + cutting.medium + cutting.large}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Stitching</strong></td>
                                                <td>{stitching.small}</td>
                                                <td>{stitching.medium}</td>
                                                <td>{stitching.large}</td>
                                                <td>{stitching.small + stitching.medium + stitching.large}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Ironing</strong></td>
                                                <td>{ironing.small}</td>
                                                <td>{ironing.medium}</td>
                                                <td>{ironing.large}</td>
                                                <td>{ironing.small + ironing.medium + ironing.large}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Packing</strong></td>
                                                <td>{packing.small}</td>
                                                <td>{packing.medium}</td>
                                                <td>{packing.large}</td>
                                                <td>{packing.small + packing.medium + packing.large}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Shipment</strong></td>
                                                <td>{shipment.small}</td>
                                                <td>{shipment.medium}</td>
                                                <td>{shipment.large}</td>
                                                <td>{shipment.small + shipment.medium + shipment.large}</td>
                                            </tr>
                                        <tr>
                                            <td><strong>In-house Date:</strong></td>
                                            <td colspan="4">{moment(inhouseDate).format("Do MMM, YYYY")}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Completed Date:</strong></td>
                                            <td colspan="4">{moment(completedDate).format("Do MMM, YYYY")}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="updated-text mb-0">Updated By <strong>{updatedBy.name}</strong> on <strong>{moment(updatedBy.date).format("Do MMM, YYYY")}</strong></p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                            <div className="text-center card-footer">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <Link className="nav-link text-primary" onClick={() => this.setState({ isProductFormModal: !isProductFormModal })}>View </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-success" onClick={() => this.setState({ isProductFormModal: !isProductFormModal,productEditObj:productList[i] })}>Edit</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-danger" href="#">Delete</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                      )}
                      {isNodata?<h4 className="text-center  mt-5">No data available</h4>:''}
                </div>
                {isProductFormModal ?
                    <ProductEdit supplierId={supplierId} productEditObj={productEditObj} isShow={isProductFormModal}  toggle={this.handleTogleEditModule} />
                    : ""}
            </>
        );
    }
}
