/* eslint-disable no-unused-vars */
// import universalify from "universalify";
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
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
// import * as dbs from "firebase/database";
import Vue from "vue";

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

function writeObj(root, data) {
  const _ref = ref(db, root);
  set(_ref, data);
}

const dbRef = ref(db);

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
      debugger;
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

Vue.prototype.$firebase_ = firebase;

Vue.prototype.$firebase = {
  readObjRsp,
  readObj,
  writeObj,
  fireStore,
  db,
  ref,
  set,
};
