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
import { useNavigation, StackActions } from "@react-navigation/native";
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
  const [customers, setCustomers] = useState(user.customers);

  const handleCreateClick = async () => {
    navigation.navigate("Edit_CreateCustomer", { customer: false });
  };

  const handleEditClick = async (item) => {
    navigation.navigate("Edit_CreateCustomer", { customer: item });
  };

  const Customer = ({ name, expiration, city, dependents, item }) => (
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
          <Text style={styles.customerCity}> - {city}</Text>
        </Text>
        <Text style={styles.customerDependents}>{dependents} dependentes</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Customer
      name={trunc(item.name.toUpperCase(), 29)}
      expiration={new Date(item.expiration).toLocaleDateString()}
      city={
        item.address.city === "" ? "Cidade não informada" : item.address.city
      }
      item={item}
      dependents={item.dependents.length}
    />
  );

  const flatListRef = useRef();

  const handleSearch = (text) => {
    if (!text || text === "") {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      setCustomers(user.customers);
    } else {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      setCustomers(
        user.customers.filter((a) => a.name.includes(text.toUpperCase()))
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
        CLIENTES
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
          ListEmptyComponent={NoContent}
          initialNumToRender={20}
          removeClippedSubviews={true}
          data={customers}
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
