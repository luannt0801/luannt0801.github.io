---
layout: post
title: Statistical Probability
date: 23-12-2022
author: Nguyen Thanh Luan
categories:
  - Mathematics
---
Xác suất – thống kê là ngành nghiên cứu các hiện tượng ngẫu nhiên, từ mô tả sự bất định đến suy luận về quy luật ẩn sau dữ liệu.

Trong _xác suất – thống kê cổ điển_, trọng tâm là các mô hình lý thuyết dựa trên giả định đối xứng và không gian mẫu hữu hạn, nơi xác suất được định nghĩa như tỉ lệ số trường hợp thuận lợi trên tổng số trường hợp có thể, tiêu biểu trong các bài toán xúc xắc, lá bài hay mô hình xác suất phân phối chuẩn, Poisson… Đây là nền tảng cho nhiều phương pháp thống kê suy diễn như ước lượng tham số, kiểm định giả thuyết hay phân tích phương sai.

Ngược lại, _xác suất – thống kê hiện đại_ mở rộng mạnh mẽ cách tiếp cận này, sử dụng hệ thống tiên đề Kolmogorov, lý thuyết độ đo, mô hình ngẫu nhiên phức tạp, phân tích Bayes, học máy và xử lý dữ liệu lớn, cho phép mô tả các hiện tượng phi tuyến, phụ thuộc hoặc biến động theo thời gian. 

Tổng quan lại, xác suất – thống kê là công cụ cốt lõi để hiểu và ra quyết định trong điều kiện không chắc chắn; nó giúp dự đoán, tối ưu hóa và định lượng rủi ro trong khoa học, kỹ thuật, kinh tế, y sinh và nhiều lĩnh vực khác, đóng vai trò then chốt trong thế kỷ dữ liệu ngày nay.

# Xác suất cổ điển

Xác suất thống kê cổ điển tập trung vào các mô hình, phương pháp và định lý nền tảng dùng để suy luận từ mẫu sang tổng thể trong những điều kiện giả định lý tưởng. Các loại thống kê chủ đạo gồm **thống kê mô tả** (tính trung bình, phương sai, độ lệch chuẩn…), **thống kê suy diễn** (ước lượng điểm, ước lượng khoảng tin cậy) và **kiểm định giả thuyết** với các kiểm định quen thuộc như _t-test_, _z-test_, _chi-square_, _ANOVA_, _F-test_ hay kiểm định phi tham số như _Mann–Whitney_ và _Kolmogorov–Smirnov_.

Hệ thống giả thuyết thường biểu diễn dưới dạng ($H_0$) (giả thuyết gốc) và ($H_1$) (giả thuyết thay thế), kèm theo các khái niệm sai lầm loại I, loại II và độ mạnh kiểm định. Nền tảng lý thuyết của xác suất cổ điển được xây dựng trên các định lý nổi tiếng như **Luật số lớn**, **Định lý giới hạn trung tâm**, **Định lý Bayes** trong dạng cổ điển, và các mô hình phân phối kinh điển như **phân phối chuẩn**, **Poisson**, **Binomial**, **Exponential**, **Gamma**, cùng các mô hình hồi quy tuyến tính cổ điển (OLS) dựa trên giả định nhiễu Gaussian độc lập. Toàn bộ hệ thống này tạo nên khung lý thuyết vững chắc cho việc phân tích dữ liệu, kiểm tra giả thuyết và rút ra kết luận khoa học về các hiện tượng ngẫu nhiên.

## 1. Khái niệm xác suất cổ điển

Xác suất cổ điển là một định nghĩa xác suất dựa trên tỉ lệ giữa số kết quả thuận lợi cho một biến cố và tổng số kết quả có thể xảy ra của một phép thử, khi tất cả các kết quả đó đều đồng khả năng
$$
P(A) = \frac{n(A)}{n(\Omega)}
$$
trong đó, $n(A)$ là số kết quả thuận lợi cho biến cố A và $n(\Omega)$ là tổng số kết quả có thể xảy ra của phép thử.
## 2. Tính chất cơ bản
 
- Xác suất của một biến cố luôn nằm trong khoảng từ 0 đến 1: $0 \leq P(A) \leq 1$
- Nếu hai biến cố A và B xung khắc, thì xác suất hợp của chúng bằng tổng xác suất của từng biến cố: $P(A \cup B) = P(A) + P(B)$
- Xác suất của biến cố đối (biến cố A không xảy ra) là: $P(A)
# Xác suất hiện đại


- $f(x)=2πσ2​1​exp(−2σ2(x−μ)2​)$
- **Ứng dụng:** tự nhiên, tài chính, noise trong ML, CLT (định lý giới hạn trung tâm).

# Poison

# Student

# Bernoulli

# Exponential

