---
layout: post
title: NumPy
date: 2022-04-25
author: Nguyen Thanh Luan
categories:
  - Programming
---

**NumPy (Numerical Python)** là thư viện nền tảng cho tính toán khoa học trong Python, cung cấp cấu trúc dữ liệu mạnh mẽ *ndarray* (N-dimensional array) cùng tập hợp các hàm tối ưu cao cho xử lý số học, đại số tuyến tính, thống kê, và xử lý mảng đa chiều. NumPy là backbone của hầu hết các thư viện như Pandas, SciPy, scikit-learn và PyTorch. Bài viết này trình bày toàn diện các nhóm chức năng của NumPy, từ array manipulation, broadcasting, indexing, đến linear algebra, random, và tối ưu hiệu năng, kèm ví dụ code và output minh họa.

## Cấu trúc dữ liệu ndarray

### Khái niệm ndarray

#### Định nghĩa

`ndarray` là cấu trúc dữ liệu đa chiều, lưu trữ các phần tử cùng kiểu dữ liệu (*homogeneous*), được tối ưu hóa về memory và tốc độ.

#### Thuộc tính quan trọng

* `.shape`
* `.ndim`
* `.dtype`
* `.size`

### Ví dụ

```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

print("Array:")
print(arr)

print("Shape:", arr.shape)
print("Dimensions:", arr.ndim)
print("Data type:", arr.dtype)
print("Size:", arr.size)
```

### Output

```python
Array:
[[1 2 3]
 [4 5 6]]

Shape: (2, 3)
Dimensions: 2
Data type: int64
Size: 6
```

## Tạo mảng (Array Creation)

### Các hàm cơ bản

#### Nhóm tạo mảng thủ công

* `np.array()`
* `np.asarray()`

#### Nhóm tạo mảng đặc biệt

* `np.zeros()`
* `np.ones()`
* `np.empty()`
* `np.full()`

#### Nhóm tạo dãy số

* `np.arange()`
* `np.linspace()`

### Ví dụ

```python
import numpy as np

a = np.zeros((2, 2))
b = np.ones((2, 2))
c = np.arange(0, 10, 2)
d = np.linspace(0, 1, 5)

print("zeros:\n", a)
print("ones:\n", b)
print("arange:", c)
print("linspace:", d)
```

### Output

```python
zeros:
 [[0. 0.]
  [0. 0.]]

ones:
 [[1. 1.]
  [1. 1.]]

arange: [0 2 4 6 8]
linspace: [0.   0.25 0.5  0.75 1.  ]
```

## Indexing và Slicing

### Các phương thức truy cập

#### Basic indexing

* `arr[i]`
* `arr[i, j]`

#### Slicing

* `arr[start:stop:step]`

#### Boolean indexing

* `arr[arr > value]`

### Ví dụ

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

print("Element at index 2:", arr[2])
print("Slice:", arr[1:4])
print("Boolean indexing:", arr[arr > 3])
```

### Output

```python
Element at index 2: 3
Slice: [2 3 4]
Boolean indexing: [4 5]
```

## Broadcasting

### Khái niệm

Broadcasting cho phép thực hiện phép toán giữa các mảng khác shape mà không cần copy dữ liệu.

### Quy tắc

* So sánh từ chiều cuối
* Nếu bằng nhau hoặc = 1 thì hợp lệ

### Ví dụ

```python
import numpy as np

a = np.array([[1], [2], [3]])
b = np.array([10, 20, 30])

result = a + b

print(result)
```

### Output

```python
[[11 21 31]
 [12 22 32]
 [13 23 33]]
```

## Array Manipulation

### Các hàm quan trọng

#### Thay đổi shape

* `reshape()`
* `ravel()`
* `flatten()`

#### Ghép và tách mảng

* `np.concatenate()`
* `np.vstack()`
* `np.hstack()`
* `np.split()`

### Ví dụ

```python
import numpy as np

arr = np.arange(6)

reshaped = arr.reshape(2, 3)

print("Reshaped:\n", reshaped)

split_arr = np.split(arr, 3)
print("Split:", split_arr)
```

### Output

```python
Reshaped:
 [[0 1 2]
  [3 4 5]]

Split: [array([0, 1]), array([2, 3]), array([4, 5])]
```

## Universal Functions (ufunc)

### Khái niệm

Ufunc là các hàm vectorized hoạt động element-wise trên ndarray.

### Các hàm phổ biến

* `np.add()`
* `np.subtract()`
* `np.multiply()`
* `np.divide()`
* `np.sqrt()`
* `np.exp()`
* `np.log()`

### Ví dụ

```python
import numpy as np

arr = np.array([1, 4, 9])

print("sqrt:", np.sqrt(arr))
print("exp:", np.exp(arr))
```

### Output

```python
sqrt: [1. 2. 3.]
exp: [  2.71828183  54.59815003 8103.08392758]
```

## Thống kê (Statistics)

### Các hàm chính

* `np.mean()`
* `np.median()`
* `np.std()`
* `np.var()`
* `np.min()`, `np.max()`

### Ví dụ

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

print("Mean:", np.mean(arr))
print("Std:", np.std(arr))
print("Max:", np.max(arr))
```

### Output

```python
Mean: 3.0
Std: 1.4142135623730951
Max: 5
```

## Linear Algebra

### Module

* `np.linalg`

### Các hàm quan trọng

* `np.dot()`
* `np.matmul()`
* `np.linalg.inv()`
* `np.linalg.det()`
* `np.linalg.eig()`

### Ví dụ

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])

inv_A = np.linalg.inv(A)
det_A = np.linalg.det(A)

print("Inverse:\n", inv_A)
print("Determinant:", det_A)
```

### Output

```python
Inverse:
 [[-2.   1. ]
  [ 1.5 -0.5]]
Determinant: -2.0
```

## Random Module

### Module

* `np.random`

### Các hàm chính

* `np.random.rand()`
* `np.random.randn()`
* `np.random.randint()`
* `np.random.choice()`
* `np.random.seed()`

### Ví dụ

```python
import numpy as np

np.random.seed(42)

print("Random uniform:", np.random.rand(3))
print("Random normal:", np.random.randn(3))
print("Random integers:", np.random.randint(0, 10, 3))
```

### Output

```python
Random uniform: [0.37454012 0.95071431 0.73199394]
Random normal: [ 0.49671415 -0.1382643   0.64768854]
Random integers: [6 3 7]
```

## File I/O

### Các hàm chính

* `np.save()`
* `np.load()`
* `np.savetxt()`
* `np.loadtxt()`

### Ví dụ

```python
import numpy as np

arr = np.array([1, 2, 3])

np.save("data.npy", arr)

loaded = np.load("data.npy")

print("Loaded:", loaded)
```

### Output

```python
Loaded: [1 2 3]
```

## Tối ưu hiệu năng

### Các kỹ thuật quan trọng

#### Vectorization

* Tránh loop Python
* Sử dụng ufunc

#### Memory efficiency

* Sử dụng dtype phù hợp
* Tránh copy không cần thiết

#### Broadcasting

* Giảm overhead

### Ví dụ

```python
import numpy as np

arr = np.arange(1000000)

result = arr * 2  # vectorized operation

print("First 5 elements:", result[:5])
```

### Output

```python
First 5 elements: [0 2 4 6 8]
```

## Tổng kết

### Những gì cần nắm vững

* ndarray và các thuộc tính
* Indexing và slicing
* Broadcasting
* Array manipulation
* Ufunc và vectorization
* Linear algebra và statistics
* Random và file I/O

### Insight thực tế

* NumPy là nền tảng của toàn bộ hệ sinh thái scientific Python
* Hiệu năng cao nhờ implement bằng C
* Vectorization là chìa khóa tối ưu
* Nên tránh loop Python khi xử lý dữ liệu lớn

NumPy là công cụ không thể thiếu cho bất kỳ Data Scientist, AI Engineer hay Software Engineer nào khi làm việc với dữ liệu số và tính toán hiệu năng cao trong Python.
