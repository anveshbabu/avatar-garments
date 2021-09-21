import React from "react";
import { NormalInput, NormalButton, Dialog } from '../../../common'
import './productList.scss'
import { Link } from "react-router-dom";
import { ProductEdit } from '../productEdit'
import { getAllProducts, deleteProducts,getAllDateRangeProducts } from '../../../../api';
import moment from 'moment';
import { PRODUCT_STATUS, MODAL,SUPPLIER_ROUT_NAME } from '../../../../service/constants';
import DateRangePicker from 'react-bootstrap-daterangepicker';

export class ProductList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isProductFormModal: false,
            productList: [],
            productEditObj: {},
            tabActive: PRODUCT_STATUS.IN_PROGRESS,
            isLoder: false,
            searchName: '',
            productList: [],
            deleteProdIndex: -1,
            alertModel: {
                isShow: false,
                type: '',
                title: '',
                id: '',
                index: -1,
                okBtn: '',
                actionLoder: false
            },
            dateFilter: {
                start: moment(),
                end: moment()
            },
            pathname: ''
        }
    }

    componentDidMount() {
        let { location: { pathname } } = this.props;
        this.setState({ pathname: pathname.replaceAll('/', '') },()=> this.getAllProductList(PRODUCT_STATUS.IN_PROGRESS))
       
    }

    getAllProductList = (status) => {
        let { match: { params: { supplierId } } } = this.props;
        let { dateFilter,pathname } = this.state;
        this.setState({ isLoder: true });
     
        let apiCall =pathname !== 'allProduct'? getAllProducts(status, supplierId):getAllDateRangeProducts(dateFilter);
        apiCall.then((productList) => {
            console.log('pathname--------->',JSON.stringify(productList))
            this.setState({ isLoder: false, productList, searchList: productList, isNodata: productList.length === 0 });
        }).catch((error) => {
            this.setState({ isLoder: false });
            console.error(error)
        });
    }

    handleTogleEditModule = (data) => {
        let { isProductFormModal, tabActive } = this.state;
        this.setState({ isProductFormModal: !isProductFormModal, productEditObj: {} })
        if (data === 'success') {
            this.getAllProductList(tabActive)
        }

    }

    handleTabChange = (tabActive) => {
        this.setState({ tabActive });
        this.getAllProductList(tabActive);
    }

    handleSearch = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let { searchList } = this.state;
        const result = !!value ? searchList.filter(({ name, code }) => name.toLowerCase().includes(value.toLowerCase()) || code.toString().toLowerCase().includes(value.toLowerCase())) : searchList;
        this.setState({ productList: result, isNodata: result.length === 0, searchName: value });

    }


    //handleLogOut function call start
    handleDeleteModal = (i) => {
        let { alertModel } = this.state;
        alertModel.isShow = true;
        alertModel.type = MODAL.TYPE.WARNING;
        alertModel.okBtn = 'yes, Delete'
        alertModel.title = 'Are you sure you want to Delete this product';
        this.setState({ alertModel, deleteProdIndex: i });

    }

    //handleAlert 
    handleAlertModal = (value) => {
        let { alertModel, productList, deleteProdIndex } = this.state;
        if (value) {
            let prodObj = productList[deleteProdIndex];
            alertModel.actionLoder = true;
            this.setState({ alertModel });
            deleteProducts(prodObj.id).then((data) => {
                alertModel.isShow = false;
                alertModel.actionLoder = false;
                productList.splice(deleteProdIndex, 1);
                this.setState({ isFormLoder: false, alertModel, deleteProdIndex: -1, productList, isNodata: productList.length === 0 });
                // toggle('success')
            }).catch((error) => {
                this.setState({ isFormLoder: false });
                console.error(error)
            });


        } else {
            alertModel.isShow = false;
            this.setState({ isAlertModul: true,deleteProdIndex:-1 })
        }
    }


    handleInitialSettingsDateRange = () => {
        let { dateFilter: { start, end } } = this.state;
        return {
            startDate: start.toDate(),
            endDate: end.toDate(),
            ranges: {
                Today: [moment().toDate(), moment().toDate()],
                Yesterday: [
                    moment().subtract(1, 'days').toDate(),
                    moment().subtract(1, 'days').toDate(),
                ],
                'Last 7 Days': [
                    moment().subtract(6, 'days').toDate(),
                    moment().toDate(),
                ],
                'Last 30 Days': [
                    moment().subtract(29, 'days').toDate(),
                    moment().toDate(),
                ],
                'This Month': [
                    moment().startOf('month').toDate(),
                    moment().endOf('month').toDate(),
                ],
                'Last Month': [
                    moment().subtract(1, 'month').startOf('month').toDate(),
                    moment().subtract(1, 'month').endOf('month').toDate(),
                ],
            },
        }
    }
    handleDateCHange = (start, end, label) => {
        let dateFilter = {
            start,
            end
        }

        this.setState({ dateFilter }, () => this.getAllProductList(PRODUCT_STATUS.IN_PROGRESS))
    }
    componentWillUnmount(){
        localStorage.setItem(SUPPLIER_ROUT_NAME, '');
    }
    render() {
        let { match: { params: { supplierId } } } = this.props;
        let { isProductFormModal, isNodata, dateFilter, pathname, productList, productEditObj, tabActive, isLoder, searchName, alertModel } = this.state;
        const dateFilterLabel = dateFilter.start.format('DD,MM,YYYY') + ' - ' + dateFilter.end.format('DD,MM,YYYY');
        return (
            <>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="input-group search-input mb-3">
                            <span className="input-group-text bi bi-search"></span>
                            <NormalInput placeholder="Search by Product or code" onChange={this.handleSearch} value={searchName} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        {pathname === 'allProduct' ?
                            <DateRangePicker initialSettings={this.handleInitialSettingsDateRange()} onCallback={this.handleDateCHange}>
                                <div className="input-group search-input mb-3">
                                    <span className="input-group-text bi bi-calendar"></span>
                                    <NormalInput placeholder="Search by Product or code" value={dateFilterLabel} />
                                </div>
                            </DateRangePicker> : ''}
                        {/* <NormalButton label='Add New' className="btn-sm btn-primary" onClick={() => this.setState({ isProductFormModal: true })} /> */}
                    </div>
                    <div className="col-md-3 text-end">
                        {pathname !== 'allProduct' ?
                            <NormalButton label='Add New' className="btn-sm btn-primary" onClick={() => this.setState({ isProductFormModal: true })} /> : ""}

                    </div>
                </div>
                {pathname !== 'allProduct' ?
                <div className="row mb-2">
                    <div className="col-md-6">
                        <ul className="nav nav-pills product-pills">
                            <li className="nav-item" onClick={() => this.handleTabChange(PRODUCT_STATUS.IN_PROGRESS)}>
                                <a className={`nav-link ${tabActive === PRODUCT_STATUS.IN_PROGRESS ? 'active' : ''}`}>Pending </a>
                            </li>
                            <li className="nav-item" onClick={() => this.handleTabChange(PRODUCT_STATUS.COMPLETED)}>
                                <a className={`nav-link ${tabActive === PRODUCT_STATUS.COMPLETED ? 'active' : ''}`}>Completed</a>
                            </li>
                        </ul>
                    </div>
                </div>:""}
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
                            {!isNodata && productList.map(({ name, status,code = '', completedDate, totalLengthMeter, cutting, inhouseDate, stitching, ironing, packing, shipment, wastageM, id, updatedBy, createdBy }, i) =>
                                <div className="col-md-4 mb-4" key={id}>
                                    <div className="card product-card">
                                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                                        <div className="card-body">

                                            <h5 className="card-title">{name}   <small className="text-muted float-end d-flex">{code}</small></h5>

                                            <span className="text-danger float-end">wastage: {wastageM}M</span>
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
                                                        <td colspan="4">{moment(new Date(inhouseDate.seconds*1e3)).format("Do MMM, YYYY")}</td>
                                                    </tr>
                                                    {tabActive === PRODUCT_STATUS.COMPLETED ?
                                                        <tr>
                                                            <td><strong>Completed Date:</strong></td>
                                                            <td colspan="4">{moment(completedDate).format("Do MMM, YYYY")}</td>
                                                        </tr> : ""}
                                                        <tr>
                                                        <td><strong>Status:</strong></td>
                                                        <td colspan="4">{status}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p className="updated-text mb-0">Updated By <strong>{updatedBy.name}</strong> on <strong>{moment(!!updatedBy.data ? updatedBy.date : createdBy.date).format("Do MMM, YYYY")}</strong></p>
                                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                        </div>
                                        <div className="text-center card-footer">
                                            <ul className="nav">
                                                <li className="nav-item">
                                                    <Link className="nav-link text-primary" onClick={() => this.setState({ isProductFormModal: !isProductFormModal })}>View </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link text-success" onClick={() => this.setState({ isProductFormModal: !isProductFormModal, productEditObj: productList[i] })}>Edit</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link text-danger" onClick={() => this.handleDeleteModal(i)}>Delete</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>}
                    {isNodata ? <h4 className="text-center  mt-5">No data available</h4> : ''}
                </div>
                {isProductFormModal ?
                    <ProductEdit supplierId={supplierId} productEditObj={productEditObj} isShow={isProductFormModal} toggle={this.handleTogleEditModule} />
                    : ""}

                <Dialog show={alertModel.isShow} actionLoder={alertModel.actionLoder} sucessBtn={alertModel.okBtn} onToggle={this.handleAlertModal} type={alertModel.type} title={alertModel.title} />

            </>
        );
    }
}
