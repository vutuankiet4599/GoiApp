import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  dFlex: {
    display: "flex",
  },
  flexColumn: {
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  form: {
    width: "75%",
    height: "auto",
    border: "2px solid",
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
    padding: 10,
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  w50: {
    width: "50%",
  },
  h50: {
    height: "50%",
  },
  w75: {
    width: "75%",
  },
  h75: {
    height: "75%",
  },
  w100: {
    width: "100%",
  },
  h100: {
    height: "100%",
  },
});
