import React from "react";
import {ProductList} from '../../components/pages'
import {SUPPLIER_ROUT_NAME} from '../../service/constants'
export class Product extends React.Component {
  render() {
    return (
      <div>
        <h4 className="page-titel mb-4 ">
       {  !!localStorage.getItem(SUPPLIER_ROUT_NAME)?localStorage.getItem(SUPPLIER_ROUT_NAME):'-'}

        </h4>
      
      <ProductList {...this.props}/>
      </div>
    );
  }
}
