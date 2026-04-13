---
layout: post
title: Khái niệm về Ellipsis, Placeholder và Slicing
date: 2024-09-16 20:00:00 +0700
author: Nguyen Thanh Luan
categories:
  - Programming
---

Trong Python, các khái niệm như **Ellipsis (`...`)**, **Placeholder**, và **Slicing** đóng vai trò quan trọng trong việc viết code linh hoạt, dễ mở rộng và tối ưu khi xử lý dữ liệu, đặc biệt trong các thư viện như NumPy, Pandas và PyTorch. Bài viết này trình bày chi tiết bản chất, cách sử dụng, và các tình huống thực tế của từng khái niệm, từ cơ bản đến nâng cao. Nội dung được tổ chức theo từng lĩnh vực sử dụng, kèm theo ví dụ code minh họa và output cụ thể.

## Ellipsis trong Python

### Khái niệm Ellipsis

#### Định nghĩa

**Ellipsis** là một object đặc biệt trong Python, được biểu diễn bằng `...`.

```python id="ell1"
print(type(...))
```

#### Output

```python id="ell2"
<class 'ellipsis'>
```

#### Ý nghĩa

* Là một singleton object (`Ellipsis`)
* Thường dùng trong slicing đa chiều hoặc placeholder

### Ellipsis trong slicing

#### Ngữ cảnh sử dụng

* NumPy arrays
* Tensor trong PyTorch
* DataFrame nhiều chiều

#### Ví dụ với NumPy

```python id="ell3"
import numpy as np

arr = np.arange(24).reshape(2, 3, 4)

# Select all preceding dimensions
result = arr[..., 0]

print("Result:\n", result)
```

#### Output

```python id="ell4"
Result:
 [[ 0  4  8]
 [12 16 20]]
```

#### Giải thích

* `...` đại diện cho tất cả các dimension trước đó
* Tương đương với `arr[:, :, 0]`

### Ellipsis trong function placeholder

#### Ví dụ

```python id="ell5"
def my_function():
    ...
```

#### Ý nghĩa

* Placeholder cho implementation chưa hoàn thành
* Không gây lỗi như `pass` nhưng mang ý nghĩa rõ hơn

## Placeholder trong Python

### Khái niệm Placeholder

#### Định nghĩa

Placeholder là các thành phần dùng để:

* Giữ chỗ cho logic sẽ implement sau
* Giữ structure code

#### Các dạng phổ biến

* `pass`
* `...`
* `NotImplementedError`

### Sử dụng pass

```python id="ph1"
def func():
    pass

print("Function defined successfully")
```

#### Output

```python id="ph2"
Function defined successfully
```

### Sử dụng NotImplementedError

```python id="ph3"
def func():
    raise NotImplementedError("Not implemented yet")

try:
    func()
except NotImplementedError as e:
    print(e)
```

#### Output

```python id="ph4"
Not implemented yet
```

### Placeholder trong class design

```python id="ph5"
class BaseModel:
    def forward(self, x):
        raise NotImplementedError
```

### Ý nghĩa thực tế

#### Khi nào dùng

* Abstract class
* Interface-like design
* API skeleton

## Slicing trong Python

### Khái niệm slicing

#### Định nghĩa

Slicing là kỹ thuật truy cập một phần của sequence:

* List
* Tuple
* String
* NumPy array

#### Cú pháp

```python id="sl1"
sequence[start:stop:step]
```

### Slicing cơ bản

```python id="sl2"
arr = [0, 1, 2, 3, 4, 5]

print(arr[1:4])
print(arr[:3])
print(arr[::2])
```

#### Output

```python id="sl3"
[1, 2, 3]
[0, 1, 2]
[0, 2, 4]
```

### Negative slicing

```python id="sl4"
arr = [0, 1, 2, 3, 4]

print(arr[-3:])
print(arr[::-1])
```

#### Output

```python id="sl5"
[2, 3, 4]
[4, 3, 2, 1, 0]
```

### Slicing với NumPy

```python id="sl6"
import numpy as np

arr = np.arange(9).reshape(3, 3)

print(arr[:, 1])
print(arr[1:, :2])
```

#### Output

```python id="sl7"
[1 4 7]
[[3 4]
 [6 7]]
```

### Slicing vs Copy

#### Ví dụ

```python id="sl8"
import numpy as np

arr = np.array([1, 2, 3, 4])

slice_arr = arr[1:3]

slice_arr[0] = 100

print("Original:", arr)
```

#### Output

```python id="sl9"
Original: [  1 100   3   4]
```

#### Insight

* NumPy slicing trả về **view**
* Không phải copy → ảnh hưởng dữ liệu gốc

## Kết hợp Ellipsis và Slicing

### Ví dụ multi-dimensional

```python id="comb1"
import numpy as np

arr = np.arange(24).reshape(2, 3, 4)

print(arr[..., 1:3])
```

### Output

```python id="comb2"
[[[ 1  2]
  [ 5  6]
  [ 9 10]]

 [[13 14]
  [17 18]
  [21 22]]]
```

### Ý nghĩa

* `...` giúp code ngắn gọn
* Rất hữu ích trong tensor manipulation

## Ứng dụng trong Pandas và PyTorch

### Pandas

#### Ví dụ

```python id="app1"
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3],
    "B": [4, 5, 6]
})

print(df.iloc[:, 0])
```

#### Output

```python id="app2"
0    1
1    2
2    3
Name: A, dtype: int64
```

### PyTorch

```python id="app3"
import torch

tensor = torch.arange(24).reshape(2, 3, 4)

print(tensor[..., 0])
```

#### Output

```python id="app4"
tensor([[ 0,  4,  8],
        [12, 16, 20]])
```

## Best Practices

### Khi sử dụng Ellipsis

#### Nên dùng

* Multi-dimensional data
* Tensor/array manipulation

#### Không nên lạm dụng

* Code khó đọc nếu dùng không đúng ngữ cảnh

### Khi sử dụng Placeholder

#### Ưu tiên

* `raise NotImplementedError` cho abstract method
* `pass` cho empty block

### Khi sử dụng Slicing

#### Lưu ý

* Hiểu rõ view vs copy
* Tránh bug do side-effect

## Tổng kết

### Những điểm quan trọng

#### Ellipsis

* Object đặc biệt
* Dùng trong slicing đa chiều

#### Placeholder

* Giữ chỗ cho logic
* Quan trọng trong design pattern

#### Slicing

* Công cụ mạnh mẽ để xử lý data
* Áp dụng rộng rãi trong NumPy, Pandas, PyTorch

### Insight thực tế

* Ellipsis giúp viết code clean hơn trong deep learning
* Placeholder giúp thiết kế hệ thống scalable
* Slicing là nền tảng của mọi data manipulation

Hiểu rõ ba khái niệm này sẽ giúp bạn viết code Python linh hoạt, hiệu năng cao và dễ maintain hơn, đặc biệt trong các hệ thống xử lý dữ liệu và AI/ML.
