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

export class NormalButton extends React.Component {
  render() {
    const {
      className = "",
      label = "",
      onClick,
      id,
      disabled = false,

      rightIcon = "",
      leftIcon = "",
      title = "",
      loader = false,
    } = this.props;

    return (
      <button
        id={id}
        className={`btn ${className === "" ? "btn-primary" : className}`}
        onClick={onClick}
        disabled={disabled || loader}
        title={title}
      >
        {leftIcon !== "" ? (
          <span className={`btn-right-icon material-icons mr-1`}>
            {leftIcon}
          </span>
        ) : (
          ""
        )}
        {label}
        {rightIcon !== "" ? (
          <span className={`btn-right-icon material-icons ml-1`}>
            {rightIcon}
          </span>
        ) : (
          ""
        )}

        {loader ? (
          <div className="spinner-border spinner-border-sm text-light ml-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
      </button>
    );
  }
}
