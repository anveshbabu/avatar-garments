import { STATUS } from '../service/constants'

export const userObj = {

    fName:'',
    lName:'',
    empCode: '',
    email:'',
    phone:'',   
    designation:'',
    userType:'',
    userId:'',
    status: STATUS.ACTIVE,
    createdBy: {
        userId: '',
        date: new Date()
    },
    updatedBy: {
        userId: '',
        date: ''
    }

}