---
categories:
  - Programming
author: Nguyen Thanh Luan
date: 2022-03-18 22:00:00 +0700
title: How to remove uefi ubuntu boot (dual boot with window 11) and remove a disk or a partition
layout: post
---
https://www.veeble.com/kb/uninstall-ubuntu-from-dual-boot-in-windows-in-uefi-system/

I see what you did — you ran:

```
bcdedit /enum firmware
```

and noticed **multiple boot entries**, including two for **Ubuntu**. Then you deleted one (`{64fe5629-8867-11f0-93d6-806e6f6e6963}`), but you still have another one left:

```
identifier              {64fe562a-8867-11f0-93d6-806e6f6e6963}
device                  partition=\Device\HarddiskVolume6
path                    \EFI\ubuntu\shimx64.efi
description             ubuntu
```

That means there are still Ubuntu boot entries in your firmware (UEFI NVRAM).

---

✅ If your goal is to **remove Ubuntu completely from the boot menu**:

1. Identify all `ubuntu` entries:
    
    ```
    bcdedit /enum firmware
    ```
    
2. Delete the leftover one:
    
    ```
    bcdedit /delete {64fe562a-8867-11f0-93d6-806e6f6e6963}
    ```
    
3. Verify cleanup:
    
    ```
    bcdedit /enum firmware
    ```
    
    The `ubuntu` entry should no longer appear.
    

---

⚠️ Important note:  
Even if you remove the entries from the firmware boot manager, the **actual Ubuntu EFI files** (`\EFI\ubuntu\shimx64.efi` etc.) may still remain on your EFI System Partition. If you want to clean those up too:

- Mount the EFI partition in Windows:
    
    ```
    mountvol S: /s
    ```
    
- Go to:
    
    ```
	cd /d S:\EFI
    ```
    
- Delete the `ubuntu` folder:
    
    ```
    rmdir /s S:\EFI\ubuntu
    ```
    

(⚠️ Be careful — only delete the `ubuntu` folder, not `Microsoft` or `Boot`.)

Ah, I see what happened 🙂

You mounted the EFI System Partition to `S:` correctly with:

```
mountvol S: /s
```

But then you typed:

```
S:\EFI
```

which Windows thinks is a command. In Windows, you need to **change directory** (`cd`) into it or open it in Explorer.

Here’s how you can properly navigate and delete the Ubuntu EFI folder:

---

### 1. Go to the EFI partition

```
cd /d S:\EFI
```

(The `/d` switch ensures it switches drives as well as directories.)

---

### 2. List the contents

```
dir
```

You should see folders like:

```
Microsoft
Boot
ubuntu
```

---

### 3. Delete only the Ubuntu folder

```
rmdir /s /q ubuntu
```

- `/s` → removes all files and subfolders
    
- `/q` → quiet mode (no confirmation prompts)
    

---

### 4. Double-check cleanup

```
dir
```

You should only see `Microsoft` and `Boot` left (don’t delete those!).

---

### 5. Unmount EFI partition (optional, but recommended)

```
mountvol S: /d
```

This makes the EFI partition hidden again (as it normally should be).

---

👉 At this point, both the **firmware boot entry** (via `bcdedit /delete`) and the **EFI files** for Ubuntu are gone. Your system will be Windows-only.

Do you want me to also show you how to **double-check in UEFI firmware (BIOS settings)** that no leftover “ubuntu” boot options remain?


---


Bạn muốn dùng **diskpart** để xoá hẳn một phân vùng (partition).  
⚠️ Lưu ý trước khi làm:

- Xoá partition = mất toàn bộ dữ liệu trong đó, không thể khôi phục bằng cách thông thường.
    
- Nếu đó là phân vùng hệ thống (Windows đang chạy, EFI, Recovery) → máy có thể **không khởi động được**.
    
- Hãy chắc chắn partition bạn xoá là **phân vùng Linux/Ubuntu** hoặc phân vùng bạn không cần nữa.
    

---

### Các bước xoá phân vùng bằng Diskpart

1. Mở Command Prompt với quyền **Administrator**.
    
    ```
    diskpart
    ```
    
2. Liệt kê các ổ đĩa:
    
    ```
    list disk
    ```
    
    Xác định đúng số ổ đĩa (Disk 0, Disk 1, …).
    
3. Chọn ổ đĩa chứa phân vùng Ubuntu:
    
    ```
    select disk X
    ```
    
    (thay `X` bằng số ổ đĩa, thường là `0` nếu chỉ có một ổ cứng).
    
4. Liệt kê phân vùng:
    
    ```
    list partition
    ```
    
    Bạn sẽ thấy các phân vùng, ví dụ:
    
    ```
    Partition 1    System    100 MB
    Partition 2    Reserved   16 MB
    Partition 3    Primary   200 GB
    Partition 4    Primary   100 GB
    ```
    
    Ubuntu thường nằm ở phân vùng **Primary** kiểu ext4, không có nhãn NTFS.
    
5. Chọn phân vùng cần xoá:
    
    ```
    select partition Y
    ```
    
    (thay `Y` bằng số partition của Ubuntu).
    
6. Xoá phân vùng:
    
    ```
    delete partition override
    ```
    
    - `override` → ép xoá luôn, kể cả phân vùng đặc biệt.
        
7. Thoát Diskpart:
    
    ```
    exit
    ```
    

---

### Sau khi xoá phân vùng

- Phân vùng sẽ biến thành **Unallocated Space**.
    
- Nếu muốn, bạn có thể gộp nó vào ổ C: bằng **Disk Management** trong Windows (`diskmgmt.msc`).
    

---

👉 Bạn có muốn mình chỉ luôn cách **xoá đúng phân vùng Ubuntu mà không ảnh hưởng tới EFI và Windows Recovery** không?