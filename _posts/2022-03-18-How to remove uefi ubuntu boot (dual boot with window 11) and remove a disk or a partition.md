---
categories:
  - Programming
author: Nguyen Thanh Luan
date: 2022-03-18 22:00:00 +0700
title: How to remove uefi ubuntu boot (dual boot with window 11) and remove a disk or a partition
layout: post
---
Cách để xóa UEFI boot của Ubuntu sau khi cài dual boot Ubuntu với Window 11.  Mặc dù đã gỡ bỏ cài đặt OS ubuntu trên ổ cứng nhưng thư mục boot của Ubuntu vẫn còn đó và khi vào Win có thể hiện ra thông báo (hoặc không) của GRUB bootloader. Cách giải quyết thường là gõ `exit()` là sẽ quay về boot của Window. 

Hướng dẫn dưới đây chỉ cách xóa hoàn toàn cái boot UEFI gây khó chịu cho người OCD :D.
Để gỡ bỏ hoàn toàn cần thực hiện các bước dưới đây:
- Xóa bỏ phân vùng (partition) của hệ điều hành Ubuntu trong ổ cứng
- Xóa UEFI boot của Ubuntu để ngăn GRUB bootloader xuất hiện mỗi khi bật máy tính
Chú ý: Chỉ áp dụng khi cài dual boot nhưng phân vùng Ubuntu và Window ở hai phân vùng riêng biệt, chúng nó chỉ chung bootloader thôi `¯\_(ツ)_/¯`

Sau đây sẽ là hướng dẫn chi tiết
```bash
░░░░░░░░░░░░░░░░░░░░░▄▀░░▌
░░░░░░░░░░░░░░░░░░░▄▀▐░░░▌
░░░░░░░░░░░░░░░░▄▀▀▒▐▒░░░▌
░░░░░▄▀▀▄░░░▄▄▀▀▒▒▒▒▌▒▒░░▌                  For
░░░░▐▒░░░▀▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒█                    Window \'user
░░░░▌▒░░░░▒▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄
░░░░▐▒░░░░░▒▒▒▒▒▒▒▒▒▌▒▐▒▒▒▒▒▀▄
░░░░▌▀▄░░▒▒▒▒▒▒▒▒▐▒▒▒▌▒▌▒▄▄▒▒▐              I love Ubuntu :D
░░░▌▌▒▒▀▒▒▒▒▒▒▒▒▒▒▐▒▒▒▒▒█▄█▌▒▒▌
░▄▀▒▐▒▒▒▒▒▒▒▒▒▒▒▄▀█▌▒▒▒▒▒▀▀▒▒▐░░░▄
▀▒▒▒▒▌▒▒▒▒▒▒▒▄▒▐███▌▄▒▒▒▒▒▒▒▄▀▀▀▀
▒▒▒▒▒▐▒▒▒▒▒▄▀▒▒▒▀▀▀▒▒▒▒▄█▀░░▒▌▀▀▄▄
▒▒▒▒▒▒█▒▄▄▀▒▒▒▒▒▒▒▒▒▒▒░░▐▒▀▄▀▄░░░░▀
▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▄▒▒▒▒▄▀▒▒▒▌░░▀▄
▒▒▒▒▒▒▒▒▀▄▒▒▒▒▒▒▒▒▀▀▀▀▒▒▒▄▀
```

# Xóa phân vùng Ubuntu trên Window

Có nhiều cách để xóa, có thể dùng `disk manager` trên Win để xóa cả phân vùng. Ở đây ta sẽ dùng `diskpart` xóa nhằm mục đích trông nó ngầu hơn.

1. Trước tiên cần mở `Command Promt` với quyền **Administrator** và sử dụng lệnh
```
diskpart
```
để vào ứng dụng `diskpart`. Giới thiệu `diskpart` thì nó là 1 extension - tiện ích sử dụng CLI tích hợp của Microsoft Windows để quản lý các disk, partition và volumn. Nó cho phép người dùng thực hiện các tác vụ như tạo, xóa, định dạng và thay đổi kích thước partition, etc. 

2. Liệt kê các disk đang có trong máy
```cmd
list disk
```
3. Chọn disk chứa phân vùng cài đặt Ubuntu, phần này lưu ý chọn đúng tên disk. Chọn sai là cook.
```
select disk X
```
4. Liệt kê các phân vùng trong disk đã chọn
```bash
list partition
```
Lệnh này được thực hiện, kết quả sẽ cho ra các phân vùng trong disk như sau
```
Partition 1    System    100 MB
Partition 2    Reserved   16 MB
Partition 3    Primary   200 GB
Partition 4    Primary   100 GB
```
và Ubuntu thường nằm ở phân vùng **Primary** kiểu ext4, không có nhãn NTFS.
5. Chọn partition cần xóa bằng lệnh
```
select partition Y
```
X là tên disk, Y là số id của partition cần xóa nhé :3

6.  Cuối cùng xóa phân vùng Y vừa chọn bằng lệnh
```
delete partition override
```
Lệnh `override` hơi nhạy cảm do nó ép xoá luôn, kể cả phân vùng đặc biệt. Thích thì tự search thêm.

7. Thoát `diskpart` bằng lệnh
```
exit
```

# Xóa UEFI bootloader Ubuntu

Mặc dù Ubuntu đã được gỡ khỏi ổ cứng bởi bước trên nhưng khi khởi động lại máy tính, máy tính vẫn có thể bị boot sang Ubuntu và vào GRUB bootloader gây khó chịu. Không khó chịu thì xem hướng dẫn này làm chi :<

Khi đã gỡ Ubuntu nhưng vẫn còn thấy lựa chọn **Ubuntu** trong menu boot, là do:
- Trong **UEFI Boot Manager** (NVRAM) vẫn còn entry của Ubuntu.
- Trong **EFI System Partition** vẫn còn thư mục `ubuntu`.

Vì vậy cần xóa cả **entry** và **file EFI** của Ubuntu. 

#### Bước 1: Xóa entry Ubuntu trong Boot Manager

1. Mở **Command Prompt** với quyền **Administrator**  
    (Start → gõ `cmd` → chuột phải → Run as administrator).
    
2. Liệt kê tất cả các entry boot:
```powershell
bcdedit /enum firmware
```

3. Tìm các entry có `description` là **ubuntu**, ví dụ:
    
    ```
    identifier              {64fe562a-8867-11f0-93d6-806e6f6e6963}
    device                  partition=\Device\HarddiskVolume6
    path                    \EFI\ubuntu\shimx64.efi
    description             ubuntu
    ```
    
4. Xóa entry đó:
    
    ```powershell
    bcdedit /delete {64fe562a-8867-11f0-93d6-806e6f6e6963}
    ```
    
5. Kiểm tra lại:
    
    ```powershell
    bcdedit /enum firmware
    ```
    
    → Không còn thấy “ubuntu” nữa.
####  Bước 2: Xóa thư mục Ubuntu trên EFI Partition

1. Mount EFI partition (thường bị ẩn) thành ổ `S:`
    
    ```powershell
    mountvol S: /s
    ```
    
2. Di chuyển vào thư mục EFI:
    
    ```powershell
    cd /d S:\EFI
    ```
    
3. Liệt kê thư mục:
    
    ```powershell
    dir
    ```
    
    Ta sẽ thấy các folder như:
    
    ```
    Microsoft
    Boot
    ubuntu
    ```
    
4. Xóa thư mục `ubuntu`:
    
    ```powershell
    rmdir /s /q ubuntu
    ```
    
5. Kiểm tra lại bằng `dir` → chỉ còn `Microsoft` và `Boot`.
    
6. Unmount EFI partition (trả lại trạng thái ẩn):
    ```powershell
    mountvol S: /d
    ```

####  Bước 3: Kiểm tra lại trong BIOS/UEFI

- Khởi động lại máy, vào BIOS/UEFI (thường nhấn **F2**, **DEL**, hoặc **F12** khi boot).
- Trong tab **Boot options**, kiểm tra xem còn dòng “ubuntu” không.
- Nếu còn → chọn nó và xóa thủ công (nhiều mainboard cho phép).

# Ý chú?

*Chú ý: Sau khi xóa cái này thì sau này không thể cắm USB vào cài dual boot Ubuntu với Window mà Ubuntu tự động nhận được phân vùng trống nữa nhé :))*

