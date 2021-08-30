import React from "react";
import {ProductList} from '../../components/pages'

export class Product extends React.Component {
  render() {
    return (
      <div>
        <h4 className="page-titel mb-4 ">
        Raman & co

        </h4>
      
      <ProductList {...this.props}/>
      </div>
    );
  }
}
