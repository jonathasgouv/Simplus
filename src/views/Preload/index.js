import React, { useState, useEffect, useContext } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../../contexts/UserContext";

import styles from "./styles";

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token !== null) {
        json = await Api.checkToken(token);

        if (json.newToken) {
          AsyncStorage.setItem("token", json.newToken);

          userDispatch({
            type: "setName",
            payload: {
              name: json.name,
            },
          });

          userDispatch({
            type: "setId",
            payload: {
              id: json._id,
            },
          });

          customers = await Api.getCustomers(json.newToken);

          userDispatch({
            type: "setCustomers",
            payload: {
              customers: customers,
            },
          });

          payments = await Api.getPayments(json.newToken);

          userDispatch({
            type: "setPayments",
            payload: {
              payments: payments,
            },
          });

          receivements = await Api.getReceivements(json.newToken);

          userDispatch({
            type: "setReceivements",
            payload: {
              receivements: receivements,
            },
          });

          return navigation.reset({
            index: 0,
            routes: [{ name: "MainTab" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    };

    checkToken();
  }, []); // empty array makes useEffect be called only once, simulating componentDidMount

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image
          source={require("../../../assets/logo2.png")}
          style={styles.image}
        />
        <ActivityIndicator size="large" color="#75add2" animating={true} />
      </View>
    </View>
  );
};
