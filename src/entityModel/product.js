

export const productObj = {

    name: '',
    code:'',
    totalM:0,
    wastageM:0,
    inhouseDate:'',
    amount:0,
    totalLengthMeter:'',
    supplierId:'',
    completedDate:"",
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
    status:'',
    createdBy:{
        userId:'',
        date:new Date().toISOString(),
        name:''
    },
    updatedBy:{
        userId:'',
        date:'',
        name:''
    }

}