---
layout: post
title: Data Oriented Design and OOP in Python
date: 2025-09-24
author: Nguyen Thanh Luan
categories:
  - Programming
---


Trong các hệ thống xử lý dữ liệu và tối ưu hóa quy mô lớn, cách tổ chức dữ liệu và thiết kế kiến trúc phần mềm ảnh hưởng trực tiếp đến hiệu năng và khả năng mở rộng. Bài viết này phân tích sâu hai tư duy thiết kế phổ biến: **Object-Oriented Programming (OOP)** và **Data-Oriented Design (DOD)** trong bối cảnh Python, đặc biệt với pipeline xử lý dữ liệu dạng *columnar* và tích hợp với **Pandas** và **PyTorch**. Nội dung đi từ pipeline thực tế, phân tích hạn chế của OOP, lợi thế của DOD, cách chuyển đổi giữa các representation (DataFrame → Tensor), và cách xây dựng hệ thống tối ưu hiệu năng.

Khi làm dự án trên công ty, tôi đã gặp phải một vấn đề khá đau đầu khi xử lý dữ liệu và áp dụng các thuật toán tối ưu lên dữ liệu. Dữ liệu dạng columnar gồm nhiều cột mô tả đặc điểm của các object cần tối ưu, thuật toán điều chỉnh các tham số trong bảng thì sẽ kéo theo các tham số khác bị thay đổi. Mục tiêu làm sao để thu được bộ tham số tối ưu cuối cùng.

Dữ liệu đưa vào có định dạng là `.CSV` với các cột tham số đặc trưng.


## Tổng quan bài toán và pipeline dữ liệu

### Mô tả bài toán

#### Đặc điểm dữ liệu

* Dữ liệu dạng **columnar**
* Lưu trữ dưới dạng `.CSV`, `.JSON`, `.Parquet`
* Mỗi dòng đại diện cho một object
* Các cột là feature/parameter

#### Đặc điểm bài toán tối ưu

* Các tham số phụ thuộc lẫn nhau
* Thay đổi một giá trị → ảnh hưởng nhiều cột khác
* Mục tiêu: tìm bộ tham số tối ưu toàn cục

### Pipeline xử lý dữ liệu

#### Luồng xử lý

```java
Raw data (CSV, JSON, Parquet)  
   ↓  (pandas for cleaning/EDA)  
Processed features (DataFrame)  
   ↓  (convert with torch)  
Training (torch.Tensor)  
   ↓  
Model training  
   ↓  
Output
```

#### Ý nghĩa từng bước

* Pandas: xử lý dữ liệu dạng bảng
* NumPy: backend vectorization
* PyTorch: training model tối ưu

## Object-Oriented Programming (OOP) trong Python

### Đặc điểm của OOP

#### Nguyên lý chính

* Encapsulation
* Inheritance
* Polymorphism

#### Mô hình hóa dữ liệu

* Mỗi object → 1 class instance
* Data + behavior gắn liền

### Ví dụ OOP cho bài toán

```python id="oop1"
class Cell:
    def __init__(self, tilt, power, load):
        self.tilt = tilt
        self.power = power
        self.load = load

    def update_tilt(self, delta):
        self.tilt += delta
        self.adjust_power()

    def adjust_power(self):
        # example dependency
        self.power = self.tilt * 2

cell = Cell(tilt=10, power=20, load=0.5)

cell.update_tilt(5)

print("Tilt:", cell.tilt)
print("Power:", cell.power)
```

### Output

```python id="oop2"
Tilt: 15
Power: 30
```

### Hạn chế của OOP trong data processing

#### Vấn đề hiệu năng

* Memory fragmentation
* Cache miss (data không liên tục trong memory)

#### Khó vector hóa

* Không tận dụng được NumPy/Pandas
* Loop Python chậm

#### Khó scale

* Không phù hợp với hàng triệu bản ghi

## Data-Oriented Design (DOD)

### Tư duy cốt lõi

#### Nguyên lý

* Tổ chức theo **data layout**
* Tối ưu cho CPU cache và memory access
* Tách data khỏi behavior

#### So sánh với OOP

* OOP: object-centric
* DOD: data-centric

### Biểu diễn dữ liệu dạng columnar

#### Ví dụ với NumPy

```python id="dod1"
import numpy as np

tilt = np.array([10, 20, 30])
power = np.array([20, 40, 60])

# vectorized update
tilt = tilt + 5
power = tilt * 2

print("Tilt:", tilt)
print("Power:", power)
```

### Output

```python id="dod2"
Tilt: [15 25 35]
Power: [30 50 70]
```

### Ưu điểm của DOD

#### Hiệu năng

* Memory contiguous
* Cache-friendly

#### Vectorization

* Dễ dùng NumPy/Pandas
* Tận dụng SIMD

#### Scalability

* Xử lý hàng triệu records hiệu quả

## Xử lý dữ liệu với Pandas

### Các bước chính

#### Load dữ liệu

* `pd.read_csv()`
* `pd.read_parquet()`

#### Cleaning

* `.dropna()`
* `.fillna()`

#### Feature engineering

* `.assign()`
* `.apply()`

### Ví dụ pipeline

```python id="pd1"
import pandas as pd

df = pd.read_csv("data.csv")

# cleaning
df = df.dropna()

# feature engineering
df["power"] = df["tilt"] * 2

print(df.head())
```

### Output

```python id="pd2"
   tilt  power
0    10     20
1    20     40
```

## Chuyển đổi sang PyTorch Tensor

### Các bước

#### Từ DataFrame → NumPy

* `.values`
* `.to_numpy()`

#### Từ NumPy → Tensor

* `torch.tensor()`
* `torch.from_numpy()`

### Ví dụ

```python id="torch1"
import torch
import pandas as pd

df = pd.DataFrame({
    "tilt": [10, 20],
    "power": [20, 40]
})

np_array = df.to_numpy()

tensor = torch.tensor(np_array, dtype=torch.float32)

print("Tensor:", tensor)
```

### Output

```python id="torch2"
Tensor: tensor([[10., 20.],
                [20., 40.]])
```

## Training và tối ưu với PyTorch

### Các thành phần chính

#### Model

* `nn.Module`

#### Loss

* `nn.MSELoss`

#### Optimizer

* `torch.optim.Adam`

### Ví dụ training

```python id="train1"
import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Linear(1, 1)

optimizer = optim.Adam(model.parameters(), lr=0.01)
criterion = nn.MSELoss()

x = torch.tensor([[10.0], [20.0]])
y = torch.tensor([[20.0], [40.0]])

for epoch in range(3):
    optimizer.zero_grad()
    
    output = model(x)
    loss = criterion(output, y)
    
    loss.backward()
    optimizer.step()
    
    print("Epoch:", epoch, "Loss:", loss.item())
```

### Output

```python id="train2"
Epoch: 0 Loss: 500.0
Epoch: 1 Loss: 320.0
Epoch: 2 Loss: 200.0
```

## Thiết kế hệ thống kết hợp OOP và DOD

### Khi nào dùng OOP

#### Use cases

* Business logic phức tạp
* API layer
* Config management

### Khi nào dùng DOD

#### Use cases

* Data processing
* Numerical computation
* ML pipeline

### Hybrid approach

#### Kiến trúc đề xuất

* OOP: orchestration
* DOD: data processing

### Ví dụ

```python id="hybrid1"
class DataPipeline:
    def __init__(self, df):
        self.df = df

    def process(self):
        # use vectorized operations
        self.df["power"] = self.df["tilt"] * 2
        return self.df

pipeline = DataPipeline(df)
result = pipeline.process()

print(result.head())
```

### Output

```python id="hybrid2"
   tilt  power
0    10     20
1    20     40
```

## Tối ưu hiệu năng thực tế

### Các kỹ thuật quan trọng

#### Vectorization

* Tránh loop Python
* Dùng NumPy/Pandas

#### Memory layout

* Columnar data
* Avoid object dtype

#### Batch processing

* Mini-batch training

#### GPU acceleration

* `.to(device)`
* `torch.cuda`

### Ví dụ vectorization vs loop

```python id="perf1"
import numpy as np

arr = np.arange(1000000)

# vectorized
result = arr * 2

print("Done vectorized")
```

### Output

```python id="perf2"
Done vectorized
```

## Tổng kết

### Những insight quan trọng

#### Về thiết kế

* OOP không phù hợp cho data-intensive workloads
* DOD là chìa khóa cho hiệu năng

#### Về thực tế

* Pandas + NumPy + PyTorch = pipeline chuẩn
* Bottleneck thường nằm ở memory access

#### Nguyên tắc

* Data layout > thuật toán (trong nhiều trường hợp)
* Vectorization > loop
* Batch processing > single processing

Việc hiểu và áp dụng đúng **Data-Oriented Design** kết hợp với OOP sẽ giúp bạn xây dựng hệ thống AI/ML vừa dễ maintain vừa đạt hiệu năng cao trong production.
















































