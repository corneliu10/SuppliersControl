import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import Background from "../components/Background";
import { theme } from "../core/theme";
import { FIREBASE_CONFIG } from "../core/config";
import DataManager from "../firebase/DataManager";
import { PacmanIndicator } from "react-native-indicators";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const AuthLoadingScreen = ({ navigation }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      DataManager.getInstance().user = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
      };
      // User is logged in
      navigation.navigate("InfoScreen");
    } else {
      // User is not logged in
      navigation.navigate("HomeScreen");
    }
  });

  return (
    <Background>
      <PacmanIndicator color="#600EE6" size={100} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
