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

import { axiosInstance } from "./utilities";



import { setapiProgressBar, apiProgressBar } from './helperFunctions';

import { EXIST_LOCAL_STORAGE } from './constants'

import { CONFIG } from "./constants";



export var api = async function ({ method = "get", api, id, body, status = false, token = '', baseURL = "normal", email = "" }) {

	
	let config = {
		onUploadProgress: progressEvent => {
			let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

			setapiProgressBar(percentCompleted);
			console.log('percentCompleted---------------->' + apiProgressBar)
		}
	}

	console.log(api, id, body)

	return await new Promise((resolve, reject) => {
		// setting token
		axiosInstance.defaults.headers.common['Authorization'] = `${localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN) === null ? '' : localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN)}`
		
		axiosInstance[method](`${getMicroServiceURL(baseURL) + api + (!!id ? '/' + id : "")}`, (body ? body : ""), config).then((response) => {
		
			// console.log(JSON.stringify(statusHelper(status, response)))
			resolve(statusHelper(status, response))

		}).catch((error) => {

			try {

				if (error.response) {

					reject(statusHelper(status, error.response))

				} else {

					reject(error)

				}

			}

			catch (err) {
				// console.log(err)
				reject(err)

			}

		})



	})
}












var statusHelper = (status, data) => {

	if (status) {
		return {
			status: data.status,
			...data.data
		}
	} else {
		return data.data
	}
}




// local api base url
let getMicroServiceURL = (baseURL) => {

	switch (baseURL) {
		case 'normal':
			return CONFIG.API_URL;
		case 'graphql':
			return CONFIG.GRAPHQL_URL;
		case 'test':
			return 'https://jsonplaceholder.typicode.com';
		case 'map':
			return 'https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f';
		default:
			break;
	}

}



export const apiServiceURL = (baseURL = 'normal') => {

	return getMicroServiceURL(baseURL)

}