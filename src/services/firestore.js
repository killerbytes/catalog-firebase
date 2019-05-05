import Firebase from "firebase-admin";
import serviceAccount from "../../service-account-file.json";

Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount),
  databaseURL: "https://azd-catalog.firebaseio.com"
});

module.exports = Firebase.firestore();
