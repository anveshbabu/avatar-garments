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
import React, { Component } from 'react'

export class NormalTextarea extends Component {
    render() {
        let {
            className = "form-control",
            placeholder = "",
            onChange,
            value = "",
            rows="",
            name,
            disabled = false,
        } = this.props;
        console.log(this.props)
        return (
            <>
                <textarea
                    className={className}
                    name={name}
                    disabled={disabled}
                    value={value}
                    placeholder={placeholder}
                    rows={rows}
                    onChange={e => {

                        let body = {}

                        body = {
                            target: {
                                name: e.target.name,
                                value: e.target.value
                            }
                        }

                        onChange(body)

                    }}
                ></textarea>
            </>
        )
    }
}