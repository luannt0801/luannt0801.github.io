---
layout: post
title: Note C code :v
date: 08-11-2025
author: Nguyen Thanh Luan
categories:
  - Programming
---
# Lưu lại note ôn tập cơ bản về C code :v

Lưu lại hoy :<

---

sizeof(5.2) = 8. Kích thước kiểu double trong C

char c='\08'; Lỗi biên dịch

Đoạn mã return &a: Trả về giá trị rác do yêu cầu trả về của biến đã bị hủy

In bao nhiêu lần: Tới khi tràn stack. **Trên lý thuyết**, nó sẽ in **vô hạn lần**. **Trên thực tế**, chương trình sẽ bị **lỗi tràn stack (Stack Overflow)** sau một số lần nhất định, tùy vào kích thước bộ nhớ stack của hệ thống.

Đoạn mã (for k=0; k<10…) có gặp lỗi biên dịch: Không gặp lỗi

Kết quả đoạn "ptr = "sanfoundry": Lỗi segmentation fault -Lỗi ghi đè vùng nhớ cấp phát động 

Chương trình *ptr1=10; *ptr2=free(ptr1) in gì: Lỗi biên dịch.

Hàm `free(ptr1)` **giải phóng bộ nhớ** mà `ptr1` trỏ đến. **`free()` không trả về giá trị** (nó có kiểu `void`), nhưng ở đây lại cố gán kết quả của `free(ptr1)` vào `ptr2`, gây **lỗi biên dịch**.

Chương trình {1,2,3,4}: In ra 10 1

Chương trình sizeof(ptr): Lỗi biên dịch do biến `ptr` được khai báo hai lần với hai kiểu con trỏ khác nhau (`int*` và `double*)`

Chương trình a+1==1: In ra 0,2,2

Chương trình memcpy(ptr,"sanfoundry",11): Lỗi segmentation fault do không cấp phát bộ nhớ trước khi sử dụng `memcpy()`

---

MSB và LSB
Bigendian and little endian
volatile
Phân biệt *++a và ++*a
a=[10,20,30]

---
Ngoài ra cần ôn tập về các phép toán với bit
AND/OR/XOR
NAND/NOR
 với littleendian
"<<": dịch trái thì tăng 2^ số lần dịch
">>": dịch phải thì giảm 2^ số lần dịch

---
Các kiểu biến, kiểu dữ liệu trong C và giới hạn của các kiểu dữ liệu để tránh overflow

Hiểu về stack và heap, cách tổ chức dữ liệu và gọi các biến từ ROM lên RAM khi chạy, lưu trữ và gọi các biến lên stack như nào?
cấp phát động và heap, ...
malloc()
calloc()
new()

---
Một vài câu hỏi note by Luân:
![](/assets/imgs_post/Pasted%20image%2020251108104205.png)
![](/assets/imgs_post/Pasted%20image%2020251108104221.png)
![](/assets/imgs_post/Pasted%20image%2020251108104228.png)
![](/assets/imgs_post/Pasted%20image%2020251108104236.png)
![](/assets/imgs_post/Pasted%20image%2020251108104258.png)![](/assets/imgs_post/Pasted%20image%2020251108104242.png)
![](/assets/imgs_post/Pasted%20image%2020251108104329.png)

---

Một vài trang web ôn tập C:
- [one](https://www.geeksforgeeks.org/c/c-programming-language/)
- [two](https://www.w3schools.com/c/c_intro.php)
- [three](https://www.programiz.com/c-programming)
- [giải các bài tập easy-medium](https://leetcode.com/)
Lâu quá r nên bị mất dấu nhiều trang r :<
Sau này sẽ cập nhật ...

GOOD LUCK TO YOU!! ✧⁺⸜(･ ᗜ ･ )⸝⁺✧
```bash
⠀⢿⣾⣿⣿⡄⠀⢼⡉⠉⠉⣉⣈⣠⣤⣴⣿⡿⠛⠛⠛⠿⠿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⡿⠋⠁⠄⠀⠀⠀⠀⠠⡀⠘⢿⣿⣿⣶⣶⡄⠙⣄⠀⠀⠙⠋⠁⠀
⡀⠀⠉⠛⠋⠀⢀⡞⠁⢸⣷⣿⣿⣿⡿⠋⠁⠀⠀⠉⠉⠂⠠⢄⠉⢻⢿⣿⣿⣿⣿⣿⣿⡟⠉⠀⠈⠀⠀⠀⠀⠀⠀⠀⠈⢆⠈⢻⣿⣿⣿⣿⣦⣉⠓⠦⢤⣤⣶⡞
⢉⠓⠢⠤⠴⠂⢋⣀⣶⣿⣿⣿⣿⠏⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠑⣄⠘⢿⣿⣿⣿⣿⡿⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⢹⣿⣿⣿⣿⣿⣿⣶⡄⠀⡏⠀
⣿⣿⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢀⠈⢻⣿⣿⠏⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠣⠈⢻⣿⣿⣿⣿⣿⣿⣟⡀⠻⡀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢆⠀⢻⡟⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠁⡀⠻⢿⣿⣿⣿⣿⣿⣿⡀⠱
⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⢃⠐⠁⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠈⠂⠄⢉⠛⠻⢿⣿⣿⣿⣤
⣿⣿⣿⣿⠿⠟⠋⠁⠀⠂⠁⠀⠀⡄⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⡀⠄⠀⠀⠀⠀⠀⠀⠀⠒⢤⡈⠻⢿⣿
⣿⣿⠋⠁⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⡦⡺⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢄⠙⣿
⣿⠁⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠠⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠂⠄⠂⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠘⠀⠙
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⢠⠡⠀⠀⠀⢀⠀⠀⠠⠇⠀⠀⠀⠀⠀⠀⠀⡘⡠⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠷⠀⡄⠀⠀⠀⠀⠀⠀⠀⢀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠥⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠥⡁⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠠⠀⠀⠀⠀⢰⠀⣉
⣶⡇⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⣐⠃⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⡀⠀⠀⠀⠀⡠⠁⢰⣿
⣿⣿⣄⠐⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠁⠀⠀⠀⠀⠀⠀⠀⠑⡄⠀⠀⠀⠀⠀⠀⠀⠐⡀⠀⠀⠀⠀⠀⠀⠀⡀⠠⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠊⢀⣴⣿⣿
⣿⣿⣿⣷⣤⡈⠂⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠅⢆⠀⠀⠀⡠⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠐⣉⣠⣾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣶⣤⣈⡐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠐⠀⠀⠀⠀⠀⠀⠄⠀⣁⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⢀⠀⠠⠀⠓⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠤⠀⠀⠁⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡿⠟⠛⠁⠀⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠠⠤⡉⠙⠻⠿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⠋⡤⠊⠀⠀⡀⠀⠀⠀⠀⠘⠢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠦⢈⠛⠿⣿⣿⣿⣿
⣿⣿⠁⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⣀⠄⠥⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠦⡈⠻⣿⣿
⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⡠⢒⠅⠁⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⢦⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢆⠈⣿
⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠂⠀⠀⠜⡃⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢂⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠘⠀⢼
⣀⡀⠄⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⣠⠇⠁⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠘
⣿⣧⡀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠉⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⡆⠀⢀⠀⠄⠀⠀⠀⠀⡜⢀⣷
⣿⣿⣿⣦⣌⡀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⠀⠀⠀⠀⠀⣠⠀⣀⣼⣿
⣿⣿⣿⣿⣿⣿⣿⣶⣤⣁⠠⡀⠀⠀⠁⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⢀⡀⠀⠐⣈⣠⣶⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡈⢂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠐⡀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⢁⣠⣶⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⢠⠂⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠃⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡘⠂⠀⠀⠀⠀⠀⠀⠀⢀⠐⠠⠀⠀⠀⠀⠀⠀⢠⠀⠱⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠌⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡾⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣀⠐⠀⠀⠒⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⣺⣿⣄⠈⠢⠀⠀⠀⠀⠀⠀⠀⠠⠊⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⢀⠃⢠⣿⣿⣿⣿⣶⣤⣀⡀⠒⠐⠒⢈⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠁⠀⠀⠀⠀⠀⡈⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⢠⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢀⠀⠀⠀⠀⠀⠀⢀⠁⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⢀⠂⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠠⠂⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣾⣼⣿⣯⣿⣿⣿⣾⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠠⠀⣀⡀⢀⡼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣿⣿
```