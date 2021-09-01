import {STATUS} from '../service/constants'

export const supplierObj = {

    name: '',
    code:'',
    status:STATUS.ACTIVE,
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