import React from "react";
import { NormalInput, NormalButton, Dialog } from '../../../common'
import './supplierList.scss';
import { history } from '../../../../helpers';
import { SUPPLIER_ROUT_NAME, MODAL } from '../../../../service/constants';
import { SupplierAdd } from '../supplierAdd';
import { getAllSupplier, deleteSupplier } from '../../../../api/supplier';

export class SupplierList extends React.Component {

    state = {
        isOpenAdd: false,
        isLoder: true,
        supplierList: [],
        isNodata: false,
        searchName: '',
        searchList: [],
        alertModel: {
            isShow: false,
            type: '',
            title: '',
            id: '',
            index: -1,
            okBtn: '',
            actionLoder: false
        },
        deleteSupplierIndex: -1,
        alertCount:0


    }

    componentDidMount() {
        localStorage.setItem(SUPPLIER_ROUT_NAME, '');
        this.getAllSupplierList()
    };


    getAllSupplierList = () => {
        this.setState({ isLoder: true });
        getAllSupplier().then((supplierList) => {
            this.setState({ isLoder: false, supplierList, searchList: supplierList, isNodata: supplierList.length === 0 });
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

    handleSearch = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let { searchList } = this.state;
        const result = !!value ? searchList.filter(({ name, code }) => name.toLowerCase().includes(value.toLowerCase()) || code.toString().toLowerCase().includes(value.toLowerCase())) : searchList;
        this.setState({ supplierList: result, isNodata: result.length === 0, searchName: value });

    }

    handleRouteOfProduct = (id, name) => {
        localStorage.setItem(SUPPLIER_ROUT_NAME, name);
        history.push('/supplier/product/' + id);
    }

    handleOpenDeleteModal = (i) => {
        let { alertModel } = this.state;
        alertModel.isShow = true;
        alertModel.type = MODAL.TYPE.WARNING;
        alertModel.okBtn = 'yes, Delete'
        alertModel.title = 'Are you sure you want to Delete this supplier';
        // alertModel.actionLoder = true;
        this.setState({ alertModel, deleteSupplierIndex: i ,alertCount:1});
    }

    handleAlertModal = (value) => {
        let { supplierList,alertModel,alertCount,deleteSupplierIndex } = this.state;
        let { id} = supplierList[deleteSupplierIndex];
        if(value){
        if(alertCount ==1){
            alertModel.isShow = false;
           
            this.setState({alertModel},()=>{
                alertModel.isShow = true;
                alertModel.title = 'If delete supplier under all products also delete';
                this.setState({alertModel,alertCount:0})
            })
        }else{
            alertModel.actionLoder = true;
            this.setState({alertModel})
            deleteSupplier(id).then((data) => {
                alertModel.isShow = false;
                alertModel.actionLoder = false;
                supplierList.splice(deleteSupplierIndex, 1); 
                this.setState({ deleteSupplierIndex: -1 ,supplierList,alertCount:0,alertModel,isNodata:supplierList.length===0})
            }).catch((error) => {
                alertModel.isShow = false;
                alertModel.actionLoder = false;
                this.setState({ deleteSupplierIndex: -1,alertCount:0,alertModel });
                console.error(error)
            });
        }
    }else{
        alertModel.isShow = false;
        alertModel.actionLoder = false;
        this.setState({ deleteSupplierIndex: -1 ,alertCount:0,alertModel})
    }
       

    }

    render() {
        let { isOpenAdd, supplierList, supplierObj, isNodata, isLoder, searchName, alertModel } = this.state;
        return (
            <>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="input-group search-input mb-3">
                            <span className="input-group-text bi bi-search"></span>
                            <NormalInput placeholder="Search by Supplier or code" onChange={this.handleSearch} value={searchName} />
                        </div>
                    </div>
                    <div className="col-md-6 text-end">
                        <NormalButton label='Add New' className="btn-sm btn-primary" onClick={() => this.setState({ isOpenAdd: true })} />
                    </div>
                </div>
                <div className="row">
                    {isLoder ?
                        <>
                            {[1, 2, 3, 4, 5, 6].map((data, i) =>
                                <div className="col-md-4 mb-4 " key={i}>
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
                                // <div className="col-md-4 mb-4" key={id} onClick={()=>deleteSupplier(id)}>
                                <div className="col-md-4 mb-4" key={id}>
                                    <div className="card product-card">
                                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                                        <div className="card-body">

                                            <h5 className="card-title supplier-title"><label>{name}</label>
                                                <i className="bi bi-pencil-fill text-primary edit-icon" onClick={() => this.setState({ isOpenAdd: true, supplierObj: supplierList[i] })} />
                                                <i className="bi bi-trash-fill text-danger edit-icon ms-1" onClick={() => this.handleOpenDeleteModal(i)} />
                                            </h5>
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
                                            <button className="btn btn-primary btn-sm" type="button" onClick={() => this.handleRouteOfProduct(id, name)}>Manage Supplier</button>
                                        </div>
                                    </div>
                                </div>
                            )}</>}
                    {isNodata ? <h4 className="text-center  mt-5">No data available</h4> : ''}
                </div>
                {isOpenAdd ?
                    <SupplierAdd isShow={isOpenAdd} supplierObjForm={supplierObj} toggle={this.handleTogleEditModule} /> : ''}
                <Dialog show={alertModel.isShow} actionLoder={alertModel.actionLoder} sucessBtn={alertModel.okBtn} onToggle={this.handleAlertModal} type={alertModel.type} title={alertModel.title} />
            </>
        );
    }
}
