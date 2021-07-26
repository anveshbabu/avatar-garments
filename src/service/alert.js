
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
import { alert } from '../redux/actionType';





export const showModal = ({ modalProps, modalType }) => dispatch => {
    dispatch({
      type: alert.SHOW_MODAL,
      modalProps,
      modalType
    })
  }
  
  export const hideModal = () => dispatch => {
    dispatch({
      type: alert.HIDE_MODAL
    })

}