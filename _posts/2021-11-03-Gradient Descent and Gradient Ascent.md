---
layout: post
title: Gradient Descent and Gradient Ascent
date: 2021-11-03-19:37:23
author: Nguyen Thanh Luan
categories:
  - AI & ML
---
# 1. Gradient Descent

## 1.1 Khái niệm
`Gradient descent` is a method for unconstrained mathematical optimization. It is a first-order iterative algorithm for minimizing a differentiable multivariate function.

- *Method for unconstrained mathematical optimization* mô tả việc tối ưu bằng cách tìm sự biến thiên nhằm xác định cực trị của hàm bằng cách xét duyệt các giá trị đầu vào của hàm đó mà không có bất kỳ sự giới hạn nào về ranh giới tìm kiếm, phạm vi của các giá trị đó (sự không ràng buộc). NOTE: Trái ngược là tìm kiếm giá trị tối ưu nằm trong 1 khoảng xác định hoặc giới hạn trong các điều kiện cụ thể.
- *a first-order iterative algorithm* là thuật toán lặp tìm các nghiệm của một hàm bằng cách đạo hàm bậc nhất của hàm đó. Thuật toán cập nhật lại tham số của nó ở mỗi vòng lặp.
 
 `Gradient descent` là thuật toán tối ưu nhằm tìm ra giá trị cực tiểu hoặc thấp nhất của 1 hàm mục tiêu (thường là hàm *loss* hoặc hàm *cost*) bằng cách lặp đi lặp lại việc cập nhật các tham số mô hình theo hướng ngược lại của gradient (hướng dốc nhất xuống) cho đến khi đạt được điểm tối ưu mong muốn.
 
![](/assets/imgs_post/Pasted image 20251119001215.png)

## 1.2 Phương pháp
`Gradient descent` thường được dùng để tìm ra **giá trị cực tiểu** của một hàm mục tiêu (thường là _loss function_ hoặc _cost function_) bằng cách:

1. Khởi tạo các tham số ở giá trị bất kỳ.
2. Tính **gradient** của hàm tại vị trí hiện tại.
3. Cập nhật tham số theo hướng **ngược lại gradient** — đây là hướng mà hàm giảm nhanh nhất.
4. Lặp lại cho đến khi hội tụ.
### **Công thức cập nhật tham số**
$$  
\theta \leftarrow \theta - \alpha , \nabla_\theta J(\theta)  
$$

Trong đó:
- $\theta$ : tham số mô hình
- $J(\theta)$: hàm mục tiêu
- $\nabla_\theta J(\theta)$: gradient
- $\alpha$: _learning rate_ — tốc độ học, điều chỉnh bước nhảy

## 1.3 Ứng dụng trong machine learning

### Gradient Descent là nền tảng để huấn luyện hầu hết các mô hình học máy hiện đại:

- Linear Regression
- Logistic Regression
- Neural Networks (Deep Learning)
- SVM
- Các mô hình tối ưu hóa dựa trên gradient khác

### **Một số biến thể của Gradient Descent**

Các biến thể được sử dụng tùy theo quy mô dữ liệu và đặc điểm bài toán:
- **Batch Gradient Descent**
- **Stochastic Gradient Descent (SGD)**
- **Mini-Batch Gradient Descent**
- **Momentum**
- **Adam, RMSProp, Adagrad,…**

# 2. Gradient Ascent

## **2.1 Khái niệm**

**Gradient Ascent** là một thuật toán tối ưu hóa được sử dụng để **tìm giá trị cực đại** của một hàm số khả vi nhiều biến. Đây là thuật toán **ngược lại** với Gradient Descent: thay vì đi theo hướng giảm nhanh nhất của hàm, Gradient Ascent **đi theo hướng tăng nhanh nhất**.

> _Gradient ascent is an optimization algorithm that finds the maximum of a function by iteratively moving in the direction of the steepest ascent, as indicated by the gradient._

Gradient Ascent thường được sử dụng trong các bài toán mà ta muốn **tối đa hóa** một hàm mục tiêu, chẳng hạn:
- log-likelihood trong các mô hình thống kê
- hàm reward trong reinforcement learning
- hàm đánh giá trong tối ưu hóa

## **2.2 Phương pháp**

Tương tự Gradient Descent nhưng ngược hướng, thuật toán Gradient Ascent thực hiện các bước:

![](/assets/imgs_post/Pasted image 20251119004951.png)

1. Khởi tạo tham số ở giá trị bất kỳ.
2. Tính **gradient** của hàm tại tham số hiện tại.
3. Cập nhật tham số theo **hướng cùng chiều gradient** — đây là hướng mà hàm tăng nhanh nhất.
4. Lặp lại cho đến khi hội tụ về cực đại.

### **Công thức cập nhật tham số**

$$  
\theta \leftarrow \theta + \alpha , \nabla_\theta J(\theta)  
$$

Trong đó:
- $\theta$: tham số mô hình
- $J(\theta)$: hàm mục tiêu cần **tối đa hóa**
- $\nabla_\theta J(\theta)$: gradient của hàm
- $\alpha$: _learning rate_ — tốc độ học

> Điểm khác biệt duy nhất so với Gradient Descent là **cộng** thay vì trừ.

## **2.3 Ứng dụng trong Machine Learning**

Gradient Ascent được dùng trong các bài toán cần **tối đa hóa** một hàm thay vì tối thiểu hóa.
### **Một số ứng dụng tiêu biểu:**
- **Maximum Likelihood Estimation (MLE)**  
    Tối đa hóa hàm log-likelihood của mô hình thống kê như:
    - Logistic Regression (dạng tối đa hóa likelihood)
    - Gaussian Mixture Models
    - Naive Bayes
- **Reinforcement Learning**  
    Tối đa hóa hàm **reward**, ví dụ:
    - Policy Gradient
    - REINFORCE
    - Actor-Critic
- **Information Theory / NLP**  
    Tối đa hóa mutual information hoặc likelihood.
- **Economics / Optimization**  
    Tối đa hóa lợi nhuận, hiệu suất hoặc giá trị của hàm tiện ích.
## **2.4 Các biến thể của Gradient Ascent**

Tương tự Gradient Descent, Gradient Ascent cũng có các biến thể phổ biến:

- **Batch Gradient Ascent**
- **Stochastic Gradient Ascent (SGA)**
- **Mini-Batch Gradient Ascent**
- **Momentum Ascent**
- **Adam (ở dạng tối đa hóa)**
- **RMSProp, Adagrad,… (dạng ascent)**

# **3. So sánh Gradient Descent vs Gradient Ascent**


| Thuật toán       | Mục tiêu     | Công thức cập nhật                                            |
| ---------------- | ------------ | ------------------------------------------------------------- |
| Gradient Descent | Tìm cực tiểu | $$\theta \leftarrow \theta - \alpha \nabla_\theta J(\theta)$$ |
| Gradient Ascent  | Tìm cực đại  | $$\theta \leftarrow \theta + \alpha \nabla_\theta J(\theta)$$ |

**Quan hệ giữa Gradient Descent và Gradient Ascent**

Hai thuật toán thực chất là một, chỉ khác nhau ở mục tiêu.

Tối đa hóa một hàm $J(\theta)$:

$$  
\theta \leftarrow \theta + \alpha \nabla_\theta J(\theta)  
$$

Tối thiểu hóa một hàm $J(\theta)$ tương đương với tối đa hóa $-J(\theta)$:

$$  
\theta \leftarrow \theta - \alpha \nabla_\theta J(\theta)  
$$


Do đó, mọi bài toán cực đại có thể chuyển thành cực tiểu và ngược lại.

---
**Tài liệu tham khảo:**

Gradient descent
- https://machinelearningcoban.com/2017/01/12/gradientdescent/
- https://en.wikipedia.org/wiki/Gradient_descent#:~:text=Gradient%20descent%20is%20a%20method,Duration%3A%2014%20seconds.
- https://arxiv.org/pdf/1609.04747

Gradient Ascent
- [https://en.wikipedia.org/wiki/Gradient_descent#Gradient_ascent](https://en.wikipedia.org/wiki/Gradient_descent#Gradient_ascent)
- [https://arxiv.org/abs/1609.04747](https://arxiv.org/abs/1609.04747)
- Các tài liệu reinforcement learning (Sutton & Barto)

