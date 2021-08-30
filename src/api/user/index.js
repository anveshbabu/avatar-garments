import { collection, addDoc, updateDoc, query, doc, where, getDocs } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../service/utilities';
import { STATUS } from '../../service/constants'




export const createUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated) {
                let { user_id } = jwtDecodeDetails();
                body.createdBy.userId = user_id;
                const docRef = await addDoc(collection(getFirestore(), "user"), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const updateUser = (body, id) => {
  
    return new Promise(async (resolve, reject) => {
        delete body.id;
        try {
            if (isAuthenticated) {
                let { user_id } = jwtDecodeDetails();
                body.updatedBy.userId = user_id;
                const docRef = await updateDoc(doc(getFirestore(), "user", id), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            console.error("Error adding document: ", e);
            reject(e)

        }
    })
}

export const getAllUser = (body) => {
    console.log(body)
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('user------------>',user)
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated) {
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
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

