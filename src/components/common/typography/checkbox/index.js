
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
    return (
    
        <div className={`custom-control custom-checkbox ${className}`}>
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
            className="custom-control-label label-txt fs-16 ps-1"
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
