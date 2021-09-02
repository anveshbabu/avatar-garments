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
import React, { Component } from "react";
import  "./radio.scss";

export class NormalRadio extends Component {
  render() {
    let {
      className = "",
      label = "",
      name = "",
      onChange,
      checked = false,
      disabled = false,
      value=''
    } = this.props;

    return (
      <div className={`custom-control custom-radio custom-control-inline ${className}`}>
        <input type="radio"
          onChange={({ target: { name, checked: Checked, type: radio,value } }) => {

            onChange &&
              onChange({ target: { name, checked: Checked, type: radio,value } });
          }}
          checked={checked}
          name={name}
          disabled={disabled}
          value={value}
          id={label.trim()+name} className="custom-control-input" />
        <label className="custom-control-label" htmlFor={label.trim()+name}>{label}</label>
      </div>
    );
  }
}
