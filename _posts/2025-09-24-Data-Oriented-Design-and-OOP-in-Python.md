---
layout: post
title: Data Oriented Design and OOP in Python
date: 2025-09-24
author: Nguyen Thanh Luan
categories:
  - Programming
---
Khi làm dự án trên công ty, tôi đã gặp phải một vấn đề khá đau đầu khi xử lý dữ liệu và áp dụng các thuật toán tối ưu lên dữ liệu. Dữ liệu dạng columnar gồm nhiều cột mô tả đặc điểm của các object cần tối ưu, thuật toán điều chỉnh các tham số trong bảng thì sẽ kéo theo các tham số khác bị thay đổi. Mục tiêu làm sao để thu được bộ tham số tối ưu cuối cùng.

Dữ liệu đưa vào có định dạng là `.CSV` với các cột tham số đặc trưng.
Các bước  xử lý dữ liệu gồm:
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

# Xử lý dữ liệu


(tối mai viết tiếp)
















































