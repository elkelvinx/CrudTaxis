export const environment = {
  production: false,
  firebaseConfig: {
  apiKey: "AIzaSyC2uRXe_fZdUzNpcwyqhbNjz-gngSbjwqA",
  authDomain: "taxisimages.firebaseapp.com",
  projectId: "taxisimages",
  storageBucket: "taxisimages.firebasestorage.app",
  messagingSenderId: "734716401955",
  appId: "1:734716401955:web:a210b06cdca5e00c635496"
  }
};
  export const rolesNames = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' }
  ];
  export const DMLs: string[]= [
    "INSERT",
    "UPDATE",
    "DELETE",   
    "EXECUTING ERROR",
    "CLOSED CONNECTION",
  ];
  //extructura de DML
  export class DMLBase {
    constructor(
      public id: number,
      public name: string,

    ){}
  }
  //DML NAME WITH NAMES
  export const DML: DMLBase[] = [
    new DMLBase(1, "INSERT"),
    new DMLBase(2, "UPDATE"),
    new DMLBase(3, "DELETE"),
    new DMLBase(69, "CLOSED CONNECTION"),
    new DMLBase(999, "EXECUTING ERROR")
  ];

  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2uRXe_fZdUzNpcwyqhbNjz-gngSbjwqA",
  authDomain: "taxisimages.firebaseapp.com",
  projectId: "taxisimages",
  storageBucket: "taxisimages.appspot.com",
  messagingSenderId: "734716401955",
  appId: "1:734716401955:web:a210b06cdca5e00c635496"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);