---
layout: post
title: Gradient Descent
date: 2021-11-03-19:37:23
author: Nguyen Thanh Luan
categories:
  - AI & ML
---
# Gradient Descent

## Khái niệm
`Gradient descent` is a method for unconstrained mathematical optimization. It is a first-order iterative algorithm for minimizing a differentiable multivariate function.

- *Method for unconstrained mathematical optimization* mô tả việc tối ưu bằng cách tìm sự biến thiên nhằm xác định cực trị của hàm bằng cách xét duyệt các giá trị đầu vào của hàm đó mà không có bất kỳ sự giới hạn nào về ranh giới tìm kiếm, phạm vi của các giá trị đó (sự không ràng buộc). NOTE: Trái ngược là tìm kiếm giá trị tối ưu nằm trong 1 khoảng xác định hoặc giới hạn trong các điều kiện cụ thể.
- *a first-order iterative algorithm* là thuật toán lặp tìm các nghiệm của một hàm bằng cách đạo hàm bậc nhất của hàm đó. Thuật toán cập nhật lại tham số của nó ở mỗi vòng lặp.
 
 `Gradient descent` là thuật toán tối ưu nhằm tìm ra giá trị cực tiểu hoặc thấp nhất của 1 hàm mục tiêu (thường là hàm *loss* hoặc hàm *cost*) bằng cách lặp đi lặp lại việc cập nhật các tham số mô hình theo hướng ngược lại của gradient (hướng dốc nhất xuống) cho đến khi đạt được điểm tối ưu mong muốn.
 ![](/assets/imgs_postPasted%20image%2020251008235033.png)
 

---
**Tài liệu tham khảo:**

Gradient descent
- https://machinelearningcoban.com/2017/01/12/gradientdescent/
- https://en.wikipedia.org/wiki/Gradient_descent#:~:text=Gradient%20descent%20is%20a%20method,Duration%3A%2014%20seconds.
- https://arxiv.org/pdf/1609.04747

Gradient Ascent
- s

Tài liệu khác