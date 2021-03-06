import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCdBRMxUtPnLCpiN21vT3VpLpj9sq1p4wo",
//   authDomain: "ecommerce-react-dcb3f.firebaseapp.com",
//   databaseURL: "https://ecommerce-react-dcb3f.firebaseio.com",
//   projectId: "ecommerce-react-dcb3f",
//   storageBucket: "",
//   messagingSenderId: "544383671376",
//   appId: "1:544383671376:web:8d1d15a4128abee9"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB9jTD5Y7L3dljUZ-Wq2AGlu0du9BvWmD4",
  authDomain: "fashion-rental-bfd7d.firebaseapp.com",
  databaseURL: "https://fashion-rental-bfd7d.firebaseio.com",
  projectId: "fashion-rental-bfd7d",
  storageBucket: "fashion-rental-bfd7d.appspot.com",
  messagingSenderId: "380815532244",
  appId: "1:380815532244:web:9a77e69d6fcdc4ce9a5b41",
  measurementId: "G-M02311SWW4"
};

firebase.initializeApp(firebaseConfig);
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  } else {
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;

      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.error("error creating user", error.message);
      }
    }
    return userRef;
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(object => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collection => {
  //   console.log(collection);
  const transformedCollection = collection.docs.map(doc => {
    const { title, items } = doc.data();
    // var x;
    // for (x of items) {
    //   if (x.id === 51) {
    //     x.price = 500;
    //   }
    // }
    // firestore
    //   .collection("collections")
    //   .doc(doc.id)
    //   .update({
    //     items: items
    //   });
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Always show google email accounts popup
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default signInWithGoogle;
