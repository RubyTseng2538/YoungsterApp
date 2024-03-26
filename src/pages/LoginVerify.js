import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc, query, where} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwCZ_ulcO61Ic0aQlNjnhR8oR9jaVzxTk",
  authDomain: "youngster-p.firebaseapp.com",
  projectId: "youngster-p",
  storageBucket: "youngster-p.appspot.com",
  messagingSenderId: "254927360049",
  appId: "1:254927360049:web:25c1be08ea17eaaea34510",
  measurementId: "G-VVEG3FZSCG"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function LoginVerify(userData){
  let userID;
  let userEmail;
  let docID;
  let admin = false;
  let q = query(collection(db, "user"), where("UID", "==", userData.id));
  let querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    userID = doc.get("UID");
    userEmail = doc.get("email");
    docID = doc.id;
  });
  if(userID){
    admin = true;
    return admin;
  }else{
    q = query(collection(db, "user"), where("email", "==", userData.email));
    querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userID = doc.get("UID");
      userEmail = doc.get("email");
      docID = doc.id;
    });
      if(userEmail){
      await updateDoc(doc(db, "user", docID), { UID: userData.id });
      admin = true;
      return admin;
    }
  }
  return admin;
}
 
export default LoginVerify;
