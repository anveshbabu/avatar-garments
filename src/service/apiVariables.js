
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

