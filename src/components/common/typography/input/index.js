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

export class NormalInput extends Component {





  handleBlur = (e) => {
    let body = {};
    body = {
      target: {
        name: e.target.name,
        type: this.props.type,
        value: e.target.value
      }
    }
    if (this.props.onBlur) {
      this.props.onBlur(body);
    }
  }

  render() {
    let {
      className = "",
      placeholder = "",
      onChange = null,
      value = "",
      name,
      disabled = false,
      type = "text",
      readOnly = false,
      min = "",
      max = "",
      id=""

    } = this.props;

    return (
      <>

        <input
          className={`form-control  ${className}`}
          name={name}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          min={min}
          max={max}
          id={id}
          placeholder={placeholder}
          onBlur={this.handleBlur}
          onChange={e => {
            let body = {};

            body = {
              target: {
                name: e.target.name,
                type: type,
                value: e.target.value
              }
            };
            if (onChange)
              onChange(body);
          }}
        />
      </>
    );
  }
}

