import { ImageBackground, SafeAreaView, View } from "react-native";
import { style } from "../styles/style";
import { useState } from "react";
import { Button, Icon, Text, TextInput } from "@react-native-material/core";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { registerService } from "../services/AuthService";

export const Register = ({ navigation }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  const regiter = () => {
    if (userName === "" || password === "") {
      Toast.show({
        type: "error",
        text1: "Lỗi đăng ký",
        text2: "Tài khoản và mật khẩu không được để trống",
      });
      return;
    }

    registerService(userName, password)
      .then((response) => {
        navigation.navigate("Login");
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: response.message,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: error.message,
        });
      });
  };
  return (
    <ImageBackground
      source={require("../images/background.jpg")}
      resizeMode="stretch"
      style={style.image}
    >
      <SafeAreaView style={style.container}>
        <View style={style.form}>
          <Text variant="h5" style={{ textAlign: "center", marginBottom: 10 }}>
            Đăng ký
          </Text>
          <TextInput
            label="Tài khoản"
            style={{ marginBottom: 10 }}
            value={userName}
            onChangeText={setUsername}
            leading={(props) => <Icon name="account" {...props} />}
          ></TextInput>
          <TextInput
            label="Mật khẩu"
            secureTextEntry={isSecure}
            style={{ marginBottom: 10 }}
            value={password}
            onChangeText={setPassword}
            leading={(props) => <Icon name="lock" {...props} />}
            trailing={(props) => (
              <Icon
                name={isSecure ? "eye" : "eye-off"}
                {...props}
                onPress={() => setIsSecure(!isSecure)}
              />
            )}
          ></TextInput>
          <Button
            title="Đăng ký"
            onPress={regiter}
            variant="contained"
            color="#88d498"
            style={{
              width: "75%",
              marginBottom: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Text style={{ textAlign: "center", marginBottom: 10 }}>
            Đã có tài khoản?{" "}
            <Text color="primary" onPress={() => navigation.navigate("Login")}>
              Đăng nhập
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
