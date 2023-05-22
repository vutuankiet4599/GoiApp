import { ref, set } from "firebase/database";
import { database } from "../configs/firebase";
import { WORDS_STORAGE } from "@env";
import { uid } from "uid";

export const insertNewWord = (word, definitions) => {
  return new Promise(async (resolve, reject) => {
    try {
      set(ref(database, WORDS_STORAGE + "/" + uid(5)), {
        word: word,
        definitions: definitions,
      });
      resolve({ message: "Thêm từ mới thành công" });
    } catch (error) {
      reject({ message: "Thêm từ mới thất bại" });
    }
  });
};
