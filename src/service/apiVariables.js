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

import { generateQuery } from './helperFunctions';
export const testApi = {
  get: {
    api: '/posts',
    method: 'get',
    baseURL: 'test',
  },
}



export const authentication = {

  userSignIn: {
    api: '/login',
    method: 'post',
    baseURL: 'normal',
  },
  forgotPassword: {
    api: '/user/forgot-password',
    method: 'put',
    baseURL: 'normal',
  },

}



export const notes = {

  create: {
    api: '/notes/addNotes',
    method: 'post',
    baseURL: 'normal',
  },
  update: {
    api: '/notes/update',
    method: 'post',
    baseURL: 'normal',
  },
  delete: {
    api: '/notes/delete',
    method: 'post',
    baseURL: 'normal',
  },

  get: {
    url: '/notes/getNotes',
    method: 'get',
    baseURL: 'normal',
    query: {
      managerId: null,
      status: null,
        
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, value }) {
      this.query[key] = value;
    },
  },
 

}

export const merchant = {

  get: {
    url: '/getmerchants',
    method: 'get',
    baseURL: "normal",
    query: {
      managerId: null,
     
    },
    get api() {
      return this.url + generateQuery(this.query);
    },
    set addQuery({ key, value }) {
      this.query[key] = value;
    },
}

}







export const mapApi = {
  get: {
    api: '/covid19.json',
    method: 'get',
    baseURL: 'map',
  },
}

