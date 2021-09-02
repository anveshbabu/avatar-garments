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
import "./style.scss";

export class Badge extends Component {
  render() {
    const { up, down, bgColor } = this.props;
    return (
      <span
        className={`badge p-2 mx-2 rounded-pill text-dark ${bgColor || "bg-white"}`}
      >
        <img
          src={`/icon/${up !== undefined ? "up-icon" : "down-icon"}.svg`}
          className="px-2"
          alt=""
          srcset=""
        />
        {up ?? down} %
      </span>
    );
  }
}
