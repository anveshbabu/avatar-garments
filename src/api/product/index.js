import { collection, addDoc, updateDoc, query, doc, where, getDocs, deleteDoc, Timestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../service/utilities'
import { Toast } from '../../service/toast';
import moment from 'moment';

export const createProduct = (body) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { fName, lName } } = jwtDecodeDetails();
                body.createdBy.name = fName + " " + lName;
                body.createdBy.userId = user_id;
                body.inhouseDate = Timestamp.fromDate(new Date(body.inhouseDate));
                console.log(JSON.stringify(body))
                const docRef = await addDoc(collection(getFirestore(), "product"), body);
                console.log("Document written with ID: ", JSON.stringify(docRef));
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

export const updateProduct = (body, id) => {

    return new Promise(async (resolve, reject) => {
        delete body.id;
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { fName, lName } } = jwtDecodeDetails();
                body.updatedBy.userId = user_id;
                body.updatedBy.date = new Date().toISOString();
                body.updatedBy.name = fName + " " + lName;
                body.inhouseDate = Timestamp.fromDate(new Date(body.inhouseDate));
                console.log(JSON.stringify(body))
                const docRef = await updateDoc(doc(getFirestore(), "product", id), body);
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



export const getAllProducts = (status, supplierId) => {
    console.log('getAllProducts calling')
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                // const querySnapshot = await getDocs(collection(getFirestore(), "product"));
                const querySnapshot = await getDocs(query(collection(getFirestore(), "product"), where("status", "==", status), where("supplierId", "==", supplierId)));
                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push({ ...doc.data(), id: doc.id });


                });
                resolve(data)
            } else {

            }

        } catch (e) {
            console.error("Error adding document: ", e);
            Toast({ type: 'danger', message: 'Internal Server Error prod', title: 'Error' })
            reject(e)

        }
    })
}

export const getAllDateRangeProducts = (dateRange) => {
    console.log('getAllDateRangeProducts calling')
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                let dateRangeStart = where("inhouseDate", ">=", Timestamp.fromDate(new Date(dateRange.start.toDate())));
                let dateRangeEnd = where("inhouseDate", "<=", Timestamp.fromDate(new Date(dateRange.end.toDate())));
                const querySnapshot = await getDocs(query(collection(getFirestore(), "product"), dateRangeStart, dateRangeEnd));
                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push({ ...doc.data(), id: doc.id });


                });
                resolve(data)
            } else {

            }

        } catch (e) {
            console.error("Error adding document: ", e);
            Toast({ type: 'danger', message: 'Internal Server Error prod', title: 'Error' })
            reject(e)

        }
    })
}

export const deleteProducts = (prodId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                // const querySnapshot = await getDocs(collection(getFirestore(), "product"));
                const dataRef = await deleteDoc(doc(getFirestore(), "product", prodId))

                resolve(dataRef)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}




