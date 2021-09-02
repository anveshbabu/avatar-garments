import * as redux from 'redux';


//Actions
export const COUNTER_INCREMENT = 'counter/incrment';


export const COUNTER_DECREMENT = 'counter/decrement';


const initState = {
    count: 0
}



const supplierAdd = (state = initState, action) => {


    return { ...state, count: state.count + 1 }




}



const storeSupplierList=redux.createStore(supplierAdd);


export default storeSupplierList
