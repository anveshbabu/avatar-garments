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
import React from "react";
import { AbIf } from "../../../common";
import Pagination from "react-js-pagination";
export class NormalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationactive: 1
    };
  }
   // handlePagenation = data => {
  //   let tbodyList = {
  //     tbodyList: data
  //   };
  //   this.props.tableChange(data);
  // };
  componentDidMount() {
    // this.splitArray();
    // if (this.props.pagination) {
    //   this.setState({
    //     paginationData: this.handleSplitArray(
    //       this.props.tbodyList,
    //       this.props.paginationLength
    //     )
    //   });
    //   this.handlePagenation(
    //     this.handleSplitArray(
    //       this.props.tbodyList,
    //       this.props.paginationLength
    //     )[0]
    //   );
    // }
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ paginationactive: pageNumber });
    this.props.paginationChange(pageNumber)
  }
  render() {
    let {
      pagination = false,
      className = "",
      theadList = "",
      children,
      paginationConfig
    } = this.props;
    let { paginationactive } = this.state;
    return (
      <>
        <table className={`table ${className}`}>
          <thead>
            <tr>
              {theadList.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
        <AbIf show={pagination}>
          {" "}
          {/* <Pagination
            length={paginationLength}
            change={e => this.handlePagenation(e)}
            data={paginationData}
          /> */}
          <Pagination
            activePage={paginationactive}
            itemsCountPerPage={!!paginationConfig?paginationConfig.pageCount:0}
            totalItemsCount={!!paginationConfig?paginationConfig.TotalCount:0}
            pageRangeDisplayed={!!paginationConfig?paginationConfig.btnDisplay:0}
            itemclassName="page-item"
            linkclassName="page-link"
            innerclassName=" custom-pagination pagination"
            nextPageText="Next"
            // nextPageText="Next"
            prevPageText="Previous"
            hideFirstLastPages={true}
            onChange={this.handlePageChange.bind(this)}
          />
        </AbIf>
      </>
    );
  }
}
