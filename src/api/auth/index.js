import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { EXIST_LOCAL_STORAGE } from '../../service/constants'
import {createUser} from '../user';

export const createAuthentication= (body) => {
    return new Promise((resolve, reject) => {
    let {email}=body;
    const auth = getAuth();
    
    createUserWithEmailAndPassword(auth, email, 'welcome@123')
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.uid)
            body.userId=user.uid;
            createUser(body).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
              
                // ..
            });
            // ...
        })
        .catch((error) => {
            reject(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    })
}



export const userSignin  = ({username,password}) => {
    return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password).then(({user:{accessToken}}) => {
            // Signed in 
            localStorage.setItem(EXIST_LOCAL_STORAGE.AUTHTOKEN, accessToken);
            resolve(accessToken)
            // ...
        }).catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error)
            // ..
        });
    })
}