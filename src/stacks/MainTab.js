import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../views/Home/index";
import Customers from "../views/Customers/index";
import Receivements from "../views/Receivements/index";
import Payments from "../views/Payments/index";

import Edit_CreateCustomer from "../views/Edit_CreateCustomer/index";
import Edit_CreatePayment from "../views/Edit_CreatePayment/index";
import Edit_CreateReceivement from "../views/Edit_CreateReceivement/index";

import TabBar from "../components/TabBar";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Customers" component={Customers} />
      <Tab.Screen name="Receivements" component={Receivements} />
      <Tab.Screen name="Payments" component={Payments} />
      <Tab.Screen name="Edit_CreateCustomer" component={Edit_CreateCustomer} />
      <Tab.Screen name="Edit_CreatePayment" component={Edit_CreatePayment} />
      <Tab.Screen
        name="Edit_CreateReceivement"
        component={Edit_CreateReceivement}
      />
    </Tab.Navigator>
  );
};
