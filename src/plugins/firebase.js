/* eslint-disable no-unused-vars */
// import universalify from "universalify";
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { doc, getFirestore, onSnapshot, query } from "firebase/firestore";

import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  update,
} from "firebase/database";
import * as firebase from "firebase/database";

import * as auth from "firebase/auth";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// import * as dbs from "firebase/database";
import Vue from "vue";
import store from "../store";
// const analytics = getAnalytics(app);

const firebaseConfig = {
  apiKey: "AIzaSyBvS9E4bNrh4KkFjchNN3TTZSoB-1d2Vfs",
  authDomain: "vue-mem.firebaseapp.com",
  databaseURL: "https://vue-mem-default-rtdb.firebaseio.com",
  projectId: "vue-mem",
  storageBucket: "vue-mem.appspot.com",
  messagingSenderId: "339809496413",
  appId: "1:339809496413:web:53594a555d6fe874758cb4",
  measurementId: "G-BY5BW86WPW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const db = getDatabase();

async function writeObj(root, data) {
  const _ref = ref(db, root);

  try {
    // set(_ref, data).then((res) => {
    //   console.log("res: ", res);
    // });
    const re = await set(_ref, data);
  } finally {
    33;
  }
}

// const dbRef = ref(db);

async function readObj(root) {
  const snapshot = await get(child(ref(db), root)).catch((err) => {
    console.error(err);
    throw "erro@@";
  });

  return snapshot?.exists() ? snapshot.val() : "";
}

function myfn(domain) {
  return new Promise((res, rej) => {
    onValue(ref(db, domain), (sn) => {
      res(sn);
    });
  });
}

function myfn2(domain, cb, erCb) {
  onValue(
    ref(db, domain),
    (sn) => {
      cb(sn);
    },
    erCb
  );
}

async function readObjRsp(domain, cb, erCb) {
  myfn2(domain, cb, erCb);
  // myfn(domain)
  //   .then((sn) => {
  //     debugger;
  //     cb(sn);
  //   })
  //   .catch((err) => {
  //     debugger;
  //     console.error(err);
  //   });
}

function LoginGoogle() {
  const auth = getAuth();

  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      return new Promise((res, rej) => {
        res(user);
      });
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function signOutG() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

let unsub = null;
!(function () {
  onAuthStateChanged(getAuth(), (fu) => {
    store.commit("setFireUser", fu);
    unsub?.();
    if (!fu) return store.commit("setUser", null);

    !(function (fu) {
      const docRef = doc(getFirestore(), "users", fu.uid);
      unsub = onSnapshot(
        docRef,
        (doc) => {
          doc.exists() && store.commit("setUser", doc.data());
        },
        console.error
      );
    })(fu);
  });
})();

Vue.prototype.$firebase_ = firebase;

Vue.prototype.$firebase = {
  LoginGoogle,
  signOutG,
  auth,
  readObjRsp,
  readObj,
  writeObj,
  fireStore,
  db,
  ref,
  set,
};
