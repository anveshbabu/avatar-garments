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
import { NormalButton } from './normalButton'
export class ButtonGroup extends React.Component {
    render() {
        const {
            className = "",
            labels = [],
            onClick
        } = this.props;

        return (

            <div className="filter-btn" >
                {labels.map((name) =>
                    <NormalButton label={name} className={className ? className : '"btn-outline-primary btn-sm"'} onClick={() => {
                        onClick(name);
                    }} />

                )}

            </div>

        );
    }
}
