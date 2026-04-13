---

layout: post
title: PyTorch: RNN, Transformer, Reinforcement Learning, optimize GPU & Distributed
date: 2022-1-15 23:00:00 +0700
author: Nguyen Thanh Luan
categories:

* Programming

---


## Advanced Topics trong PyTorch (RNN, Transformer, Reinforcement Learning, tối ưu GPU & Distributed)

### Recurrent Neural Network (RNN) trong PyTorch

#### Tổng quan về RNN

RNN được thiết kế để xử lý dữ liệu chuỗi (*sequence data*) như:

* Natural Language Processing (NLP)
* Time Series
* Speech Recognition

Các biến thể phổ biến:

* `nn.RNN`
* `nn.LSTM`
* `nn.GRU`

#### Các hàm và lớp quan trọng

* `nn.RNN(input_size, hidden_size, num_layers)`
* `nn.LSTM(...)`
* `nn.GRU(...)`
* Hidden state: `h_0`, `c_0`

#### Ví dụ sử dụng LSTM

```python
import torch
import torch.nn as nn

# Define LSTM model
class LSTMModel(nn.Module):
    def __init__(self):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size=3, hidden_size=5, num_layers=1, batch_first=True)
        self.fc = nn.Linear(5, 1)

    def forward(self, x):
        out, (h_n, c_n) = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return out

model = LSTMModel()

# Dummy input: batch=1, seq_len=4, features=3
x = torch.randn(1, 4, 3)
output = model(x)

print("Input shape:", x.shape)
print("Output:", output)
```

#### Output

```python
Input shape: torch.Size([1, 4, 3])
Output: tensor([[0.13]], grad_fn=<AddmmBackward>)
```

### Transformer trong PyTorch

#### Tổng quan Transformer

Transformer là kiến trúc chính trong các mô hình hiện đại:

* BERT
* GPT
* Vision Transformer (ViT)

Thành phần chính:

* Self-Attention
* Multi-head Attention
* Positional Encoding

#### Các module quan trọng

* `nn.Transformer`
* `nn.MultiheadAttention`
* `nn.TransformerEncoder`
* `nn.TransformerDecoder`

#### Ví dụ Multi-Head Attention

```python
import torch
import torch.nn as nn

embed_dim = 8
num_heads = 2

mha = nn.MultiheadAttention(embed_dim, num_heads, batch_first=True)

# batch=1, seq_len=3, embed_dim=8
x = torch.rand(1, 3, 8)

attn_output, attn_weights = mha(x, x, x)

print("Attention output:", attn_output)
print("Attention weights:", attn_weights)
```

#### Output

```python
Attention output: tensor([...])
Attention weights: tensor([...])
```

### Reinforcement Learning (RL) với PyTorch

#### Tổng quan RL

RL gồm các thành phần:

* Agent
* Environment
* Reward
* Policy

Các thuật toán phổ biến:

* Q-Learning
* Deep Q Network (DQN)
* Policy Gradient
* Actor-Critic

#### Ví dụ đơn giản: Q-Learning với Neural Network

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Simple Q-network
class QNet(nn.Module):
    def __init__(self):
        super(QNet, self).__init__()
        self.fc = nn.Linear(4, 2)

    def forward(self, x):
        return self.fc(x)

model = QNet()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# Dummy state
state = torch.randn(1, 4)

# Forward
q_values = model(state)

print("Q-values:", q_values)
```

#### Output

```python
Q-values: tensor([[0.45, -0.12]], grad_fn=<AddmmBackward>)
```

### Tối ưu GPU trong PyTorch

#### Quản lý memory

* `torch.cuda.empty_cache()`
* `torch.no_grad()`
* Mixed Precision: `torch.cuda.amp`

#### Ví dụ Mixed Precision

```python
import torch
from torch.cuda.amp import autocast, GradScaler

model = torch.nn.Linear(10, 1).cuda()
optimizer = torch.optim.Adam(model.parameters())

scaler = GradScaler()

x = torch.randn(16, 10).cuda()
y = torch.randn(16, 1).cuda()

with autocast():
    output = model(x)
    loss = ((output - y) ** 2).mean()

scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()

print("Loss:", loss.item())
```

#### Output

```python
Loss: 0.532
```

### Distributed Training trong PyTorch

#### Tổng quan

Distributed training giúp:

* Scale model lớn
* Training nhanh hơn
* Sử dụng nhiều GPU/machine

#### Các API chính

* `torch.distributed.init_process_group`
* `DistributedDataParallel (DDP)`
* `torch.multiprocessing`

#### Ví dụ cơ bản DDP

```python
import torch
import torch.nn as nn
from torch.nn.parallel import DistributedDataParallel as DDP

def setup():
    torch.distributed.init_process_group(backend='nccl')

def main():
    setup()
    
    model = nn.Linear(10, 1).cuda()
    model = DDP(model)

    x = torch.randn(4, 10).cuda()
    y = model(x)

    print("Output:", y)

if __name__ == "__main__":
    main()
```

#### Output

```python
Output: tensor([...], device='cuda:0')
```

### Tối ưu hiệu năng thực tế

#### Kỹ thuật quan trọng

* Gradient Accumulation
* Data Parallel vs Distributed Data Parallel
* Prefetch data với DataLoader
* Pin memory (`pin_memory=True`)
* Increase `num_workers`

#### Ví dụ DataLoader tối ưu

```python
from torch.utils.data import DataLoader

loader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4,
    pin_memory=True
)

for batch in loader:
    print("Batch loaded")
```

#### Output

```python
Batch loaded
Batch loaded
...
```

### Tổng kết Advanced

#### Những gì cần nắm vững

* Sequence modeling: RNN/LSTM/GRU
* Attention & Transformer
* Reinforcement Learning cơ bản
* GPU optimization & mixed precision
* Distributed training (DDP)

#### Insight thực tế

* Transformer gần như thay thế RNN trong NLP hiện đại
* Mixed precision giúp tăng tốc đáng kể trên GPU
* DDP là tiêu chuẩn production (không dùng DataParallel)
* Bottleneck thường nằm ở data pipeline, không phải model

Nếu bạn đang làm AI Engineer hoặc Research, việc hiểu sâu các phần này sẽ quyết định hiệu năng hệ thống và khả năng scale mô hình của bạn.
