import { child, get, ref, set } from "firebase/database";
import { database } from "../configs/firebase";
import { uid } from "uid";
import { USERS_STORAGE } from "@env";

const isExistUser = async (username) => {
  const dbRef = ref(database);
  username = username.trim();
  try {
    let users = await get(child(dbRef, USERS_STORAGE));
    users = users.val();
    let result = [];
    Object.entries(users).map(([, value]) => {
      if (value && value.username === username) {
        result = [...result, { isExist: true, user: value }];
      }
    });

    if (!result[0]) {
      return { isExist: false, user: null };
    }

    return result[0];
  } catch (error) {
    return { isExist: false, user: {} };
  }
};

export const loginService = (username, password) => {
  return new Promise(async (resolve, reject) => {
    let data = await isExistUser(username);
    if (!data.isExist) {
      reject({ message: "Tài khoản không tồn tại" });
    }
    if (data.user?.password !== password) {
      reject({ message: "Mật khẩu sai" });
    }

    resolve({ message: "Đăng nhập thành công", user: data.user });
  });
};

export const registerService = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await isExistUser(username);
      if (data.isExist) {
        reject({ message: "Tài khoản đã tồn tại" });
      } else {
        await set(ref(database, USERS_STORAGE + "/" + uid(5)), {
          username: username,
          password: password,
          role: 0,
        });
        resolve({ message: "Đăng ký thành công" });
      }
    } catch (error) {
      reject({ message: "Đăng ký thất bại" });
    }
  });
};
