import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#3A8AC0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewlogo: {
    flex: 0,
    justifyContent: "center",
  },
  iconinput: {
    marginRight: 10,
    justifyContent: "center",
    color: "#225273",
  },
  input: {
    backgroundColor: "#61a1cc",
    width: 250,
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    color: "#1d4560",
    fontWeight: "bold",
  },
  inputColor: {
    color: "#1d4560",
    fontWeight: "bold",
    width: "85%",
  },
  image: {
    resizeMode: "contain",
    width: 250,
  },
  btnSubmit: {
    backgroundColor: "#2e6e99",
    width: 250,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 15,
  },
  btnText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },
  btnSubscribe: {
    marginTop: 15,
    color: "#fff",
    textAlign: "center",
  },
});
