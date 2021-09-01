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
import "./dropdown.scss";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { AbIf } from "../abIf";
import { NormalInput } from "../input";
export class NormalDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownId: Math.floor(100000 + Math.random() * 900000),
      isOpen: false,
      optionsList: [],
      searchValue: '',
      assignIds: []
    }

  }
  handleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };



  componentDidMount() {
    let { optionsList } = this.props;
    this.setState({ optionsList })
  }


  componentDidUpdate(prevProps, prevState) {
    let { optionsList, assignIds } = this.props;
    let { isOpen } = this.state;
    if (optionsList !== prevProps.optionsList) {
      this.setState({ optionsList })
    }

    if (isOpen !== prevState.isOpen && !isOpen) {
      this.setState({ optionsList, searchValue: '' })
    }

  }




  handleFilterInput = (event) => {
    const target = event.target;
    const value = target.value;
    let { optionsList } = this.props;
    const result = optionsList.filter(({ label }) => label == value);
    let filterValue = !!value ? result : optionsList;
    this.setState({ optionsList: filterValue, searchValue: value })

  }


  render() {
    const {
      className = "",
      label = "",
      labelIcon = "",
      onClick,
      removeAssignId,
      disabled = false,
      caret = true,
      direction = '',
      // id = ''
      isSearch = false,
      searchPlaceholder = '',
      assignIds = [],
      autoClose = false
    } = this.props;
    let { isOpen, optionsList, searchValue, } = this.state;
    return (


      <ButtonDropdown direction={direction} disabled={disabled} isOpen={isOpen} toggle={this.handleDropdown} className={isSearch ? 'normal-drop' : ''}>
        {/* <Button id="caret" >{label ? label : ''}  {isOpen ? <i className="fas fa-chevron-up ml-2"></i> : <i className="fas fa-chevron-down ml-2"></i>}</Button> */}
        <DropdownToggle disabled={disabled} color="" className={className} >


          {label ? label : <i className={labelIcon}></i>} <AbIf show={caret}>{isOpen ? <i className="fas fa-chevron-up ml-2"></i> : <i className="fas fa-chevron-down ml-2"></i>} </AbIf>
        </DropdownToggle>

        <DropdownMenu >
          {isSearch ? <DropdownItem header><NormalInput className="search-input" type="search" value={searchValue} placeholder={searchPlaceholder} onChange={this.handleFilterInput} /></DropdownItem> : ''}
          <div>
            {assignIds.length > 0 ? <DropdownItem header> <label className="text-dark">Assigned</label></DropdownItem> : ''}
            {optionsList.map(({ label, img, value }, i) =>
              <AbIf show={assignIds.includes(value)}>
                <DropdownItem header > {img ? <img src={img} alt="Girl in a jacket" className="mr-1 rounded-circle" width="24" height="25" /> : ''}
                  {label}
                  <i onClick={() => removeAssignId(value)} className="bi bi-x-lg float-right opacity-0 mt-1 cursor-pointer"></i>
                </DropdownItem>
              </AbIf>
            )}
          </div>

          {isSearch ? <DropdownItem divider /> : ''}
          {optionsList.map(({ label, icon, img, value }, i) =>

            <AbIf show={!assignIds.includes(value)}>
              <DropdownItem header={autoClose} onClick={e => {
                let body = {};
                body = {
                  target: {
                    value: label,
                    data: optionsList[i]
                  }
                }
                // this.handleDropdown(id)
                if (onClick)
                  onClick(body);
              }}>
                {img ? <img src={img} alt="Girl in a jacket" className="mr-1 rounded-circle" width="24" height="25" /> : ''}
                {icon ? <i className={`${icon} me-1`}></i> : ""}{" "} {label}</DropdownItem>
            </AbIf>

          )}
          {optionsList.length === 0 ? <DropdownItem className="text-center" disabled>No options</DropdownItem> : ''}


        </DropdownMenu>
      </ButtonDropdown  >


    );
  }
}
