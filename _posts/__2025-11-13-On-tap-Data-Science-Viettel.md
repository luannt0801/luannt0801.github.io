---
layout: post
Author: Nguyen Thanh Luan
Day: 12/11/2025
title: Ôn tập Data Science Viettel
categories:
  - AI & ML
  - Computer Science
date: 12-11-2025
---
Các câu hỏi cần ôn tập
```bash
- Đạo hàm (thường có 1 câu đạo hàm cơ bản, áp dụng chain rule)
- Cosine similarity, euclid distance
- 2,3 câu về tính xác suất (cơ bản giống toán cấp 3)
- 1 câu về đồ thị 
- Các câu về ML (bias, variance, training, finetuning, model, data, ...)
- 2,3 câu về SVM
- 2,3 câu về tree-based algorithm, xgboost, ...
- 1-2 câu về hypothesis test
- L1/L2 regularization
- Activation function
- GAN (cơ bản)
- Các thuật toán sort
- 1-2 caau về thống kê (mean, median,...)
```
# Đạo hàm 

1. Đạo hàm hàm nhiều biến:
- Khi đạo hàm hàm nhiều biến $f(x,y,z)$ thì đạo hàm hàm theo từng biến và coi các biến còn lại là hằng số.
- - Khi đạo hàm hàm nhiều biến $( f(x, y, z) )$, ta đạo hàm theo **từng biến**, coi các biến còn lại là **hằng số**.
  $$
  f_x = \frac{\partial f}{\partial x}, \quad f_y = \frac{\partial f}{\partial y}, \quad f_z = \frac{\partial f}{\partial z}
  $$
- Tìm cực trị của hàm nhiều biến:
	**Tìm cực trị của hàm nhiều biến**:
  1. Tính đạo hàm riêng cấp 1: $( f_x, f_y, f_z )$
  2. Giải hệ $( f_x = 0, f_y = 0, f_z = 0 )$ → tìm điểm tới hạn.
  3. Tính đạo hàm cấp 2:$( f_{xx}, f_{yy}, f_{zz}, f_{xy}, f_{xz}, f_{yz})$
  4. Dùng **định thức Hessian** để xét loại cực trị.
  - $( D > 0, f_{xx} > 0 \Rightarrow)$ cực tiểu
  - $( D > 0, f_{xx} < 0 \Rightarrow )$ cực đại
  - $( D < 0 \Rightarrow )$ điểm yên ngựa
  - $( D = 0 \Rightarrow )$ không kết luận được
2. Đạo hàm chuỗi của hàm (chain rule)
   - Dùng khi đạo hàm **hàm hợp** \( f(g(x)) \)
  \[
  \frac{df}{dx} = f'(g(x)) \cdot g'(x)
  \]
- Mở rộng cho nhiều biến:
  $$
  \frac{df}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt} + \frac{\partial f}{\partial z}\frac{dz}{dt}
  $$
- Dạng tổng quát cho nhiều lớp hàm:
  $$
  y = f(g(h(x))) \Rightarrow \frac{dy}{dx} = f'(g(h(x))) \cdot g'(h(x)) \cdot h'(x)
  $$
3. Gradient Descent (Hướng tăng nhanh nhất của hàm)
   - **Gradient** của hàm \( f(x, y) \):
  $$
  \nabla f = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right)
  $$
- Gradient chỉ hướng **tăng nhanh nhất** của hàm.
- Để **giảm giá trị hàm (tối ưu)**:
  $$
  (x, y) \leftarrow (x, y) - \alpha \nabla f(x, y)
  $$
  trong đó $(\alpha)$ là **learning rate**.
- Gradient Descent dùng trong **machine learning** để tối ưu **hàm mất mát (loss function)**.

# Xác suất thống kê
- Xác suất cổ điển: tổ hợp, chỉnh hợp, giai thừa, ...
- Các hàm xác suất hiện đại:
  - **Hàm khối xác suất (PMF)** cho biến rời rạc \( X \):  
  $( P(X = x_i) )$
- **Hàm mật độ xác suất (PDF)** cho biến liên tục \( X \):  
  $( f(x) \ge 0, \int f(x)dx = 1)$
- **Hàm phân phối tích lũy (CDF)**:  
  $( F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)dt)$
- Thống kê: mean, variance, standard
  - **Trung bình (Mean)**:
  $$
  \bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i
  $$
- **Phương sai (Variance)**:
  $$
  \sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2
  $$
- **Độ lệch chuẩn (Standard deviation)**:
  $$
  \sigma = \sqrt{\sigma^2}
  $$
# Machine learning
### Bias
- Sai lệch giữa giá trị dự đoán trung bình và giá trị thật.
- Bias cao → mô hình **underfitting** (quá đơn giản).
### Variance- Độ nhạy của mô hình với dữ liệu huấn luyện.
- Variance cao → mô hình **overfitting** (học thuộc dữ liệu).
## Training / Finetune / Model / Data
- **Training:** huấn luyện mô hình từ đầu bằng dữ liệu.
- **Finetune:** tinh chỉnh mô hình có sẵn (pretrained) trên dữ liệu mới.
- **Model:** kiến trúc thuật toán học (Linear, CNN, Transformer...).
- **Data:** chất lượng và số lượng dữ liệu quyết định hiệu quả mô hình.
### SVM (2-3 câu)
- Thuật toán phân loại tìm **siêu phẳng (hyperplane)** tốt nhất tách các lớp dữ liệu.
- Mục tiêu: **tối đa hóa khoảng cách (margin)** giữa các lớp.
- Có thể dùng **kernel trick** để tách lớp trong không gian phi tuyến.
### Tree-based, algorithm, xgboost (2-3 câu)
- **Decision Tree:** chia dữ liệu theo điều kiện (feature threshold).
- **Random Forest:** trung bình nhiều cây → giảm variance.
- **XGBoost:** tối ưu hóa gradient boosting, có regularization → mạnh, hiệu quả cao.
  Mô hình XGBoost dự đoán:
$$
\hat{y}_i = \sum_{k=1}^K f_k(x_i), \quad f_k \in \mathcal{F}
$$

Trong đó:
- $( \mathcal{F})$ là tập hợp các cây quyết định
- K là số lượng cây
- Mỗi cây $( f_k)$ dự đoán giá trị đóng góp cho kết quả cuối cùng

Hàm mất mát tối ưu hóa:
$$
\mathcal{L}(\phi) = \sum_i l(y_i, \hat{y}_i) + \sum_k \Omega(f_k)
$$

Với:
- $( l)$ là hàm lỗi (MSE, Log Loss,…)
- $( \Omega(f))$ là regularization term giúp giảm overfitting
### L1/L2
- Dùng để giảm overfitting.
  - **L1 (Lasso):** phạt theo \(|w|\), làm mất bớt feature (sparse model).
  - **L2 (Ridge):** phạt theo \(w^2\), giảm trọng số lớn (ổn định hơn).
### Activation
- Hàm kích hoạt phi tuyến giúp mạng neuron học quan hệ phức tạp:
  - Sigmoid: $( \frac{1}{1+e^{-x}})$
  - Tanh: $( \tanh(x))$
  - ReLU: $( \max(0, x))$
  - Softmax: chuyển giá trị thành xác suất.
### GAN (cơ bản)
1. [Bài này khá hay](https://nttuan8.com/bai-1-gioi-thieu-ve-gan/)
2. [Pham dinh khanh](https://phamdinhkhanh.github.io/2020/07/13/GAN.html) 

- Gồm **Generator** (tạo dữ liệu giả) và **Discriminator** (phân biệt thật – giả).
- Hai mạng huấn luyện đối kháng nhau:
  - Generator cố gắng “đánh lừa” Discriminator.
  - Discriminator cố gắng nhận biết dữ liệu thật.
- Kết quả: Generator sinh dữ liệu giả **rất giống thật**.

# Ôn tập: Các Optimizer trong Machine Learning / Deep Learning

## I. Khái niệm
- **Optimizer** là thuật toán dùng để **cập nhật trọng số (weights)** của mô hình nhằm **giảm hàm mất mát (loss function)**.
- Mục tiêu: tìm cực tiểu của hàm \( L(\theta) \), trong đó \( \theta \) là các tham số của mô hình.

Cập nhật tổng quát:
$$
\theta_{t+1} = \theta_t - \eta \cdot \nabla_\theta L(\theta_t)
$$
với:
- \( \eta \): learning rate (tốc độ học)
- \( \nabla_\theta L \): gradient theo trọng số.

## II. Các loại Optimizer phổ biến

### 1. **Gradient Descent (GD)**
- Cập nhật toàn bộ dữ liệu trong mỗi bước (batch = toàn bộ dataset).
- Công thức:
  $$
  \theta_{t+1} = \theta_t - \eta \cdot \frac{1}{n} \sum_{i=1}^{n} \nabla_\theta L_i(\theta)
  $$
- Nhược điểm:
  - Chậm với dữ liệu lớn.
  - Dễ mắc kẹt ở local minima.

### 2. **Stochastic Gradient Descent (SGD)**
- Cập nhật trọng số sau **mỗi mẫu dữ liệu**:
  $$
  \theta_{t+1} = \theta_t - \eta \cdot \nabla_\theta L_i(\theta)
  $$
- Ưu điểm:
  - Nhanh, phù hợp với dữ liệu lớn.
  - Có thể “nhảy” qua local minima do tính ngẫu nhiên.
- Nhược điểm:
  - Dao động mạnh, không ổn định.

### 3. **Mini-Batch Gradient Descent**
- Cập nhật theo **nhóm nhỏ (batch)** gồm `m` mẫu.
- Cân bằng giữa GD và SGD: hiệu quả và ổn định hơn.

### 4. **Momentum**
- Thêm quán tính để giảm dao động khi cập nhật:
  $$
  v_t = \beta v_{t-1} + (1 - \beta) \nabla_\theta L(\theta)
  $$
  $$
  \theta_{t+1} = \theta_t - \eta v_t
  $$
- Ý tưởng: giống như quả bóng lăn, tiếp tục đi theo hướng đã đi trước đó.
- Tham số $\beta$ thường ≈ 0.9.

### 5. **Nesterov Accelerated Gradient (NAG)**
- Cải tiến Momentum: **dự đoán vị trí tương lai** trước khi tính gradient.
  $$
  v_t = \beta v_{t-1} + \eta \nabla_\theta L(\theta - \beta v_{t-1})
  $$
- Giúp tăng tốc hội tụ và tránh vượt quá cực tiểu.

### 6. **Adagrad**
- Tự động điều chỉnh learning rate cho từng tham số:
  $$
  G_t = G_{t-1} + (\nabla_\theta L)^2
  $$
  $$
  \theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{G_t + \epsilon}} \nabla_\theta L
  $$
- Ưu điểm:
  - Học nhanh ban đầu.
  - Phù hợp với dữ liệu thưa (sparse data).
- Nhược điểm:
  - Learning rate giảm quá nhanh → chậm hội tụ về sau.

### 7. **RMSProp**
- Khắc phục nhược điểm của Adagrad bằng **làm trơn trung bình động**:
  $$
  E[g^2]_t = \beta E[g^2]_{t-1} + (1 - \beta) (\nabla_\theta L)^2
  $$
  $$
  \theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{E[g^2]_t + \epsilon}} \nabla_\theta L
  $$
- Ổn định hơn khi training RNNs, CNNs.

---

### 8. **Adam (Adaptive Moment Estimation)**
- Kết hợp **Momentum + RMSProp**.
- Cập nhật:
  $$
  m_t = \beta_1 m_{t-1} + (1 - \beta_1) \nabla_\theta L
  $$
  $$
  v_t = \beta_2 v_{t-1} + (1 - \beta_2) (\nabla_\theta L)^2
  $$
  (Hiệu chỉnh bias)
  $$
  \hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}
  $$
  $$
  \theta_{t+1} = \theta_t - \frac{\eta \hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
  $$
- Tham số mặc định:
  - $( \beta_1 = 0.9)$
  - $( \beta_2 = 0.999)$
  - $( \epsilon = 10^{-8})$
- **Là optimizer mặc định phổ biến nhất** trong deep learning.

---

### 9. **AdamW**
- Biến thể của Adam thêm **Weight Decay (L2 regularization)**:
  $$
  \theta_{t+1} = \theta_t - \eta \left( \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda \theta_t \right)
  $$
- Giúp tránh overfitting, ổn định hơn trong huấn luyện transformer.

### 10. **Nadam**
- Kết hợp **Nesterov + Adam**.
- Hiệu quả hơn một chút so với Adam trong một số trường hợp.
### 11. **AdaMax**
- Biến thể của Adam dùng **norm vô hạn (∞-norm)** thay vì L2.
- Giúp ổn định khi gradient lớn.
### 12. **AMSGrad**
- Biến thể của Adam tránh giảm learning rate quá nhanh.
- Giữ giá trị cực đại của \( v_t \) thay vì giá trị hiện tại.


| Optimizer | Learning Rate tự động | Momentum | Ưu điểm | Nhược điểm |
|------------|------------------------|-----------|----------|-------------|
| **SGD** | ❌ | ❌ | Đơn giản, dễ hiểu | Dễ mắc kẹt local minima |
| **SGD + Momentum** | ❌ | ✅ | Nhanh hơn, ổn định | Cần tinh chỉnh tham số |
| **NAG** | ❌ | ✅ | Dự đoán tốt hơn | Tốn tính toán hơn |
| **Adagrad** | ✅ | ❌ | Phù hợp dữ liệu thưa | LR giảm quá nhanh |
| **RMSProp** | ✅ | ❌ | Ổn định với RNN | Cần chọn β phù hợp |
| **Adam** | ✅ | ✅ | Phổ biến, hiệu quả cao | Dễ overfit nếu LR quá lớn |
| **AdamW** | ✅ | ✅ | Có regularization | Tối ưu Transformer, CNN |
| **Nadam** | ✅ | ✅ | Cải thiện Adam nhẹ | Không đáng kể trong hầu hết case |


- **Adam / AdamW**: lựa chọn mặc định trong hầu hết các bài toán DL.
- **SGD + Momentum**: dùng khi muốn kiểm soát kỹ quá trình tối ưu (ví dụ CNN, ResNet).
- **RMSProp**: tốt cho RNN, LSTM.
- **Adagrad**: tốt cho dữ liệu thưa, bài toán NLP cũ.
- **Nadam**: biến thể nâng cấp của Adam.

# Lập trình
Các thuật toán sort

| Thuật toán                 | Độ phức tạp trung bình | Mô tả                                         |
| -------------------------- | ---------------------- | --------------------------------------------- |
| Bubble Sort                | $(O(n^2))$             | So sánh cặp liền kề và đổi chỗ nếu sai thứ tự |
| Selection Sort             | $(O(n^2))$             | Chọn phần tử nhỏ nhất và đưa về đầu dãy       |
| Insertion Sort             | $(O(n^2))$             | Chèn phần tử vào vị trí đúng trong dãy đã sắp |
| Merge Sort                 | $(O(n \log n))$        | Chia đôi dãy và gộp lại theo thứ tự           |
| Quick Sort                 | $(O(n \log n))$        | Chọn pivot và chia dãy nhỏ hơn/lớn hơn        |
| Heap Sort                  | $(O(n \log n))$        | Dựa trên cấu trúc heap (cây nhị phân)         |
| Counting/Radix/Bucket Sort | $(O(n))$               | Dành cho dữ liệu nguyên hoặc giới hạn phạm vi |

Đồ thị

|Thuật toán|Mục tiêu|Ghi chú|
|---|---|---|
|**Dijkstra**|Tìm đường đi ngắn nhất (đồ thị có trọng số dương).|Dùng heap hoặc priority queue.|
|**Bellman-Ford**|Tìm đường đi ngắn nhất (có thể có cạnh âm).|Chậm hơn Dijkstra.|
|**Floyd–Warshall**|Tìm đường đi ngắn nhất giữa mọi cặp đỉnh.|Dùng lập bảng quy hoạch động.|
|**Kruskal**|Tìm cây khung nhỏ nhất (MST).|Dựa trên sắp xếp cạnh.|
|**Prim**|Tìm cây khung nhỏ nhất (MST).|Dựa trên mở rộng dần tập đỉnh.|
|**Topological Sort**|Sắp xếp các đỉnh có hướng theo thứ tự phụ thuộc.|Dùng DFS hoặc BFS.|

