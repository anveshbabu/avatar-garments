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

export class NormalCheckbox extends Component {
  render() {
    let {
      className = "custom-control custom-checkbox ",
      label = " ",
      value = "",
      name = "",
      id = Math.floor(Math.random() * 1000000),
      onChange,
      checked = false,
      inputClass = "custom-control-input",
      disabled = false,

    } = this.props;
    // console.log(this.props)
    return (
    
        <div class={`custom-control custom-checkbox ${className}`}>
        <input
          disabled={disabled}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          id={id}
          className={inputClass}
          onChange={({ target: { name, checked: Checked, type: checked } }  ) => {
            // console.log('sdsxzxz')
            onChange &&
              onChange({ target: { name, checked: Checked, type: checked } });
          }}
        />
        {/* <span className="checkbox-tick border-radius-circle"></span> */}
        {label ? (
          <label
            htmlFor={id}
            className="custom-control-label label-txt fs-16 pl-1"
          >
            {label}
          </label>
        ) : (
          ""
        )}
      </div>
    );
  }
}
