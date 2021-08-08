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
          <div className="spinner-border spinner-border-sm text-light ms-1" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          ""
        )}
      </button>
    );
  }
}
