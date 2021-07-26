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
import './tabs.scss'

export class NormalTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1,

        }
    }
    handleChange = (index) => {
        this.setState({ active: index })
        if (!!this.props.onChange) {

            this.props.onChange(index)
        }
    }
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        let { active } = this.props;
        if (active) {
            this.setState({
                active: active
            })
        }
    }
    componentDidUpdate(prevProps) {
        console.log('prevProps-------', this.props)
        let { active } = this.props;
        if (prevProps.active !== active) {

            if (active) {
                this.setState({
                    active: active
                })
            }
        }
    }
    render() {
        let { tabList } = this.props;
        let { active } = this.state;
        return (

            <ul className="nav nav-tabs align-items-center ab-tabs">
                {tabList.map((data, index) => {
                    return (
                        <li className={`${active === index + 1 ? 'active' : ''}  nav-item`} onClick={() => this.handleChange(index + 1)}>
                            <a className={`${active === index + 1 ? 'active' : ''}  nav-link `} href="javascript:void(0)" >{data}</a>
                        </li>
                    )
                })}

            </ul>
        );
    }
}