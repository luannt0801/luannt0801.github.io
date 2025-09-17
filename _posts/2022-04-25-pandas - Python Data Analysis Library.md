---
layout: post
title: pandas - Python Data Analysis Library
date: 2022-04-25
author: Nguyen Thanh Luan
categories:
  - Programming
---
# Pandas in python


## 2. Các hàm thường dùng

Hàm `groupby`

```python
def groupby(
    self,
    by=None,
    axis: Axis | lib.NoDefault = lib.no_default,
    level: IndexLabel | None = None,
    as_index: bool = True,
    sort: bool = True,
    group_keys: bool = True,
    observed: bool | lib.NoDefault = lib.no_default,
    dropna: bool = True,
)
```

#### Các tham số:

- **`by`**  
    Cách nhóm dữ liệu. Có thể là:
    - Tên cột (string)
    - List các cột
    - Array cùng độ dài với dataframe
    - Function (áp dụng trên index để nhóm)
- **`axis`**
    - Mặc định = 0 (nhóm theo hàng).
    - Nếu = 1 thì nhóm theo cột.
    - `Axis | lib.NoDefault` nghĩa là: type hint `axis` là `Axis` hoặc một “marker” `lib.no_default` (tránh nhầm lẫn với `None`).
- **`level`**
    - Nếu DataFrame có MultiIndex, bạn có thể nhóm theo level cụ thể.
    - Ví dụ: `df.groupby(level=0)` nhóm theo level 0 của index.
- **`as_index` (bool, mặc định True)**
    - Nếu `True`: key nhóm sẽ trở thành index của kết quả.
    - Nếu `False`: key nhóm sẽ trở thành cột bình thường.
- **`sort` (bool, mặc định True)**
    - Nếu `True`: các group sẽ được sắp xếp.
    - Nếu `False`: giữ nguyên thứ tự xuất hiện.
- **`group_keys` (bool, mặc định True)**
    - Nếu `True`: thông tin group sẽ thêm vào kết quả (khi dùng `apply`).
    - Nếu `False`: không thêm.
- **`observed`**
    - Áp dụng khi group theo **cột dạng categorical**.
    - Nếu `True`: chỉ giữ lại các categories thực sự xuất hiện.
    - Nếu `False`: giữ tất cả categories (kể cả không có trong dữ liệu).
- **`dropna` (bool, mặc định True)**
    - Nếu `True`: các nhóm có giá trị `NaN` trong key sẽ bị bỏ qua.
    - Nếu `False`: vẫn giữ nhóm NaN.

