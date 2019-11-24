// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";

class DataManager {
  static _instance = null;

  _firebaseConfig = {
    apiKey: "AIzaSyBHcgeRa7ExIJPBpPoYNGWqpB3VdhbIssw",
    authDomain: "supplierscontrol-d22fe.firebaseapp.com",
    databaseURL: "https://supplierscontrol-d22fe.firebaseio.com",
    projectId: "supplierscontrol-d22fe",
    storageBucket: "supplierscontrol-d22fe.appspot.com",
    messagingSenderId: "455128803845",
    appId: "1:455128803845:web:ab3d267e029bd54771ca6c",
    measurementId: "G-QKWR6R1JCQ"
  };

  user = null;

  constructor() {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(this._firebaseConfig);
    }
  }

  static getInstance() {
    if (DataManager._instance == null) {
      DataManager._instance = new DataManager();
    }

    return DataManager._instance;
  }

  listenRequests(callback) {
    firebase
      .database()
      .ref("/requests/")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data.status === "WAITING") {
          callback({ data: snapshot.val(), key: snapshot.key });
        }
      });
  }

  removeListenRequests(callback) {
    firebase
      .database()
      .ref("/requests/")
      .off("child_added", callback);
  }

  listenOffers(callback) {
    firebase
      .database()
      .ref("/offers/")
      .on("child_added", snapshot => {
        if (snapshot.val().supplier_id === this.user.uid) {
          callback(snapshot.val());
        }
      });
  }

  listenOffersUpdates(callback) {
    firebase
      .database()
      .ref("/offers/")
      .on("child_changed", snapshot => {
        if (snapshot.val().supplier_id === this.user.uid) {
          callback(snapshot.val());
        }
      });
  }

  removeListenOffers(callback) {
    firebase
      .database()
      .ref("/offers/")
      .off("child_added", callback);
  }

  async readRequests() {
    const snapshot = await firebase
      .database()
      .ref("/requests/")
      .once("value");
    return snapshot;
  }

  updateOffer(newOffer, offer_id) {
    const path = "/offers/" + offer_id + "/";
    firebase
      .database()
      .ref(path)
      .update({
        ...newOffer
      });
  }

  writeOfferRequest(data) {
    const offersPath = "/offers/";
    const offersKey = firebase
      .database()
      .ref()
      .push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates["/" + offersPath + "/" + offersKey] = data;
    updates["/" + offersPath + "/" + offersKey]["offer_id"] = offersKey;

    return firebase
      .database()
      .ref()
      .update(updates);
  }
}

export default DataManager;
