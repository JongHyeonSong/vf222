/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
// const { FieldValue, collection } = require("@firebase/firestore/dist/lite");

const defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vue-mem-default-rtdb.firebaseio.com", //functions.config().admin.db_url, //"https://vue-mem-default-rtdb.firebaseio.com",
});

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// admin.firestore().doc()
// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore
  .document("/messages/{documentId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log("Uppercasing", context.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({ uppercase }, { merge: true });
  });

const db = admin.database();
const fdb = admin.firestore();

exports.createUser = functions.auth.user().onCreate((user) => {
  const { uid, email, displayName, photoURL } = user;
  const u = {
    email,
    displayName,
    photoURL,
    createdAt: new Date().getMilliseconds(), //rtdb는 new Date()가 안먹는
    level: email === functions.config().admin.email ? 0 : 5,
  };
  console.log(u);

  db.ref("users").child(uid).set(u);
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
  const { uid } = user;
  db.ref("happy").child(uid).set("zz");
  db.ref("users").child(uid).remove();
});

exports.documentWriteListener = functions.firestore
  .document("boards/{documentUid}")
  .onWrite((change, context) => {
    console.log(33333333333);
    if (!change.before.exists) {
      // New document Created : add one to count
      fdb
        .collection("meta")
        .doc("boards")
        .update({ count: admin.firestore.FieldValue.increment(1) });
    } else if (change.before.exists && change.after.exists) {
      // Updating existing document : Do nothing
    } else if (!change.after.exists) {
      // Deleting document : subtract one from count
      fdb
        .collection("meta")
        .doc("boards")
        .update({ count: admin.firestore.FieldValue.increment(-1) });
    }

    // return;
  });

// exports.increCnt = functions.firestore
//   .document("boards/{bidzzz}")
//   .onWrite(async (sn, context) => {
//     // fdb.collection("meta").doc("boards").set({ count: 1 });
//     admin.firestore.FieldValue;
//     FieldValue;
//     // console.log("zzzzzzzzzzzzzzzzz");
//     // console.log(admin.firestore.FieldValue.increment(1));
//     try {
//       fdb
//         .collection("meta")
//         .doc("boards")
//         .update("count", admin.firestore.FieldValue.increment(1));
//     } catch (e) {
//       fdb.collection("meta").doc("boards").set({ count: 1 });
//     }
//   });

// exports.decreCnt = functions.firestore
//   .document("boards/{bidzzz}")
//   .onDelete(async (sn, context) => {
//     fdb
//       .collection("meta")
//       .doc("boards")
//       .update("count", admin.firestore.FieldValue.increment(-1));
//   });
