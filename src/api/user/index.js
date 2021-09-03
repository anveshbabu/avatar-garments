import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, getDoc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../service/utilities';
import { STATUS } from '../../service/constants'
import { CURRENT_USER } from '../../service/constants'
import { Toast } from '../../service/toast';


export const createUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { fName, lName } } = jwtDecodeDetails();
                body.createdBy.name = fName + " " + lName;
                body.createdBy.userId = user_id;
                const docRef = await setDoc(doc(getFirestore(), "user", body.userId), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const updateUser = (body, id) => {

    return new Promise(async (resolve, reject) => {
        delete body.id;
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { fName, lName } } = jwtDecodeDetails();
                body.updatedBy.name = fName + " " + lName;
                body.updatedBy.date = new Date().toISOString();
                body.updatedBy.userId = user_id;
                const docRef = await updateDoc(doc(getFirestore(), "user", id), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            console.error("Error adding document: ", e);
            reject(e)

        }
    })
}

export const getAllUser = (body) => {
    const auth = getAuth();
    const user = auth.currentUser;
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

                const querySnapshot = await getDocs(query(collection(getFirestore(), "user"), where("status", "!=", STATUS.DELETED)));
                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push({ ...doc.data(), id: doc.id })
                });
                resolve(data)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}


export const getUserDetail = (body) => {
    const auth = getAuth();
    const user = auth.currentUser;
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

                const docSnap = await getDoc(doc(getFirestore(), "user", body));
                if (docSnap.exists()) {
                    localStorage.setItem(CURRENT_USER, JSON.stringify({...docSnap.data(),id:docSnap.id}));
                    resolve(docSnap.data())
                } else {
                    // doc.data() will be undefined in this case

                }


            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

