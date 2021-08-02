import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#3A8AC0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewSearch: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "#61a1cc",
    color: "#286086",
    width: 250,
    fontSize: 17,
    borderRadius: 20,
    padding: 10,
  },
  iconInput: {
    color: "#b0d0e5",
    marginLeft: 20,
  },
  viewlogo: {
    flex: 0,
    justifyContent: "center",
  },
  customersView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#61a1cc",
    marginTop: 15,
  },
  customerView: {
    backgroundColor: "#3A8AC0",
    borderRadius: 25,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 15,
    paddingLeft: 0,
    margin: 15,
    marginBottom: 1,
    borderLeftWidth: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  customerIcon: {
    color: "#b0d0e5",
    margin: 10,
  },
  customerName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  customerExpiration: {
    color: "#b0d0e5",
    fontSize: 15,
    fontWeight: "bold",
  },
  customerCity: {
    color: "#b0d0e5",
    fontWeight: "normal",
  },
  customerDependents: {
    fontSize: 15,
    color: "#b0d0e5",
    fontWeight: "normal",
  },
  buttonStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 30,
    backgroundColor: "#286086",
    borderRadius: 50,
  },
});
