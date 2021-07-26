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
import "./stepper.scss";
export class Stepper extends React.Component {
  render() {
    let { steps, activeStep } = this.props;
    return (
      <div className="row stepper-custom mb-3">
        <div className="col-12">
          <ul className="create-progress-bar">
            {steps.map(({ title }, index) => {
              return (
                <li key={index} className={`${activeStep === index + 1 ? 'active' : ''} ${index + 1 < activeStep ? 'complited' : ''}`}>
                  <span className="step-inner-wrapper">
                    <span className="step-icon">✔</span>
                    <span className="step-title">{title}</span>
                    <label className="sub-text">STEP&nbsp;{index+1}</label>
                  </span>
                 
                </li>
              )
            })}

          </ul>

        </div>
      </div>
    );
  }
}