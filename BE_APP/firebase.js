var admin = require("firebase-admin");

var serviceAccount = require("./recipe-app-8e402-firebase-adminsdk-fbsvc-7385eef2af.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
