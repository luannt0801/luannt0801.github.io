---

layout: post
title: Thư viện Pytorch - basic
date: 2022-10-23 21:32:00 +0700
author: Nguyen Thanh Luan
categories:

* Programming

---


**PyTorch** là một thư viện mã nguồn mở mạnh mẽ dành cho **Deep Learning** và **Machine Learning**, được phát triển bởi Facebook AI Research (FAIR). Thư viện này nổi bật với khả năng xây dựng đồ thị tính toán động (*dynamic computation graph*), hỗ trợ GPU mạnh mẽ và hệ sinh thái phong phú cho nghiên cứu lẫn triển khai thực tế. Bài viết này trình bày toàn diện về PyTorch, từ kiến trúc, tensor, autograd, neural network, đến các module nâng cao như data handling, optimization, distributed training. Mỗi phần đều đi kèm các hàm quan trọng và ví dụ code chi tiết với output minh họa.


## Tổng quan về PyTorch

PyTorch gồm 3 thành phần chính:

* **Tensor computation (torch)**
* **Automatic differentiation (autograd)**
* **Deep learning modules (torch.nn)**

Đặc điểm nổi bật:

* Dynamic graph (khác với static graph của TensorFlow 1.x)
* Debug dễ dàng như Python thông thường
* GPU acceleration với CUDA
* Ecosystem mạnh: TorchVision, TorchText, TorchAudio


## Tensor trong PyTorch

Tensor là cấu trúc dữ liệu cốt lõi, tương tự numpy array nhưng hỗ trợ GPU.

### Các hàm cơ bản

* `torch.tensor()`
* `torch.zeros()`
* `torch.ones()`
* `torch.rand()`
* `torch.arange()`
* `torch.reshape()`
* `torch.view()`

### Ví dụ

```python
import torch

# Create tensors
a = torch.tensor([1, 2, 3])
b = torch.ones(3)
c = torch.rand(3)

print("a:", a)
print("b:", b)
print("c:", c)

# Operations
d = a + b
print("a + b:", d)

# Reshape
e = torch.arange(6).view(2, 3)
print("reshaped tensor:\n", e)
```

### Output

```
a: tensor([1, 2, 3])
b: tensor([1., 1., 1.])
c: tensor([0.23, 0.67, 0.11])

a + b: tensor([2., 3., 4.])

reshaped tensor:
 tensor([[0, 1, 2],
         [3, 4, 5]])
```


## Autograd (Automatic Differentiation)

Autograd tự động tính gradient cho backpropagation.

### Hàm quan trọng

* `requires_grad=True`
* `backward()`
* `grad`

### Ví dụ

```python
import torch

# Create tensor with gradient tracking
x = torch.tensor(2.0, requires_grad=True)

# Define function
y = x**2 + 3*x + 1

# Backpropagation
y.backward()

print("x:", x)
print("y:", y)
print("dy/dx:", x.grad)
```

### Output

```
x: tensor(2., requires_grad=True)
y: tensor(11., grad_fn=<AddBackward0>)
dy/dx: tensor(7.)
```


## Neural Network với torch.nn

Module `torch.nn` cung cấp các layer và loss function.

### Các lớp phổ biến

* `nn.Linear`
* `nn.Conv2d`
* `nn.ReLU`
* `nn.Softmax`
* `nn.CrossEntropyLoss`

### Ví dụ: Mạng Neural đơn giản

```python
import torch
import torch.nn as nn

# Define model
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(2, 3)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(3, 1)

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleNN()

# Input
x = torch.tensor([[1.0, 2.0]])
output = model(x)

print("Model output:", output)
```

### Output

```
Model output: tensor([[0.52]], grad_fn=<AddmmBackward>)
```


## Loss Function

Các hàm loss phổ biến:

* `nn.MSELoss`
* `nn.CrossEntropyLoss`
* `nn.BCELoss`

### Ví dụ

```python
import torch
import torch.nn as nn

criterion = nn.MSELoss()

pred = torch.tensor([2.5])
target = torch.tensor([3.0])

loss = criterion(pred, target)
print("Loss:", loss)
```

### Output

```
Loss: tensor(0.25)
```


## Optimizer

Dùng để cập nhật trọng số.

### Các optimizer phổ biến

* `torch.optim.SGD`
* `torch.optim.Adam`
* `torch.optim.RMSprop`

### Ví dụ

```python
import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Linear(1, 1)

optimizer = optim.SGD(model.parameters(), lr=0.01)

# Dummy data
x = torch.tensor([[1.0]])
y = torch.tensor([[2.0]])

# Training step
for i in range(3):
    optimizer.zero_grad()
    
    output = model(x)
    loss = (output - y)**2
    
    loss.backward()
    optimizer.step()
    
    print(f"Step {i}, Loss:", loss.item())
```

### Output

```
Step 0, Loss: 1.23
Step 1, Loss: 0.87
Step 2, Loss: 0.61
```


## Data Handling (torch.utils.data)

### Thành phần chính

* `Dataset`
* `DataLoader`

### Ví dụ

```python
import torch
from torch.utils.data import Dataset, DataLoader

# Custom dataset
class MyDataset(Dataset):
    def __init__(self):
        self.data = [(i, i*2) for i in range(5)]

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx]

dataset = MyDataset()
loader = DataLoader(dataset, batch_size=2, shuffle=True)

for batch in loader:
    print(batch)
```

### Output

```
[tensor([2, 4]), tensor([4, 8])]
[tensor([1, 3]), tensor([2, 6])]
[tensor([0]), tensor([0])]
```


## GPU Acceleration

### Hàm quan trọng

* `torch.cuda.is_available()`
* `.to(device)`

### Ví dụ

```python
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

x = torch.tensor([1.0, 2.0]).to(device)

print("Device:", device)
print("Tensor:", x)
```

### Output

```
Device: cuda
Tensor: tensor([1., 2.], device='cuda:0')
```

## Saving & Loading Model

### Hàm chính

* `torch.save()`
* `torch.load()`

### Ví dụ

```python
import torch
import torch.nn as nn

model = nn.Linear(2, 1)

# Save model
torch.save(model.state_dict(), "model.pth")

# Load model
model.load_state_dict(torch.load("model.pth"))

print("Model loaded successfully")
```

### Output

```
Model loaded successfully
```


## Distributed Training

### Module

* `torch.distributed`
* `DistributedDataParallel (DDP)`

### Ý nghĩa

* Training trên nhiều GPU / nhiều node
* Tăng tốc training cho large-scale models


## Ecosystem của PyTorch

### Các thư viện liên quan

* TorchVision (computer vision)
* TorchText (NLP)
* TorchAudio (speech)



## Tổng kết

PyTorch là một framework mạnh mẽ, linh hoạt và dễ sử dụng cho cả nghiên cứu và production. Với hệ sinh thái phong phú và khả năng mở rộng cao, PyTorch hiện là lựa chọn hàng đầu trong cộng đồng AI/ML.


[Chapter 2: Advanced Topics trong PyTorch (RNN, Transformer, Reinforcement Learning, tối ưu GPU & Distributed)](/_posts/2022-10-21-Pytorch%20with%20RNN-Transformer-RL-optimize-GPU-distributed.md)
