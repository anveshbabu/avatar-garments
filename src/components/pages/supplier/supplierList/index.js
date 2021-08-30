import React from "react";
import { NormalInput, NormalButton } from '../../../common'
import './supplierList.scss';
import { history } from '../../../../helpers';
import { isAuthenticated } from '../../../../service/utilities';
import { SupplierAdd } from '../supplierAdd';
import {getAllSupplier} from '../../../../api/supplier'

export class SupplierList extends React.Component {

    state = {
        isOpenAdd: false,
        isFormLoder:true,
        supplierList:[]


    }

    componentDidMount(){
      this.getAllSupplierList()
    };


    getAllSupplierList=()=>{
        this.setState({ isFormLoder: true });
        getAllSupplier().then((supplierList) => {
            console.log('supplierList--------->',supplierList)
            this.setState({ isFormLoder: false,supplierList });
        }).catch((error) => {
            this.setState({ isFormLoder: false });
            console.error(error)
        });
    }

    render() {
        let { isOpenAdd,supplierList} = this.state;
        console.log('isAuthenticated--------->', isAuthenticated())
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
                        <NormalButton label='Add New' className="btn-sm btn-primary" onClick={() => this.setState({ isOpenAdd: true })} />
                    </div>
                </div>
                <div className="row">
                    {supplierList.map(({name,code='',cutting,stitching,ironing,packing,wastage,id}, i) =>
                        <div className="col-md-4 mb-4" key={id}>
                            <div className="card product-card">
                                {/* <img src="..." className="card-img-top" alt="..." /> */}
                                <div className="card-body">

                                    <h5 className="card-title">{name}</h5>
                                    <small className="text-muted">{code}</small>
                                    <span className="text-danger float-end">{code}</span>
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
                                                <td>{cutting.small+cutting.medium+cutting.large}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Stitching</strong></td>
                                                <td>{stitching.small}</td>
                                                <td>{stitching.medium}</td>
                                                <td>{stitching.large}</td>
                                                <td>{stitching.small+stitching.medium+stitching.large}</td>
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

                                        </tbody>
                                    </table>

                                </div>
                                <div className="text-center card-footer">
                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => history.push('/supplier/product')}>Manage Supplier</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <SupplierAdd isShow={isOpenAdd} toggle={() => this.setState({ isOpenAdd: false })} />
            </>
        );
    }
}
