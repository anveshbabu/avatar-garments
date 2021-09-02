import { collection, addDoc, updateDoc, query, doc, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../service/utilities'
import { Toast } from '../../service/toast';


export const createSupplier = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { fName, lName } } = jwtDecodeDetails();
                body.createdBy.name = fName + " " + lName;
                body.createdBy.userId = user_id;
                const docRef = await addDoc(collection(getFirestore(), "supplier"), body);
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
            if (isAuthenticated()) {
                let { user_id, userObj: { fName, lName } } = jwtDecodeDetails();
                body.updatedBy.userId = user_id;
                body.updatedBy.date = new Date().toISOString();
                body.updatedBy.name = fName + " " + lName;
                const docRef = await updateDoc(doc(getFirestore(), "supplier", id), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            console.error("Error adding document: ", e);
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)

        }
    })
}

export const getAllSupplier = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                const querySnapshot = await getDocs(collection(getFirestore(), "supplier"));
                let data = [];
                let cont = 0
                if (querySnapshot.size !== 0) {
                    await querySnapshot.forEach((doc, index) => {
                      
                        getAllProductsAggregation(doc.id ).then((countObj) => {
                            cont++
                            data.push({ ...doc.data(), ...countObj, id: doc.id });
                            if (cont === querySnapshot.size) {
                                resolve(data)
                            }
                        }).catch((error) => {
                            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
                            console.error(error);

                        });

                    });
                } else {
                    resolve(data)
                }

            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e);
        }
    })
}





export const getAllProductsAggregation = (supplierId) => {
    return new Promise(async (resolve, reject) => {

        try {
            const querySnapshot = await getDocs(query(collection(getFirestore(), "product"), where("supplierId", "==", supplierId)));
            let data = {
                cutting: {
                    small: 0,
                    medium: 0,
                    large: 0,
                },
                stitching: {
                    small: 0,
                    medium: 0,
                    large: 0,
                },
                ironing: {
                    small: 0,
                    medium: 0,
                    large: 0,
                },
                packing: {
                    small: 0,
                    medium: 0,
                    large: 0,
                },
                shipment: {
                    small: 0,
                    medium: 0,
                    large: 0,
                },
                wastageM: 0
            }
            if (querySnapshot.size !== 0) {
                querySnapshot.forEach((doc) => {
                    data.cutting.small = data.cutting.small + doc.data().cutting.small;
                    data.cutting.medium = data.cutting.medium + doc.data().cutting.medium;
                    data.cutting.large = data.cutting.large + doc.data().cutting.large;

                    data.stitching.small = data.stitching.small + doc.data().stitching.small;
                    data.stitching.medium = data.stitching.medium + doc.data().stitching.medium;
                    data.stitching.large = data.stitching.large + doc.data().stitching.large;

                    data.ironing.small = data.ironing.small + doc.data().ironing.small;
                    data.ironing.medium = data.ironing.medium + doc.data().ironing.medium;
                    data.ironing.large = data.ironing.large + doc.data().ironing.large;

                    data.packing.small = data.packing.small + doc.data().packing.small;
                    data.packing.medium = data.packing.medium + doc.data().packing.medium;
                    data.packing.large = data.packing.large + doc.data().packing.large;

                    data.shipment.small = data.shipment.small + doc.data().shipment.small;
                    data.shipment.medium = data.shipment.medium + doc.data().shipment.medium;
                    data.shipment.large = data.shipment.large + doc.data().shipment.large;
                    data.wastageM = data.wastageM + doc.data().wastageM;

                });
                resolve(data)
            } else {
                resolve(data)
            }


        } catch (e) {
            reject(e)
            // This will be a "population is too big" error.
            console.error(e);
        }
    })
}
