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
import "./appBack.scss";
import { history } from "../../../../helpers";
export class AppBack extends React.Component {
  handleAppBack = () => {
    history.goBack();
  };
  render() {
    let { label = "" } = this.props;
    return (
      <button
        type="button"
        className="btn app-back p-0 mb-2"
        onClick={this.handleAppBack}
      >
        <img src="/icon/back-arrow.svg" alt="..." /> {label}
      </button>
    );
  }
}
