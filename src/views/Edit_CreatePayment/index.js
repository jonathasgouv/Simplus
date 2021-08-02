import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPencilAlt,
  faCalendar,
  faDollarSign,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import Api from "../../Api";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { UserContext } from "../../contexts/UserContext";

const convertDate = (inputFormat) => {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
};

export default ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: user } = useContext(UserContext);

  const [isEdition, setIsEdition] = useState(
    route.params.payment == false ? false : true
  );

  const [item, setItem] = useState(
    route.params.payment ? route.params.payment : undefined
  );
  const [itemId, setItemId] = useState(
    route.params.payment ? route.params.payment._id : undefined
  );
  const [isPaid, setIsPaid] = useState(
    isEdition ? item.isPaid || false : false
  );

  const [cursorPosition, setCursorPosition] = useState({ start: 0 });

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [nameField, setNameField] = useState(isEdition ? item.name || "" : "");
  const [priceField, setPriceField] = useState(
    isEdition ? item.price || "" : ""
  );
  const [descriptionField, setDescriptionField] = useState(
    isEdition ? item.description || "" : ""
  );

  const [date, setDate] = useState(
    isEdition ? new Date(item.expiration) || new Date() : new Date()
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleCancelClick = () => {
    return navigation.navigate("Payments");
  };

  const handleSaveClick = async () => {
    try {
      if (isEdition) {
        if (nameField) {
          let obj = {
            name: nameField,
            expiration: date,
            price: priceField,
            isPaid: isPaid,
            description: descriptionField == "" ? undefined : descriptionField,
          };

          const json = await Api.updatePayment(
            obj,
            itemId,
            await AsyncStorage.getItem("token")
          );

          console.log(json);

          if (json.success) {
            payments = await Api.getPayments(
              await AsyncStorage.getItem("token")
            );

            userDispatch({
              type: "setPayments",
              payload: {
                payments: payments,
              },
            });

            return navigation.navigate("Payments");
          } else {
            alert(
              "Preencha as informações corretamente. A senha deve ter ao menos 7 caracteres e o email deve ser válido."
            );
          }
        } else {
          alert("Preencha os campos necessários");
        }
      } else {
        if (nameField && date && priceField) {
          let obj = {
            name: nameField,
            expiration: date,
            price: priceField,
            isPaid: isPaid,
            description: descriptionField == "" ? undefined : descriptionField,
          };

          const json = await Api.registerPayment(
            obj,
            await AsyncStorage.getItem("token")
          );

          if (json.success) {
            payments = await Api.getPayments(
              await AsyncStorage.getItem("token")
            );

            userDispatch({
              type: "setPayments",
              payload: {
                payments: payments,
              },
            });

            return navigation.navigate("Payments");
          } else {
            alert(
              "Preencha as informações corretamente. O nome é obrigatório e as demais informações devem ser válidas."
            );
          }
        } else {
          alert("Preencha os campos necessários");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async () => {
    if (isEdition) {
      const json = await Api.removePayment(
        itemId,
        await AsyncStorage.getItem("token")
      );

      if (json.success) {
        payments = await Api.getPayments(await AsyncStorage.getItem("token"));

        userDispatch({
          type: "setPayments",
          payload: {
            payments: payments,
          },
        });

        return navigation.navigate("Payments");
      } else {
      }
    }
  };

  const reRender = (data) => {
    //scrollViewRef.current.scrollToOffset({ animated: false, offset: 0 });
    setIsEdition(data == false ? false : true);

    setItem(data.payment ? data.payment : undefined);
    setItemId(data.payment ? data._id : undefined);
    setIsPaid(isEdition ? item.isPaid || false : false);

    setCursorPosition({ start: 0 });

    setNameField(isEdition ? item.name || "" : "");
    setPriceField(isEdition ? item.price || "" : "");
    setDescriptionField(isEdition ? item.description || "" : "");

    setDate(isEdition ? new Date(item.expiration) || new Date() : new Date());
  };

  useEffect(() => {
    reRender(route.params.payment);
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
  }, [route.params.payment]);

  return (
    <KeyboardAvoidingView style={styles.container} horizontal={false}>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.viewinputs, { flex: 1, marginTop: 0 }]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
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
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              margin: 10,
              color: "#88b8d9",
            }}
          >
            {isEdition ? "EDITAR PAGAMENTO" : "NOVO PAGAMENTO"}
          </Text>
          <View style={styles.input}>
            <FontAwesomeIcon icon={faPencilAlt} style={styles.iconinput} />
            <TextInput
              placeholder="Nome"
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              returnKeyType={"next"}
              autoCorrect={false}
              value={nameField}
              onChangeText={(text) => setNameField(text)}
              style={styles.inputColor}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={[styles.input, { width: 100 }]}>
              <FontAwesomeIcon icon={faDollarSign} style={styles.iconinput} />
              <TextInput
                style={[styles.inputColor, { width: "75%" }]}
                placeholder="Valor"
                selection={cursorPosition}
                onFocus={() => setCursorPosition(undefined)}
                returnKeyType={"next"}
                autoCorrect={false}
                keyboardType="numeric"
                onChangeText={(text) => setPriceField(text)}
                value={priceField}
              />
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.input,
                  { width: 135, height: 50, marginLeft: 15 },
                ]}
                onPress={showDatepicker}
              >
                <FontAwesomeIcon icon={faCalendar} style={styles.iconinput} />
                <Text style={styles.inputColor}>{convertDate(date)}</Text>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <View
            style={[styles.input, { height: 150, alignItems: "flex-start" }]}
          >
            <FontAwesomeIcon icon={faQuoteLeft} style={styles.iconinput} />
            <TextInput
              placeholder="Descrição"
              textAlignVertical={"top"}
              multiline={true}
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              returnKeyType={"next"}
              autoCorrect={false}
              value={descriptionField}
              maxLength={2000}
              onChangeText={(text) => setDescriptionField(text)}
              style={[styles.inputColor, { height: 140 }]}
            />
          </View>

          <BouncyCheckbox
            size={25}
            fillColor="#2e6e99"
            unfillColor="#FFFFFF"
            text="Pago"
            iconStyle={{ borderColor: "#2e6e99" }}
            textStyle={styles.btnText}
            isChecked={isPaid}
            style={{ marginBottom: 10, alignSelf: "auto" }}
            onPress={(isChecked) => setIsPaid(isChecked)}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={handleCancelClick}
              style={[styles.btnSubmit, { width: 120, marginRight: 10 }]}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSaveClick}
              style={[styles.btnSubmit, { width: 120 }]}
            >
              <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
          </View>

          {isEdition && (
            <TouchableOpacity
              onPress={handleDeleteClick}
              style={[styles.btnSubmit, { backgroundColor: "red" }]}
            >
              <Text style={styles.btnText}>Excluir</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
