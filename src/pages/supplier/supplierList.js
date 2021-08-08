import React from "react";
import {SupplierList} from '../../components/pages'

export class Supplier extends React.Component {
  render() {
    return (
      <div>
        <h4 className="page-titel mb-4 ">
        Supplier
        </h4>
      
      <SupplierList/>
      </div>
    );
  }
}
