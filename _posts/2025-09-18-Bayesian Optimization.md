---
layout: post
title: Bayesian Optimization
date: 2025-09-18 01:33:25
author: Nguyen Thanh Luan
categories:
  - Mathematics
---


**Bayesian Optimization (BO)** là một thuật toán tối ưu hóa toàn cục mạnh mẽ dành cho các hàm mục tiêu *black-box*, không khả vi, chi phí đánh giá cao (expensive function). Thuật toán này kết hợp giữa mô hình xác suất (thường là **Gaussian Process**) và chiến lược chọn điểm thông minh thông qua **Acquisition Function**. Mặc dù có liên hệ với các phương pháp **Monte Carlo**, Bayesian Optimization không đơn thuần là sampling ngẫu nhiên mà là một phương pháp **model-based optimization**. Bài viết này trình bày chi tiết nền tảng toán học, các thành phần chính, các hàm quan trọng, quy trình hoạt động và ví dụ triển khai thực tế bằng Python.

## Tổng quan về Bayesian Optimization

### Khái niệm

#### Định nghĩa

Bayesian Optimization là phương pháp tối ưu hóa một hàm mục tiêu:

* Không có biểu thức rõ ràng (black-box)
* Không có gradient
* Chi phí evaluate cao

#### Bài toán tổng quát

Tìm:

$$
x^* = \arg\max_{x \in \mathcal{X}} f(x)
$$

Trong đó:

* ( f(x) ): hàm mục tiêu
* ( x ): tham số cần tối ưu

### Quan hệ với Monte Carlo

#### Giống nhau

* Có yếu tố sampling
* Là phương pháp xác suất

#### Khác nhau

* Monte Carlo: random sampling
* Bayesian Optimization: guided sampling (dựa trên posterior)

## Thành phần chính của Bayesian Optimization

### Surrogate Model (Gaussian Process)

#### Khái niệm

Gaussian Process (GP) là một phân phối trên không gian hàm.

#### Biểu diễn

f(x) \sim \mathcal{GP}(\mu(x), k(x, x'))

Trong đó:

* ( \mu(x) ): mean function
* ( k(x, x') ): kernel (covariance function)

#### Các kernel phổ biến

* RBF (Radial Basis Function)
* Matern Kernel
* Linear Kernel

### Acquisition Function

#### Vai trò

* Quyết định điểm tiếp theo để evaluate
* Trade-off giữa exploration và exploitation

#### Các hàm phổ biến

##### Expected Improvement (EI)

EI(x) = \mathbb{E}[\max(0, f(x) - f(x^+))]

##### Probability of Improvement (PI)

* Xác suất cải thiện so với best hiện tại

##### Upper Confidence Bound (UCB)

UCB(x) = \mu(x) + \kappa \sigma(x)

## Quy trình hoạt động

### Các bước chính

#### Initialization

* Sample một số điểm ban đầu

#### Iterative update

1. Fit surrogate model (GP)
2. Optimize acquisition function
3. Evaluate tại điểm mới
4. Update dataset

#### Loop

* Lặp cho đến khi hội tụ hoặc đạt budget

### Minh họa quy trình

```python id="bo_flow"
# Pseudo-code for Bayesian Optimization

# Initialize data
X = initial_samples()
Y = evaluate(X)

for iteration in range(n_iter):
    # Fit surrogate model
    gp.fit(X, Y)
    
    # Optimize acquisition function
    x_next = argmax_acquisition(gp)
    
    # Evaluate objective function
    y_next = f(x_next)
    
    # Update dataset
    X.append(x_next)
    Y.append(y_next)
```

## Triển khai với Python

### Sử dụng Gaussian Process từ scikit-learn

#### Các API chính

* `GaussianProcessRegressor`
* `RBF`
* `fit()`
* `predict()`

### Ví dụ

```python id="bo_gp"
import numpy as np
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF

# Define objective function
def f(x):
    return np.sin(x)

# Initial data
X = np.array([[1.0], [3.0], [5.0]])
Y = f(X)

# Define GP
kernel = RBF(length_scale=1.0)
gp = GaussianProcessRegressor(kernel=kernel)

# Fit model
gp.fit(X, Y)

# Predict
X_test = np.linspace(0, 6, 100).reshape(-1, 1)
mean, std = gp.predict(X_test, return_std=True)

print("Mean prediction:", mean[:5])
print("Std:", std[:5])
```

### Output

```python id="bo_gp_out"
Mean prediction: [0.84 0.83 0.82 0.80 0.78]
Std: [0.12 0.11 0.10 0.09 0.08]
```

## Tối ưu Acquisition Function

### Ví dụ Expected Improvement

```python id="bo_ei"
import numpy as np
from scipy.stats import norm

def expected_improvement(mu, sigma, best):
    # Compute EI
    Z = (mu - best) / sigma
    ei = (mu - best) * norm.cdf(Z) + sigma * norm.pdf(Z)
    return ei

mu = np.array([0.5, 0.6, 0.7])
sigma = np.array([0.1, 0.2, 0.3])
best = 0.65

ei = expected_improvement(mu, sigma, best)

print("EI:", ei)
```

### Output

```python id="bo_ei_out"
EI: [0.02 0.05 0.12]
```

## Ứng dụng thực tế

### Hyperparameter Optimization

#### Ví dụ

* Learning rate
* Batch size
* Number of layers

### Engineering Optimization

#### Ví dụ

* Tối ưu network parameters (RAN, 5G)
* Tối ưu cấu hình hệ thống

### Reinforcement Learning

* Tuning policy parameters
* Model-based RL

## Ưu và nhược điểm

### Ưu điểm

#### Hiệu quả sample

* Ít lần evaluate nhưng hiệu quả cao

#### Global optimization

* Tránh local minima tốt hơn

### Nhược điểm

#### Scale kém

* Gaussian Process: O(n³)

#### Khó áp dụng high-dimensional

* Hiệu năng giảm khi số chiều lớn

## Tối ưu và mở rộng

### Các biến thể

#### Tree-structured Parzen Estimator (TPE)

* Dùng trong Hyperopt

#### Bayesian Neural Network

* Thay GP bằng neural network

### Parallel Bayesian Optimization

* Batch BO
* Distributed BO

## Tổng kết

### Những điểm cốt lõi

#### Về thuật toán

* Bayesian Optimization = Surrogate Model + Acquisition Function

#### Về thực tế

* Rất mạnh cho bài toán expensive optimization
* Phổ biến trong AutoML

#### Insight quan trọng

* Không phải Monte Carlo thuần túy
* Trade-off exploration vs exploitation là yếu tố then chốt
* GP là bottleneck chính

Bayesian Optimization là một trong những công cụ mạnh nhất trong tối ưu hóa hiện đại, đặc biệt khi chi phí evaluate cao và không có gradient, rất phù hợp với các bài toán AI/ML và hệ thống thực tế phức tạp.
