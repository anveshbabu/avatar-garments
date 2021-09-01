import React from "react";
import { NormalInput, NormalButton } from '../../../common'
import './supplierList.scss';
import { history } from '../../../../helpers';
import { isAuthenticated } from '../../../../service/utilities';
import { SupplierAdd } from '../supplierAdd';
import { getAllSupplier } from '../../../../api/supplier'

export class SupplierList extends React.Component {

    state = {
        isOpenAdd: false,
        isLoder: true,
        supplierList: [],
        isNodata: false,
        searchName:''


    }

    componentDidMount() {
        this.getAllSupplierList()
    };


    getAllSupplierList = () => {
        this.setState({ isLoder: true });
        getAllSupplier().then((supplierList) => {
            console.log('supplierList---->', supplierList.length)
            this.setState({ isLoder: false, supplierList, isNodata: supplierList.length === 0 });
        }).catch((error) => {
            this.setState({ isLoder: false });
            console.error(error)
        });
    }

    handleTogleEditModule = (data) => {
        this.setState({ isOpenAdd: false, supplierObj: {} })
        if (data === 'success') {
            this.getAllSupplierList()
        }

    }

    handleSearch=(event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let {supplierList}=this.state;
        console.log(value)
        if(!!value){
            const result = !!value?[...supplierList].filter(({name}) => name.toLowerCase().includes(value.toLowerCase())):supplierList;
            this.setState({supplierList:result, isNodata: result.length === 0,searchName:value });
        }else{
            this.setState({searchName:value });
            this.getAllSupplierList()
        }
      
    }

    render() {
        let { isOpenAdd, supplierList, supplierObj, isNodata,isLoder,searchName } = this.state;
        return (
            <>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="input-group search-input mb-3">
                            <span className="input-group-text bi bi-search"></span>
                            <NormalInput  onChange={this.handleSearch} value={searchName}  />
                        </div>
                    </div>
                    <div className="col-md-6 text-end">
                        <NormalButton label='Add New' className="btn-sm btn-primary" onClick={() => this.setState({ isOpenAdd: true })} />
                    </div>
                </div>
                <div className="row">
                    {isLoder?
                    <>
                     {[1,2,3,4,5,6].map((data, i) =>
                    <div className="col-md-4 mb-4 ">
                        <div className="card product-card loder-card">
                            {/* <img src="..." className="card-img-top" alt="..." /> */}
                            <div className="card-body">

                                <h5 className="card-title skeletonLoader">&nbsp;</h5>
                                <p className="text-muted title-sub skeletonLoader">&nbsp;</p>
  

                            </div>
                            <div className="text-center card-footer">
                                <button className="btn btn-sm skeletonLoader" type="button">&nbsp;</button>
                            </div>
                        </div>
                    </div>
                     )}
                     </>
                    :
                    <>
                    {!isNodata && supplierList.map(({ name, code = '', cutting, stitching, ironing, packing, shipment, wastageM, id }, i) =>
                        <div className="col-md-4 mb-4" key={id}>
                            <div className="card product-card">
                                {/* <img src="..." className="card-img-top" alt="..." /> */}
                                <div className="card-body">

                                    <h5 className="card-title"><label>{name}</label> <i className="bi bi-pencil-fill text-primary edit-icon" onClick={() => this.setState({ isOpenAdd: true, supplierObj: supplierList[i] })} /></h5>
                                    <small className="text-muted">{code}</small>
                                    <span className="text-danger float-end">wastage:{wastageM}M</span>
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

                                        </tbody>
                                    </table>

                                </div>
                                <div className="text-center card-footer">
                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => history.push('/supplier/product/' + id)}>Manage Supplier</button>
                                </div>
                            </div>
                        </div>
                    )}</>}
                    {isNodata ? <h4 className="text-center  mt-5">No data available</h4> : ''}
                </div>
                {isOpenAdd ?
                    <SupplierAdd isShow={isOpenAdd} supplierObjForm={supplierObj} toggle={this.handleTogleEditModule} /> : ''}
            </>
        );
    }
}
