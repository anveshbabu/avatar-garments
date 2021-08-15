import React, { Component } from "react";
import {Route,HashRouter as Router,  } from "react-router-dom";
import { } from "react-router-dom";
import routers from "./routes";

import * as Layout from "../layouts";
import * as Pages from "../pages";
import {history} from "../helpers";

// class NoMatch extends React.Component {
//   render() {
//     return (
//       <div>
//         Hello 404
//       </div>
//     );
//   }
// }

class Routes extends Component {

// Authentication "before" filter
  requireAuth=(nextState, replace)=>{
    console.log("called"); // => Is not triggered at all 
    // if (!isLoggedIn()) {
    //   replace({
    //     pathname: '/front'
    //   })
    // }
  }
  render() {

    return (
      <Router  history={history}>
        {routers.map(
        ({
          component,
          redirect,
          path,
          exact = false,
          auth = true,
          childrens = []
        }) => {

          if(childrens.length > 0){
           
            return (
              <Route
                path={path}
                exact={exact}
                key={path}
                onEnter={this.requireAuth}
                render={props => {
                  if (redirect) {
                    if (props.location.pathname === path) {
                      props.history.push(redirect);
                    }
                  }

                  const LayoutComponent = Layout[component];

                  return (
                    <LayoutComponent {...props}>
                      {childrens.map(
                        ({
                          component: ChildrenComponent,
                          path: childrenPath,
                          exact = false,
                          auth = true
                        }) => {
                         
                          return (
                            <Route
                              path={path + childrenPath}
                              exact={exact}
                              key={path + childrenPath}
                              onEnter={this.requireAuth}
                              render={props => {
                                let PageComponent = Pages[ChildrenComponent];

                                return <PageComponent {...props} />;
                              }}
                            />
                          );
                        }
                      )}
                    </LayoutComponent>
                  );
                }}
              />
            );
          }else{
            return (
              <Route
              path={path}
              exact={exact}
              key={path}
              onEnter={this.requireAuth}
              render={props => {
                if (redirect) {
                  if (props.location.pathname === path) {
                    props.history.push(redirect);
                  }
                }else{

                  let PageComponent = Pages[component];
  
                  return <PageComponent {...props} />;
                }
  
               
              }}
            />
            )
          }
            
               
        })}

{/* <Route component={NoMatch} /> */}
      </Router>
      
        // <Switch >         
        // </Switch>
    );
  }
}

export default Routes;
