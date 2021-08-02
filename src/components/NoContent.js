import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NoContent = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.txt}>Parece que não há nada aqui :(</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
  },
  txt: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NoContent;
