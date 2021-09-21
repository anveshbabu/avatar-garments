import React from "react";
import { Header } from "./header";
// import { EXIST_LOCAL_STORAGE } from "../../service/constants";
import { history } from "../../helpers";
export class MainLayout extends React.Component {


  componentWillMount() {
    // let authToken = localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN);
    // let userId = localStorage.getItem(EXIST_LOCAL_STORAGE.USER_ID);
    // console.log(userId )
    // console.log(authToken)
    // console.log('-----------',!(!!authToken && !!userId))
    // if (!(!!authToken && !!userId)) {
    //   console.log('no token')
    //   history.push("/auth/login")
    
    // }else{
    //   console.log('Yes token')
     
    // }

  }




  render() {
    return (
      <>
      
       
        <div className="d-flex" id="wrapper">
        {/* <Sidebar /> */}
     
        <Header />
          <div id="page-content-wrapper" className="w-100">
          
          <div className="container">
          <section>{this.props.children}</section>
          </div>
           
          </div>
        </div>
        {/* <Footer /> */}

      </>
    );
  }
}
