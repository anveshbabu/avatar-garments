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
import Select, { components } from "react-select";
import './select.scss'
import { AbIf } from "../..";
// import Creatable from "react-select/creatable";
import { AsyncPaginate } from 'react-select-async-paginate';

export class NormalSelect extends Component {
  // handleInputChange = (inputValue, actionMeta) => {
  //   console.group("Input Changed");
  //   console.log(inputValue.label);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };

  //change select
  handleChange = newValue => {
    let { isMulti } = this.props;
    console.log('newValue-----', newValue)
    if (!!isMulti) {
      let body = {
        target: {
          name: this.props.name,
          value: []
        }
      }
      if (!!newValue && newValue.length) {
        newValue.forEach((array, index) => {
          let obj = {
            value: array.value,
            label: array.label
          }
          body.target.value.push(obj)
          // body.target.value.push(array.value)
          // body.target.label.push(array.label)
        });
      }
      if (this.props.onChange)
        this.props.onChange(body);
    } else {
      let body = {
        target: {
          name: this.props.name,
          value: newValue ? newValue.value : '',
          label: newValue ? newValue.label : '',
        }
      }
      if (this.props.onChange)
        this.props.onChange(body);
    }

  };
  render() {
    const customStyles = {
      control: base => ({
        ...base,
        height: 10,
        minHeight: 10,
      })
    };
    let {
      className = "",
      options = [
        { label: "hello", value: 0 },
        { label: "test", value: 1 }
      ],
      // onChange,
      name = "",
      // placeholder = "Select",
      // isPlaceholderNeed = true,
      disabled = false,
      defaultValue = options[0],
      placeholder = '',
      isRtl = false,
      isClearable = false,
      isLoading = false,
      isSearchable = false,
      isMulti = false,
      async = false,
      value = '',
      debounceTimeout = 3000,

      cacheUniq = ''
    } = this.props;
    const DropdownIndicator = props => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            {/* <FontAwesomeIcon icon={props.selectProps.menuIsOpen ? "caret-up" : "caret-down"}/> */}
            <span className="material-icons black-50">{props.selectProps.menuIsOpen ? "arrow_drop_up" : "arrow_drop_down"}</span>
          </components.DropdownIndicator>
        )
      );
    };

    // const MenuList = wrapMenuList(this.props.MenuList)
    return (

      <>

        <AbIf show={!async}>
          <Select
            // components={isMulti ? { Option } : ''}
            className={className}
            classNamePrefix="Select"
            // defaultValue={placeholder == '' ? defaultValue : ''}
            isDisabled={disabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name={name}
            options={options}
            onChange={this.handleChange}
            isMulti={isMulti}
            placeholder={placeholder}
            styles={customStyles}
            value={!!options && options.length > 0 ? options.find(data => data.value === value) ? options.find(data => data.value === value) : null : null}
            components={{ DropdownIndicator }}
          // components={{ DropdownIndicator,MenuList }}
          // ref={r => {
          //   selectRef = r;
          // }}
          />
        </AbIf>

        <AbIf show={async}>
          <AsyncPaginate
            debounceTimeout={debounceTimeout}
            className={className}
            isDisabled={disabled}
            isClearable={isClearable}
            isSearchable={isSearchable}
            classNamePrefix="Select"
            defaultValue={placeholder === '' ? defaultValue : ''}
            placeholder={placeholder}
            cacheUniq={cacheUniq}
            onMenuClose={this.onMenuClose}
            isMulti={isMulti}
            value={value}
            loadOptions={options}
            components={{ DropdownIndicator }}
            onChange={this.handleChange}

          />
        </AbIf>

      </>
    );
  }
  onMenuClose = () => {
    console.log('gff')
  }
}
