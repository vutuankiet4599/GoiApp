import React, { useContext, useState } from "react";
import { Button, Text, TextInput } from "@react-native-material/core";
import { ImageBackground, SafeAreaView, View } from "react-native";
import { style } from "../styles/style";
import { Icon } from "@react-native-material/core";
import { AppContext } from "../providers/AppProvider";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { loginService } from "../services/AuthService";

function Login({ navigation }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  let { action } = useContext(AppContext);

  const login = () => {
    if (userName === "" || password === "") {
      Toast.show({
        type: "error",
        text1: "Lỗi đăng nhập",
        text2: "Tên đăng nhập và mật khẩu không được để trống",
      });
      return;
    }
    loginService(userName, password)
      .then((response) => {
        action.setUserInfo({
          userName: response.user.username,
          password: response.user.password,
          role: response.user.role,
        });
        navigation.navigate("Home");
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
      style={style.image}
      resizeMode="stretch"
      source={require("../images/background.jpg")}
    >
      <SafeAreaView style={style.container}>
        <View style={style.form}>
          <Text variant="h5" style={{ textAlign: "center", marginBottom: 10 }}>
            Đăng nhập
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
            title="Đăng nhập"
            onPress={login}
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
            Chưa có tài khoản?{" "}
            <Text
              color="primary"
              onPress={() => navigation.navigate("Register")}
            >
              Đăng ký
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Login;
