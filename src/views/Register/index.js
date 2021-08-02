import React, { useState, useEffect } from "react";
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
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import Api from "../../Api";

export default () => {
  const navigation = useNavigation();

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passworwdField, setpassworwdField] = useState("");

  const handleRegisterClick = async () => {
    try {
      if (nameField != "" && emailField != "" && passworwdField != "") {
        const json = await Api.register(nameField, emailField, passworwdField);

        console.log(json);

        if (json.success) {
          navigation.navigate("Login");
        } else {
          alert(
            "Preencha as informações corretamente. A senha deve ter ao menos 7 caracteres e o email deve ser válido."
          );
        }
      } else {
        alert("Preencha os campos necessários");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginClick = () => {
    navigation.navigate("Login");
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
            placeholder="nome"
            returnKeyType={"next"}
            autoCorrect={false}
            value={nameField}
            onChangeText={(text) => setNameField(text)}
            style={styles.inputColor}
          />
        </View>

        <View style={styles.input}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.iconinput} />
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

        <TouchableOpacity
          onPress={handleRegisterClick}
          style={styles.btnSubmit}
        >
          <Text style={styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginClick}>
          <Text style={styles.btnSubscribe}>
            Já tem uma conta?
            <Text style={{ fontWeight: "bold" }}> Faça login</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
