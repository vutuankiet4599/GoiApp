import React, { useEffect, useState } from "react";
import { Button, Icon, Text, TextInput } from "@react-native-material/core";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCheckLoggedIn } from "../hooks/custom-hook";
import { Item } from "./Item";
import { off, onValue, ref } from "firebase/database";
import { database } from "../configs/firebase";
import { WORDS_STORAGE } from "@env";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function Home({ navigation }) {
  let checkLoggedIn = useCheckLoggedIn();
  const wordsRef = ref(database, WORDS_STORAGE);
  const [words, setWords] = useState({});
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  const getListWords = (page, search) => {
    return Object.entries(words)
      .filter(
        ([_, value]) =>
          value.word.includes(search) ||
          value.definitions.join("").includes(search)
      )
      .slice(page - 1, page + 4);
  };

  const handleSearch = () => {
    if (/^\d+$/.test(page)) {
      setSearchPage(page);
    } else {
      Toast.show({
        type: "error",
        text1: "Phân trang",
        text2: "Mời nhập số nguyên",
      });
    }
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  useEffect(() => {
    checkLoggedIn();
    onValue(
      wordsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setWords([]);
        } else {
          setWords(data);
        }
      },
      (error) => {
        console.error(error);
        setErr("Không thể lấy từ vựng");
      }
    );

    return () => off(wordsRef);
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <Button
          variant="contained"
          title="Thêm mới"
          color="#88d498"
          onPress={() => navigation.navigate("New")}
        />
        <TextInput
          label="Tìm kiếm từ vựng"
          value={search}
          onChangeText={setSearch}
        />
        {words &&
          getListWords(searchPage, search).map(
            ([key, value]) => value && <Item key={key} value={value} />
          )}
        <Text
          variant="h6"
          color="#ff0000"
          style={{ textAlign: "center", display: err === "" ? "none" : "flex" }}
        >
          {err}
        </Text>
        <View style={{ margin: "auto" }}>
          <TextInput
            value={page}
            onChangeText={setPage}
            placeholder="Nhập số trang"
            keyboardType="numeric"
            trailing={(props) => (
              <Icon {...props} name="magnify" onPress={handleSearch} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
