import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faMoneyBillWave,
  faWallet,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

//import styles from "./styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2e6e99",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    opacity: 1,
  },
  button: {
    flex: 1,
    position: "relative",
  },
  icon: {
    //color: "#347ca0c",
    color: "#b0d0e5",
    marginLeft: 20,
    margin: 10,
  },
});

export default ({ state, navigation }) => {
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const isSelected = (screenNumber) => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goTo("Home")} style={styles.button}>
        <FontAwesomeIcon
          icon={faHome}
          style={[styles.icon, { opacity: state.index === 0 ? 1 : 0.5 }]}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goTo("Customers")} style={styles.button}>
        <FontAwesomeIcon
          icon={faUsers}
          style={[
            styles.icon,
            { opacity: state.index === 1 || state.index === 4 ? 1 : 0.5 },
          ]}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goTo("Receivements")}
        style={styles.button}
      >
        <FontAwesomeIcon
          icon={faWallet}
          style={[
            styles.icon,
            { opacity: state.index === 2 || state.index === 6 ? 1 : 0.5 },
          ]}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goTo("Payments")} style={styles.button}>
        <FontAwesomeIcon
          icon={faMoneyBillWave}
          style={[
            styles.icon,
            { opacity: state.index === 3 || state.index === 5 ? 1 : 0.5 },
          ]}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};
