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
  faUser,
  faMale,
  faCalendar,
  faIdCard,
  faMapMarkerAlt,
  faMobile,
  faCity,
  faBuilding,
  faHouseUser,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import Api from "../../Api";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../../contexts/UserContext";

const formatCPF = (cpf) => {
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");

  //realizar a formatação...
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const convertDate = (inputFormat) => {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
};

export default ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const scrollViewRef = useRef();

  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: user } = useContext(UserContext);

  const [isEdition, setIsEdition] = useState(
    route.params.customer == false ? false : true
  );

  const [item, setItem] = useState(
    route.params.customer ? route.params.customer : undefined
  );
  const [itemId, setItemId] = useState(
    route.params.customer ? route.params.customer._id : undefined
  );

  const [cursorPosition, setCursorPosition] = useState({ start: 0 });

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const [opacity] = useState(new Animated.Value(0));
  const [nameField, setNameField] = useState(isEdition ? item.name || "" : "");
  const [cellphoneField, setcellphoneField] = useState(
    isEdition ? item.cellphone || "" : ""
  );
  const [cpfField, setCPF] = useState(isEdition ? item.cpf || "" : "");
  const [selectedGender, setGender] = useState(
    isEdition ? (item.gender === false ? false : true) : true
  );
  const [cepField, setCEP] = useState(isEdition ? item.cep || "" : "");
  const [selectedState, setState] = useState(
    isEdition ? item.address?.state || "AC" : "AC"
  );
  const [cityField, setCity] = useState(
    isEdition ? item.address?.city || "" : ""
  );
  const [districtField, setDistrict] = useState(
    isEdition ? item.address?.district || "" : ""
  );
  const [streetField, setStreet] = useState(
    isEdition ? item.address?.street || "" : ""
  );
  const [numberField, setNumberField] = useState(
    isEdition ? item.address?.number || "" : ""
  );
  const [observationField, setObservationField] = useState(
    isEdition ? item.observation || "" : ""
  );
  const [dependentsFieldList, setdependentsFieldList] = useState(
    isEdition ? item.dependents || [""] : [""]
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

  const handleDependents = (text, index) => {
    let copy = [...dependentsFieldList];
    copy[index] = text;
    setdependentsFieldList(copy);
  };

  const addDepententField = () => {
    let copy = [...dependentsFieldList];
    copy.push("");
    setdependentsFieldList(copy);
  };

  const removeDepententField = () => {
    let copy = [...dependentsFieldList];
    copy.pop();
    setdependentsFieldList(copy);
  };

  const handleCancelClick = () => {
    return navigation.navigate("Customers");
  };

  const handleSaveClick = async () => {
    try {
      if (isEdition) {
        if (nameField) {
          let obj = {
            name: nameField,
            gender: selectedGender == "Masculino" ? true : false,
            cpf: cepField == "" ? undefined : cepField,
            expiration: date,
            cellphone: cellphoneField == "" ? undefined : cellphoneField,
            address: {
              state: selectedState,
              city: cityField,
              district: districtField == "" ? undefined : districtField,
              street: streetField == "" ? undefined : streetField,
              number: numberField == "" ? undefined : numberField,
              cep: cepField == "" ? undefined : cepField,
              observation:
                observationField == "" ? undefined : observationField,
            },
            dependents: dependentsFieldList,
          };

          const json = await Api.updateCustomer(
            obj,
            itemId,
            await AsyncStorage.getItem("token")
          );

          console.log(json);

          if (json.success) {
            customers = await Api.getCustomers(
              await AsyncStorage.getItem("token")
            );

            userDispatch({
              type: "setCustomers",
              payload: {
                customers: customers,
              },
            });

            return navigation.navigate("Customers");
          } else {
            alert(
              "Preencha as informações corretamente. A senha deve ter ao menos 7 caracteres e o email deve ser válido."
            );
          }
        } else {
          alert("Preencha os campos necessários");
        }
      } else {
        if (nameField) {
          let obj = {
            name: nameField,
            gender: selectedGender == "Masculino" ? true : false,
            cpf: cepField == "" ? undefined : cepField,
            expiration: date,
            cellphone: cellphoneField == "" ? undefined : cellphoneField,
            address: {
              state: selectedState,
              city: cityField,
              district: districtField == "" ? undefined : districtField,
              street: streetField == "" ? undefined : streetField,
              number: numberField == "" ? undefined : numberField,
              cep: cepField == "" ? undefined : cepField,
            },
            observation: observationField == "" ? undefined : observationField,
            dependents: dependentsFieldList,
          };

          const json = await Api.registerCustomer(
            obj,
            await AsyncStorage.getItem("token")
          );

          if (json.success) {
            customers = await Api.getCustomers(
              await AsyncStorage.getItem("token")
            );

            userDispatch({
              type: "setCustomers",
              payload: {
                customers: customers,
              },
            });

            return navigation.navigate("Customers");
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
      const json = await Api.removeCustomer(
        itemId,
        await AsyncStorage.getItem("token")
      );

      if (json.success) {
        customers = await Api.getCustomers(await AsyncStorage.getItem("token"));

        userDispatch({
          type: "setCustomers",
          payload: {
            customers: customers,
          },
        });

        return navigation.navigate("Customers");
      } else {
      }
    }
  };

  const renderItem = ({ item, index }) => (
    <TextInput
      placeholder={`Dependente Nº ${index + 1}`}
      selection={cursorPosition}
      autoCorrect={false}
      onFocus={() => setCursorPosition(undefined)}
      style={styles.input}
      onChangeText={(text) => handleDependents(text, index)}
      value={item}
    />
  );

  const reRender = (data) => {
    //scrollViewRef.current.scrollToOffset({ animated: true, offset: 0 });
    setCursorPosition({ start: 0 });
    setIsEdition(data == false ? false : true);
    setItem(data ? data : undefined);
    setItemId(data ? data._id : undefined);
    setNameField(isEdition ? data.name || "" : "");
    setcellphoneField(isEdition ? data.cellphone || "" : "");
    setCPF(isEdition ? data.cpf || "" : "");
    setGender(isEdition ? (data.gender === false ? false : true) : true);
    setCEP(isEdition ? data.cep || "" : "");
    setState(isEdition ? data.address?.state || "AC" : "AC");
    setCity(isEdition ? data.address?.city || "" : "");
    setDistrict(isEdition ? data.address?.district || "" : "");
    setStreet(isEdition ? data.address?.street || "" : "");
    setNumberField(isEdition ? data.address?.number || "" : "");
    setObservationField(isEdition ? data.observation || "" : "");
    setdependentsFieldList(isEdition ? data.dependents || [""] : [""]);

    setDate(isEdition ? new Date(data.expiration) || new Date() : new Date());
  };

  useEffect(() => {
    reRender(route.params.customer);
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
  }, [route.params.customer]);

  return (
    <KeyboardAvoidingView style={styles.container} horizontal={false}>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.viewinputs, { flex: 1, marginTop: 100 }]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
        <Animated.View
          horizontal={false}
          style={{
            opacity: opacity,
            transform: [
              {
                translateY: offset.y,
              },
            ],
          }}
        >
          <View style={styles.input}>
            <FontAwesomeIcon icon={faUser} style={styles.iconinput} />
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
          <View style={styles.input}>
            <FontAwesomeIcon icon={faMobile} style={styles.iconinput} />
            <TextInput
              placeholder="Celular"
              keyboardType="numeric"
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              returnKeyType={"next"}
              autoCorrect={false}
              value={cellphoneField}
              onChangeText={(text) => setcellphoneField(text)}
              style={styles.inputColor}
            />
          </View>
          <View style={styles.input}>
            <FontAwesomeIcon icon={faIdCard} style={styles.iconinput} />
            <TextInput
              placeholder="CPF"
              keyboardType="numeric"
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              returnKeyType={"next"}
              autoCorrect={false}
              value={cpfField}
              onChangeText={(cpf) => setCPF(formatCPF(cpf))}
              style={styles.inputColor}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#61a1cc",
                borderRadius: 20,
                width: 100,
                marginBottom: 15,
              }}
            >
              <Picker
                style={{ color: "#1d4560", fontWeight: "bold" }}
                selectedValue={selectedGender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="♂️M" value={true} />
                <Picker.Item label="♀️F" value={false} />
              </Picker>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={[
                  styles.input,
                  { width: 135, height: 50, marginLeft: 15 },
                ]}
                onPress={showDatepicker}
              >
                <FontAwesomeIcon icon={faCalendar} style={styles.iconinput} />
                <Text>{convertDate(date)}</Text>
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
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                styles.input,
                { width: 145, height: 50, marginRight: 15 },
              ]}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.iconinput} />
              <TextInput
                placeholder="CEP"
                selection={cursorPosition}
                onFocus={() => setCursorPosition(undefined)}
                keyboardType="numeric"
                returnKeyType={"next"}
                autoCorrect={false}
                value={cepField}
                onChangeText={(cep) => setCEP(cep)}
                style={styles.inputColor}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#61a1cc",
                borderRadius: 20,
                width: 90,
                marginBottom: 15,
              }}
            >
              <Picker
                style={{ color: "#1d4560", fontWeight: "bold" }}
                selectedValue={selectedState}
                onValueChange={(itemValue) => setState(itemValue)}
              >
                <Picker.Item label="AC" value={"AC"} />
                <Picker.Item label="AL" value={"AL"} />
                <Picker.Item label="AP" value={"AP"} />
                <Picker.Item label="AM" value={"AM"} />
                <Picker.Item label="BA" value={"BA"} />
                <Picker.Item label="CE" value={"CE"} />
                <Picker.Item label="ES" value={"ES"} />
                <Picker.Item label="GO" value={"GO"} />
                <Picker.Item label="MA" value={"MA"} />
                <Picker.Item label="MT" value={"MT"} />
                <Picker.Item label="MS" value={"MS"} />
                <Picker.Item label="MG" value={"MG"} />
                <Picker.Item label="PA" value={"PA"} />
                <Picker.Item label="PB" value={"PB"} />
                <Picker.Item label="PR" value={"PR"} />
                <Picker.Item label="PE" value={"PE"} />
                <Picker.Item label="PI" value={"PI"} />
                <Picker.Item label="RJ" value={"RJ"} />
                <Picker.Item label="RN" value={"RN"} />
                <Picker.Item label="RS" value={"RS"} />
                <Picker.Item label="RO" value={"RO"} />
                <Picker.Item label="RR" value={"RR"} />
                <Picker.Item label="SC" value={"SC"} />
                <Picker.Item label="SP" value={"SP"} />
                <Picker.Item label="SE" value={"SE"} />
                <Picker.Item label="TO" value={"TO"} />
                <Picker.Item label="DF" value={"DF"} />
              </Picker>
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <FontAwesomeIcon icon={faCity} style={styles.iconinput} />
            <TextInput
              placeholder="Cidade"
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              autoCorrect={false}
              value={cityField}
              onChangeText={(text) => setCity(text)}
              style={styles.inputColor}
            />
          </View>
          <View style={styles.input}>
            <FontAwesomeIcon icon={faBuilding} style={styles.iconinput} />
            <TextInput
              placeholder="Bairro"
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              autoCorrect={false}
              value={districtField}
              onChangeText={(text) => setDistrict(text)}
              style={styles.inputColor}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                styles.input,
                { width: 155, height: 50, marginRight: 10 },
              ]}
            >
              <FontAwesomeIcon icon={faHouseUser} style={styles.iconinput} />
              <TextInput
                placeholder="Rua"
                selection={cursorPosition}
                onFocus={() => setCursorPosition(undefined)}
                returnKeyType={"next"}
                autoCorrect={false}
                value={streetField}
                onChangeText={(text) => setStreet(text)}
                style={styles.inputColor}
              />
            </View>

            <TextInput
              placeholder="Nº"
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              keyboardType="numeric"
              style={[styles.input, { width: 85 }]}
              selectedValue={numberField}
              onValueChange={(itemValue) => setNumberField(itemValue)}
            />
          </View>

          <View
            style={[styles.input, { height: 150, alignItems: "flex-start" }]}
          >
            <FontAwesomeIcon icon={faQuoteLeft} style={styles.iconinput} />
            <TextInput
              placeholder="Observações"
              textAlignVertical={"top"}
              multiline={true}
              selection={cursorPosition}
              onFocus={() => setCursorPosition(undefined)}
              returnKeyType={"next"}
              autoCorrect={false}
              value={observationField}
              maxLength={2000}
              onChangeText={(text) => setObservationField(text)}
              style={[styles.inputColor, { height: 140 }]}
            />
          </View>

          <FlatList
            removeClippedSubviews={true}
            scrollEnabled={true}
            vertical
            data={dependentsFieldList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={dependentsFieldList}
          />

          <TouchableOpacity
            onPress={addDepententField}
            style={styles.btnSubmit}
          >
            <Text style={styles.btnText}>Adicionar dependente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={removeDepententField}
            style={styles.btnSubmit}
          >
            <Text style={styles.btnText}>Remover dependente</Text>
          </TouchableOpacity>

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
