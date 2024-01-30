import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import { MobilePDFReader } from 'react-read-pdf';
import { getStorage, ref, getBlob} from "firebase/storage";
import Footer from '../Footer.js';


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

  const docRef = collection(db, "document");

const DocumentDisplay = () =>{
    const [fileData, setData] = useState("");
    const location = useLocation();
    const pageName = location.state.pagename;
    const page = query(docRef, where("name", "==", pageName));
    useEffect(()=>{
        async function getDocumentInfo(){
            const querySnapshot = await getDocs(page);
            async function getStorageInfo(x){
                const storage = getStorage();
                // const url = 'gs://youngster-p.appspot.com/'+ doc
                const fileURL = await getBlob(ref(storage, x));
                setData(URL.createObjectURL(fileURL));
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                getStorageInfo(doc.get('link'));
            });
        }
        getDocumentInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if(!fileData){
        return(
            <div>Loading</div>
        )
    }
    return(

        <div style={{overflow:'scroll',  height: 300}}>
            <MobilePDFReader url={fileData} page={1}/>
            <Footer/>
           </div>
        
        

    )
}
export default DocumentDisplay;