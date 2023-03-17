# Hướng dẫn cài đặt

## Cài đặt NodeJS và NPM
Kiểm tra xem máy tính đã cài đặt NodeJS hay chưa sử dụng:
### `node -v`

Nếu chưa cài đặt
### Đối với Windows
Thông thường npm sẽ được cài đặt kèm cùng với NodeJS.\
Tải về NodeJS tại [NodeJS](https://nodejs.org/), chọn bản thích hợp với máy tính và cài đặt như một phần mềm bình thường.\
Sau đó mở Command Prompt và kiểm tra lại.
### `node -v`
### `npm -v`
Nếu đã hiển thị version tức đã cài đặt thành công.
### Đối với Linux
Đầu tiên nên update các package để việc cài đặt không gặp vấn đề:
### `sudo apt-get update`
Cài NodeJS
### `sudo apt install nodejs`
Cài NPM 
### `sudo apt install npm`
Rồi kiểm tra lại tương tự như trên Windows.

## Clone repository về máy

### `git clone [repository_url]`

### `cd [local repository]`

## Chạy dự án

### Chạy phía BE

#### `cd server`
#### `npm install`
#### `npm run server` 

### Chạy phía FE

#### `cd client`
#### `npm install`
#### `npm start`
