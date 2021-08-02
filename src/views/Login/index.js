import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import Api from "../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../contexts/UserContext";

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [emailField, setEmailField] = useState("");
  const [passworwdField, setpassworwdField] = useState("");

  const handleLoginClick = async () => {
    try {
      if (emailField != "" && passworwdField != "") {
        const json = await Api.login(emailField, passworwdField);

        if (json.token) {
          AsyncStorage.setItem("token", json.token);

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

          navigation.reset({
            index: 0,
            routes: [{ name: "MainTab" }],
          });
        } else {
          alert("Senha e/ou email incorretos");
        }
      } else {
        alert("Preencha os campos necessários");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterClick = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 3,
        bounciness: 15,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewlogo}>
        <Image
          source={require("../../../assets/logo2.png")}
          style={styles.image}
        />
      </View>
      <Animated.View
        style={[
          styles.viewinputs,
          {
            opacity: opacity,
            transform: [
              {
                translateY: offset.y,
              },
            ],
          },
        ]}
      >
        <View style={styles.input}>
          <FontAwesomeIcon icon={faUser} style={styles.iconinput} />
          <TextInput
            placeholder="email"
            returnKeyType={"next"}
            autoCorrect={false}
            value={emailField}
            onChangeText={(text) => setEmailField(text)}
            style={styles.inputColor}
          />
        </View>

        <View style={styles.input}>
          <FontAwesomeIcon icon={faLock} style={styles.iconinput} />
          <TextInput
            secureTextEntry={true}
            placeholder="senha"
            autoCorrect={false}
            value={passworwdField}
            onChangeText={(text) => setpassworwdField(text)}
            style={styles.inputColor}
          />
        </View>

        <TouchableOpacity onPress={handleLoginClick} style={styles.btnSubmit}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegisterClick}>
          <Text style={styles.btnSubscribe}>
            Novo por aqui?
            <Text style={{ fontWeight: "bold" }}> Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
