import {STATUS} from '../service/constants'

export const supplierObj = {

    name: '',
    code:'',
    cutting: {
        small: 0,
        medium: 0,
        large: 0,
    },
    stitching: {
        small: 0,
        medium: 0,
        large: 0,
    },
    ironing: {
        small: 0,
        medium: 0,
        large: 0,
    },
    packing: {
        small: 0,
        medium: 0,
        large: 0,
    },
    shipment: {
        small: 0,
        medium: 0,
        large: 0,
    },
    wastage:0,
    status:STATUS.ACTIVE,
    createdBy:{
        userId:'',
        date:new Date()
    },
    updatedBy:{
        userId:'',
        date:''
    }

}