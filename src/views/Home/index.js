import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMoneyBillWave,
  faWallet,
  faUsers,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { UserContext } from "../../contexts/UserContext";

import styles from "./styles";

const m_names = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Maio",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default () => {
  const navigation = useNavigation();
  const { state: user } = useContext(UserContext);
  const currentYearCostumers = user.customers.filter(
    (c) =>
      new Date(c.expiration).getUTCFullYear() == new Date().getUTCFullYear()
  );

  const logout = async () => {
    await AsyncStorage.clear();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={logout}
          style={[styles.btnSubmit, { backgroundColor: "#7B28B4" }]}
        >
          <Text style={styles.btnText}>Sair</Text>
        </TouchableOpacity>
        <View style={styles.viewWelcome}>
          <Text style={styles.textWelcome}>
            Olá, <Text style={{ fontWeight: "bold" }}>{`${user.name}`}</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Customers");
          }}
          style={{
            backgroundColor: "#61a1cc",
            width: "80%",
            alignItems: "center",
            borderRadius: 15,
            padding: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faUsers} style={styles.iconinput} />
            <Text
              style={{ fontWeight: "bold", marginLeft: 5, color: "#b0d0e5" }}
            >
              CLIENTES
            </Text>
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
              {user.customers.length}
            </Text>
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
              Clientes cadastrados
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ fontWeight: "bold", marginRight: 5, color: "#b0d0e5" }}
            >
              Ver mais
            </Text>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={[styles.iconinput, { marginTop: 2 }]}
              size={15}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Receivements");
          }}
          style={{
            backgroundColor: "#61a1cc",
            width: "80%",
            alignItems: "center",
            borderRadius: 15,
            padding: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faWallet} style={styles.iconinput} />
            <Text
              style={{ fontWeight: "bold", marginLeft: 5, color: "#b0d0e5" }}
            >
              RECEBIMENTOS
            </Text>
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
              {user.receivements.filter((r) => r.isReceived == false).length}
            </Text>
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
              Pendentes
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ fontWeight: "bold", marginRight: 5, color: "#b0d0e5" }}
            >
              Ver mais
            </Text>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={[styles.iconinput, { marginTop: 2 }]}
              size={15}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Payments");
          }}
          style={{
            backgroundColor: "#61a1cc",
            width: "80%",
            alignItems: "center",
            borderRadius: 15,
            padding: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faMoneyBillWave} style={styles.iconinput} />
            <Text
              style={{ fontWeight: "bold", marginLeft: 5, color: "#b0d0e5" }}
            >
              PAGAMENTOS
            </Text>
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
              {user.payments.filter((r) => r.isPaid == false).length}
            </Text>
          </View>
          <View style={{ alignContent: "center" }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
              Pendentes
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{ fontWeight: "bold", marginRight: 5, color: "#b0d0e5" }}
            >
              Ver mais
            </Text>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={[styles.iconinput, { marginTop: 2 }]}
              size={15}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Customers");
          }}
        >
          <LineChart
            data={{
              labels: [
                m_names[new Date().getMonth()],
                m_names[new Date().getMonth() + 1],
                m_names[new Date().getMonth() + 2],
                m_names[new Date().getMonth() + 3],
                m_names[new Date().getMonth() + 4],
                m_names[new Date().getMonth() + 5],
              ],
              legend: [`Clientes nos próximos 6 meses`],
              datasets: [
                {
                  data: [
                    currentYearCostumers.filter(
                      (i) =>
                        new Date(i.expiration).getUTCMonth() ==
                        new Date().getUTCMonth()
                    ).length,
                    currentYearCostumers.filter(
                      (i) =>
                        new Date(i.expiration).getUTCMonth() ==
                        new Date().getUTCMonth() + 1
                    ).length,
                    currentYearCostumers.filter(
                      (i) =>
                        new Date(i.expiration).getUTCMonth() ==
                        new Date().getUTCMonth() + 2
                    ).length,
                    currentYearCostumers.filter(
                      (i) =>
                        new Date(i.expiration).getUTCMonth() ==
                        new Date().getUTCMonth() + 3
                    ).length,
                    currentYearCostumers.filter(
                      (i) =>
                        new Date(i.expiration).getUTCMonth() ==
                        new Date().getUTCMonth() + 4
                    ).length,
                    currentYearCostumers.filter(
                      (i) =>
                        new Date(i.expiration).getUTCMonth() ==
                        new Date().getUTCMonth() + 5
                    ).length,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.8} // from react-native
            height={220}
            //yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#61a1cc",
              backgroundGradientFrom: "#7B28B4",
              backgroundGradientTo: "#61a1cc",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#61a1cc",
              },
            }}
            bezier
            style={{
              marginVertical: 20,
              borderRadius: 16,
            }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
