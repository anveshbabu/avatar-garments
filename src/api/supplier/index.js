import { collection, addDoc, updateDoc, query, doc, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../service/utilities'




export const createSupplier = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated) {
                let { user_id,userObj:{fName,lName} } = jwtDecodeDetails();
                body.createdBy.name = fName+" "+lName;
                body.createdBy.userId = user_id;
                const docRef = await addDoc(collection(getFirestore(), "supplier"), body);
                console.log("Document written with ID: ", JSON.stringify(docRef));
                resolve(docRef)
            } else {

            }

        } catch (e) {
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}


export const updateSupplier = (body, id) => {
  
    return new Promise(async (resolve, reject) => {
        delete body.id;
        try {
            if (isAuthenticated) {
                let { user_id,userObj:{fName,lName} } = jwtDecodeDetails();
                body.updatedBy.userId = user_id;
                body.updatedBy.date = new Date().toISOString();
                body.updatedBy.name = fName+" "+lName;
                const docRef = await updateDoc(doc(getFirestore(), "supplier", id), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            console.error("Error adding document: ", e);
            reject(e)

        }
    })
}

export const getAllSupplier = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated) {
                const querySnapshot = await getDocs(collection(getFirestore(), "supplier"));
                let data=[]
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  data.push({...doc.data(),id:doc.id})
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

