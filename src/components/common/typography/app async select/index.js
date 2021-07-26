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
import { NormalSelect } from '../../../common'
// import { arrayMax } from "highcharts";


export class AppAsyncSelect extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isApiCall: true,
            query: {
                page: 1,
                limit: 10,
                search: "",
                sortBy: "",
                surveyCategoryId: "",
                stateId: null,
                countryId: null
            },
            reqTempList: [],
            selectList: [],
            selectedGroupIds: []

        }
    }

    getSelectList = async (...args) => {
        console.log(this.state.isApiCall)
        return new Promise((resolve, reject) => {
            let { isApiCall, query, reqTempList, selectList } = this.state;
            let { type } = this.props;
            let apiCall = isApiCall;
            if (!!args[0]) {
                query.search !== args[0] ? apiCall = true : apiCall = false
                query.search = args[0];
                query.page = 1;
                selectList = []
            } else {
                query.search = '';
            }
            if (apiCall) {

                let apiType = this.typeAPi(type, query);

                apiType.then((data) => {
                    console.log(data)
                    let list = data.data;
                    console.log(list, "asdasd")
                    reqTempList = [];
                    console.log('isApiCall', apiCall)
                    let listData = list.rows ? list.rows : list.options;
                    console.log(listData.length, "length", selectList, reqTempList)
                    listData.length && listData.forEach((array, index) => {
                        console.log(array, "AAAAAAAAAAAAAAAQQQQQQQQ", type)
                        let options = this.addOptions(type, array)
                        console.log('array---------', options)
                        selectList.push(options);
                        reqTempList.push(options);
                    });
                    query.page++;
                    (list.count ? (list.count !== selectList.length ? apiCall = true : apiCall = false) : apiCall = false)
                    this.setState({ selectList, reqTempList, isApiCall: apiCall, query })
                    let opp = {
                        options: reqTempList,
                        hasMore: isApiCall,
                    };
                    console.log(opp, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                    resolve(opp)
                }).catch((error) => {
                    let opp = {
                        options: [],
                        hasMore: false,
                    };
                    reject(opp)

                });
                // selectList = this.getUniqueListBy(selectList, 'value')
                console.log('isApiCall ----', apiCall)
                // return {
                //     options: reqTempList,
                //     hasMore: isApiCall,
                // };
            } else {
                console.log('no APi call')
                let opp = {
                    options: [],
                    hasMore: isApiCall,
                };
                resolve(opp)
            }
        })

    }

    getUniqueListBy = (arr, key) => {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    typeAPi = (type, query) => {
        let { categoryId, questionId, serviceId, countryId, stateId } = this.props;
        query.countryId = type === 'states' ? countryId : '';
        query.stateId = type === 'cities' ? stateId : '';
        console.log(query.stateId, '-------- query.stateId')
        let api;
        switch (type) {
            case 'group':
                api = []
                break;
            
            default:
                api = ""

        }
        return api;
    }

    addOptions = (type, array) => {

        console.log(array, type)

        console.log(array)

        let options;
        switch (type) {
            case 'group':
                options = { label: array.name, value: array.groupId };
                break;
            case 'category':
                options = { label: array.name, value: array.surveyCategoryId };
                break;
            case 'question':
                options = { label: array.title, value: array.questionId };
                break;
            case 'QuestionOption':
                options = { label: array.option, value: array.id };
                break;
            case 'states':
                options = { label: array.name, value: array.stateId };
                break;
            case 'country':
                options = { label: array.name, value: array.countryId };
                break;
            case 'cities':
                options = { label: array.name, value: array.cityId };
                break;
            case 'roles':
                options = { label: array.name, value: array.roleId };
                break;
            default:
                options = ""

        }
        console.log(options, "options")

        return options;

    }


    handleInputChange = (event) => {

        let { isMulti = false, onChange, name } = this.props;
        console.log(event, name)

        const target = event.target;
        const value = isMulti ? target.value : target;
        this.setState({ selectedIds: value });
        let body = {
            target: {
                name: name ? name : '',
                type: 'select',
                value: [],
                label: ''
            }
        }
        if (!!onChange) {
            if (isMulti && value.length > 0) {
                console.log(value)
                value.forEach((array, index) => {
                    let obj = {

                        value: array.value,
                        label: array.label
                    }
                    body.target.value.push(obj)
                });
            } else {
                body.target.value = value.value
                body.target.label = value.label
            }

        }



        onChange(body);
    }


    componentDidUpdate(prevProps) {
        let { query, isApiCall } = this.state;
        let { setValue, type } = this.props;
        console.log(prevProps.cacheUniq, this.props.cacheUniq, "cacheUniq")
        if (prevProps.cacheUniq !== this.props.cacheUniq) {

            console.log(type, prevProps.cacheUniq, this.props.cacheUniq, isApiCall)
            query.page = 1;
            this.setState({ isApiCall: true, selectedIds: [], query, selectList: [], reqTempList: [] })
        }
        if (prevProps.setValue !== this.props.setValue) {
            console.log(setValue)
            this.setState({ selectedIds: setValue })
        }
    }



    render() {

        let { selectedIds } = this.state;
        let { isMulti = false, placeholder = 'Select', cacheUniq = '', name, disabled = false, defaultValue = '', className = '', isClearable = false } = this.props;

        return (

            <NormalSelect
                async={true}
                disabled={disabled}
                className={`${className}  ${!!isMulti ? 'multi-select' : ''}`}
                cacheUniq={cacheUniq}
                isSearchable={true}
                debounceTimeout={300}
                name={name}
                isMulti={isMulti}
                isClearable={isClearable}
                placeholder={placeholder}
                options={this.getSelectList}
                value={!!selectedIds ? selectedIds : defaultValue}
                onChange={this.handleInputChange}
            />

        );
    }
}
