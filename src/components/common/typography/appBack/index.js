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
       <i class="bi bi-arrow-left-short"></i> {label}
      </button>
    );
  }
}
