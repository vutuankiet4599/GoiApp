# App note từ vựng đã học

## Cài đặt

Dùng npm để cài đặt (Hoặc là có thể là yarn...)

```bash
npm install -g expo-cli
npm install
```

Tạo file .env và copy tất cả các biến từ file .env.example

- Các biến có tiền tố FIREBASE là giá trị để config firebase
- USERS_STORAGE là vị trí lưu tài khoản người dùng trong database
- WORDS_STORAGE là vị trí lưu thông tin từ vựng trong database

Tạo firebase project và khởi tạo Realtime database và lấy link database gán vào biến FIREBASE_DATABASE_URL trong .env

## Chạy trên môi trường dev

Chạy câu lệnh sau

```bash
expo-cli start --tunnel
```

- Tiếp đó nhấn w để chạy trên web.
- Chạy trên thiết bị android thật thì tải app Expo Go rồi scan mã QR
