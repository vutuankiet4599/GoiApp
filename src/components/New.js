import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { style } from "../styles/style";
import { Button, Icon, Text, TextInput } from "@react-native-material/core";
import { useContext, useState } from "react";
import { insertNewWord } from "../services/WordService";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { AppContext } from "../providers/AppProvider.js";

export const New = ({ navigation }) => {
  const [word, setWord] = useState("");
  const [definitions, setDefinations] = useState([]);
  let { data } = useContext(AppContext);

  const newWord = () => {
    if (data.userInfo?.role === 0) {
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Người dùng không có quyền thêm",
      });
      return;
    }

    insertNewWord(word, definitions)
      .then((response) => {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: response.message,
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Thất bại",
          text2: error.message,
        });
      });
  };

  const changeDefinitionItem = (item, index) => {
    let newDefinitions = definitions.map((definition, _index) => {
      if (_index === index) {
        return item;
      }

      return definition;
    });

    setDefinations(newDefinitions);
  };

  const addDefinitionItem = () => {
    setDefinations([...definitions, ""]);
  };

  const removeDefinitionItem = (index) => {
    let newDefinitions = definitions.filter((_, _index) => index !== _index);
    setDefinations(newDefinitions);
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.form}>
        <Text variant="h5" style={{ textAlign: "center", marginBottom: 10 }}>
          Thêm từ mới
        </Text>
        <TextInput
          label="Từ"
          style={{ marginBottom: 10 }}
          value={word}
          onChangeText={setWord}
        />
        {definitions.map((definition, index) => (
          <TextInput
            key={index}
            label={`Định nghĩa ${index + 1}`}
            style={{ marginBottom: 10 }}
            value={definition}
            onChangeText={(text) => changeDefinitionItem(text, index)}
            trailing={(props) => (
              <Icon
                name="close"
                color="#ff0000"
                {...props}
                onPress={() => removeDefinitionItem(index)}
              />
            )}
          />
        ))}

        <Button
          title="Thêm định nghĩa"
          onPress={addDefinitionItem}
          variant="contained"
          color="#1e90ff"
          style={{
            width: "75%",
            marginBottom: 10,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <Button
          title="Tạo"
          onPress={newWord}
          variant="contained"
          color="#88d498"
          style={{
            width: "75%",
            marginBottom: 10,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Button
          title="Quay về trang chủ"
          onPress={() => navigation.navigate("Home")}
          variant="contained"
          style={{
            width: "75%",
            marginBottom: 10,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </View>
    </SafeAreaView>
  );
};
