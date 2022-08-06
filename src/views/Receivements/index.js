import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faUserCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../contexts/UserContext";
import NoContent from "../../components/NoContent";

import styles from "./styles";

const trunc = (text, length) => {
  return text.length > length ? `${text.substr(0, length)}...` : text;
};

const getBorderColor = (date) => {
  if (new Date(date) > new Date()) {
    if (
      new Date(date) > new Date(new Date().setMonth(new Date().getMonth() + 3))
    ) {
      return "#008000";
    } else {
      return "#ffff00";
    }
  } else {
    return "#FF0000";
  }
};

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: user } = useContext(UserContext);
  const [receivements, setPayments] = useState(user.receivements);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    customers = await Api.getCustomers(await AsyncStorage.getItem("token"));

    userDispatch({
      type: "setCustomers",
      payload: {
        customers: customers,
      },
    });

    setCustomers(customers);
    setRefresh(false);
  };

  const handleCreateClick = async () => {
    navigation.navigate("Edit_CreateReceivement", { receivement: false });
  };

  const handleEditClick = async (item) => {
    navigation.navigate("Edit_CreateReceivement", { receivement: item });
  };

  const Receivement = ({ name, expiration, price, description, item }) => (
    <TouchableOpacity
      onPress={() => handleEditClick(item)}
      style={[
        styles.customerView,
        { borderLeftColor: getBorderColor(expiration) },
      ]}
    >
      <View>
        <FontAwesomeIcon
          icon={faUserCircle}
          style={styles.customerIcon}
          size={40}
        />
      </View>
      <View>
        <Text style={styles.customerName}>{name}</Text>
        <Text style={styles.customerExpiration}>
          {convertDate(expiration)}
          <Text style={styles.customerCity}> - R$ {price}</Text>
        </Text>
        <Text style={styles.customerDependents}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Receivement
      name={trunc(item.name.toUpperCase(), 29)}
      expiration={new Date(item.expiration).toLocaleDateString()}
      price={item.price}
      description={
        item.description === "" || item.description === undefined
          ? "Descrição não informada"
          : trunc(item.description, 100)
      }
      item={item}
    />
  );

  const flatListRef = useRef();

  const handleSearch = (text) => {
    if (!text || text === "") {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      setPayments(user.payments);
    } else {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      setPayments(
        user.payments.filter((a) => a.name.includes(text.toUpperCase()))
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          margin: 0,
          color: "#b0d0e5",
          marginTop: 35,
        }}
      >
        RECEBIMENTOS
      </Text>
      <View style={styles.viewSearch}>
        <TextInput
          placeholder="Digite o nome aqui..."
          placeholderTextColor="#2e6e99"
          returnKeyType={"next"}
          autoCorrect={false}
          onChangeText={(text) => handleSearch(text)}
          style={styles.searchInput}
        />
        <FontAwesomeIcon icon={faSearch} style={styles.iconInput} size={25} />
      </View>
      <View style={styles.customersView} horizontal={false}>
        <FlatList
          ref={flatListRef}
          refreshing={refresh}
          onRefresh={() => onRefresh}
          ListEmptyComponent={NoContent}
          initialNumToRender={20}
          removeClippedSubviews={true}
          data={receivements}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleCreateClick}>
        <FontAwesomeIcon
          icon={faPlus}
          style={{ justifyContent: "center", color: "#b0d0e5" }}
        />
      </TouchableOpacity>
    </View>
  );
};
