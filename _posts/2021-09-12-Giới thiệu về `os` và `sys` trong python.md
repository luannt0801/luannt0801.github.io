---
layout: post
title: Giới thiệu về `os` và `sys` trong python
date: 2020-01-05 10:00:00 +0700
author: Nguyen Thanh Luan
categories:
  - Programming
---


Trong Python, hai thư viện chuẩn `os` và `sys` là những công cụ rất quan trọng giúp lập trình viên tương tác với hệ điều hành và môi trường runtime. Dù đều thuộc standard library, mục đích và phạm vi sử dụng của chúng có sự khác biệt rõ ràng.

- `os`: cung cấp các hàm làm việc với hệ điều hành (file, thư mục, process…)
    
- `sys`: cung cấp thông tin và thao tác liên quan đến Python interpreter
    

---

### Các lệnh thường dùng trong thư viện `os`

#### Làm việc với hệ thống file

- `os.getcwd()`  
    Lấy thư mục làm việc hiện tại.
    
- `os.chdir(path)`  
    Thay đổi thư mục làm việc.
    
- `os.listdir(path='.')`  
    Liệt kê các file/thư mục trong đường dẫn.
    
- `os.mkdir(path)`  
    Tạo thư mục mới.
    
- `os.makedirs(path)`  
    Tạo nhiều thư mục lồng nhau.
    
- `os.remove(path)`  
    Xóa file.
    
- `os.rmdir(path)`  
    Xóa thư mục rỗng.
    

#### Kiểm tra đường dẫn

- `os.path.exists(path)`  
    Kiểm tra tồn tại.
    
- `os.path.isfile(path)`  
    Kiểm tra có phải file không.
    
- `os.path.isdir(path)`  
    Kiểm tra có phải thư mục không.
    
- `os.path.join(a, b)`  
    Nối đường dẫn (portable giữa các OS).
    

#### Làm việc với biến môi trường

- `os.environ`  
    Truy cập biến môi trường.
    
- `os.getenv(key)`  
    Lấy giá trị biến môi trường.
    

#### Thao tác với process

- `os.system(command)`  
    Chạy lệnh shell.
    

---

### Các lệnh thường dùng trong thư viện `sys`

#### Làm việc với tham số dòng lệnh

- `sys.argv`  
    Danh sách các tham số truyền vào script.
    

#### Thoát chương trình

- `sys.exit([code])`  
    Thoát chương trình với mã trạng thái.
    

#### Thông tin về Python interpreter

- `sys.version`  
    Phiên bản Python.
    
- `sys.platform`  
    Hệ điều hành đang chạy.
    
- `sys.executable`  
    Đường dẫn đến Python interpreter.
    

#### Quản lý module

- `sys.path`  
    Danh sách đường dẫn Python dùng để tìm module.
    

#### Input/Output

- `sys.stdin`
    
- `sys.stdout`
    
- `sys.stderr`  
    Các luồng chuẩn để đọc/ghi dữ liệu.
    

---

### Điểm giống nhau giữa `os` và `sys`

#### Đều là thư viện chuẩn

Cả hai đều có sẵn trong Python, không cần cài thêm.

#### Đều liên quan đến hệ thống

- `os`: tương tác trực tiếp với hệ điều hành
    
- `sys`: tương tác với môi trường thực thi Python
    

#### Hỗ trợ lập trình hệ thống

Cả hai thường được dùng trong:

- scripting
    
- automation
    
- devops
    
- xử lý môi trường runtime
    

---

### Điểm khác nhau giữa `os` và `sys`

#### Mục đích chính

- `os`: thao tác với hệ điều hành (file, thư mục, process)
    
- `sys`: thao tác với Python interpreter
    

#### Mức độ tương tác

- `os`: tương tác "bên ngoài" (OS level)
    
- `sys`: tương tác "bên trong" (runtime level)
    

#### Ví dụ minh họa

- Dùng `os`:
    

```python
import os
print(os.listdir('.'))
```

- Dùng `sys`:
    

```python
import sys
print(sys.argv)
```

#### Phạm vi chức năng

|Tiêu chí|os|sys|
|---|---|---|
|File system|Có|Không|
|Environment|Có|Một phần (gián tiếp)|
|Interpreter|Không|Có|
|Command line|Không|Có|
|Process control|Có|Hạn chế|

---

### Khi nào nên dùng `os`, khi nào dùng `sys`

#### Dùng `os` khi:

- Làm việc với file/thư mục
    
- Quản lý đường dẫn
    
- Chạy lệnh hệ thống
    
- Làm việc với biến môi trường
    

#### Dùng `sys` khi:

- Xử lý tham số dòng lệnh
    
- Kiểm soát luồng chương trình
    
- Tương tác với interpreter
    
- Debug hoặc logging (stdout, stderr)
    

---

### Kết luận

Thư viện `os` và `sys` đều rất quan trọng trong Python nhưng phục vụ hai mục đích khác nhau. Nếu cần làm việc với hệ điều hành, hãy dùng `os`. Nếu cần kiểm soát hành vi của chương trình Python hoặc môi trường chạy, hãy dùng `sys`.

Việc hiểu rõ sự khác biệt giữa hai thư viện này sẽ giúp bạn viết code rõ ràng, đúng mục đích và dễ bảo trì hơn.