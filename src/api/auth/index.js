import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { EXIST_LOCAL_STORAGE } from '../../service/constants'
import { createUser, getUserDetail } from '../user';
import { Toast } from '../../service/toast';

export const createAuthentication = (body) => {
    return new Promise((resolve, reject) => {
        let { email } = body;
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, 'welcome@123')
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                body.userId = user.uid;
                createUser(body).then((data) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)

                    // ..
                });
                // ...
            })
            .catch((error) => {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
                reject(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    })
}



export const userSignin = ({ username, password }) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password).then(({ user: { accessToken, uid } }) => {
            // Signed in 
            localStorage.setItem(EXIST_LOCAL_STORAGE.AUTHTOKEN, accessToken);

            getUserDetail(uid)



            resolve(accessToken)
            // ...
        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                Toast({ type: 'danger', message: 'Sorry, your password is incorrect. Please try again', title: 'Error' })
                reject(errorCode)
            } else if (['auth/user-not-found', 'auth/invalid-email'].includes(errorCode)) {
                Toast({ type: 'danger', message: 'Sorry, your email is incorrect. Please try again', title: 'Error' })
                reject(errorCode)
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' });
                reject(error)
            }

            // ..
        });
    })
}