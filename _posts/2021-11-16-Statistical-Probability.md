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

## 2. Không gian mẫu và biến cố

- **Phép thử ngẫu nhiên**: phép thử có kết quả không thể dự đoán chính xác trước khi thực hiện  
- **Không gian mẫu** \(\Omega\): tập hợp tất cả các kết quả có thể xảy ra của phép thử  
- **Biến cố** A: một tập con của \(\Omega\)

Phân loại biến cố:
- Biến cố chắc chắn: \(A = \Omega\)  
- Biến cố không thể: \(A = \varnothing\)  
- Biến cố đơn: chỉ gồm một kết quả  
- Biến cố phức: gồm nhiều kết quả  
## 3. Tính chất cơ bản & các phép toán

**Tính chất cơ bản**
 
- Xác suất của một biến cố luôn nằm trong khoảng từ 0 đến 1: $0 \leq P(A) \leq 1$
- Nếu hai biến cố A và B xung khắc, thì xác suất hợp của chúng bằng tổng xác suất của từng biến cố: $P(A \cup B) = P(A) + P(B)$
- Xác suất của biến cố đối (biến cố A không xảy ra) là: $P(\overline{\rm A}) = 1 - P(A)$ 

**Các phép toán với xác suất**

- **Hợp** của A và B:  
$$
A \cup B = \{ \omega : \omega \in A \text{ hoặc } \omega \in B \}
$$

- **Giao** của A và B:  
$$
A \cap B = \{ \omega : \omega \in A \text{ và } \omega \in B \}
$$

- **Biến cố đối** của A:  
$$
\overline{A} = \Omega \setminus A
$$

- Hai biến cố **xung khắc** nếu:  
$$
A \cap B = \varnothing
$$
**Quy tắc cộng xác suất**

- Với hai biến cố bất kỳ A và B:
$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

- Nếu A và B xung khắc:
$$
P(A \cup B) = P(A) + P(B)
$$
**Quy tắc nhân xác suất**

- Xác suất giao của hai biến cố được xác định bởi:
$$
P(A \cap B) = P(A) \cdot P(B \mid A)
$$
- Tổng quát cho nhiều biến cố:
$$
P(A_1 \cap A_2 \cap \cdots \cap A_n)
= P(A_1) \cdot P(A_2 \mid A_1) \cdots P(A_n \mid A_1 \cap \cdots \cap A_{n-1})$$
**Xác suất có điều kiện**

- Xác suất của B khi đã biết A xảy ra:
$$
P(B \mid A) = \frac{P(A \cap B)}{P(A)}, \quad P(A) > 0
$$
Ý nghĩa: đo mức độ khả năng xảy ra của B trong điều kiện A đã xảy ra.

**Biến cố độc lập**
- Hai biến cố A và B **độc lập** nếu:
$$
P(A \cap B) = P(A) \cdot P(B)
$$
Tương đương:
$$
P(B \mid A) = P(B)
\quad \text{hoặc} \quad
P(A \mid B) = P(A)
$$
## 4. Các công thức xác suất

- Công thức xác suất toàn phần

Giả sử $\{A_1, A_2, \dots, A_n\}$ là một phân hoạch của $\Omega$, với $P(A_i) > 0.  
Khi đó, với mọi biến cố B:
$$
P(B) = \sum_{i=1}^n P(B \mid A_i) \cdot P(A_i)
$$
- Công thức Bayes (dạng cổ điển)
Với phân hoạch $\{A_1, A_2, \dots, A_n\}$:
$$
P(A_k \mid B) =
\frac{P(B \mid A_k)\, P(A_k)}
{\sum_{i=1}^n P(B \mid A_i)\, P(A_i)}
$$

Công thức Bayes cho phép **cập nhật xác suất** của nguyên nhân $A_k$ khi đã quan sát kết quả B.

## 5. Các mô hình xác suất rời rạc cơ bản
- **Phân phối Bernoulli**:
$$
P(X=1)=p,\quad P(X=0)=1-p
$$
- **Phân phối Nhị thức (Binomial)**:
$$
P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}
$$
- **Phân phối Hình học (Geometric)**:
$$
P(X=k) = (1-p)^{k-1} p
$$
- **Phân phối Poisson**:
$$
P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}
$$
Các mô hình này là nền tảng cho việc mô tả hiện tượng ngẫu nhiên rời rạc trong xác suất cổ điển.












# Xác suất hiện đại


- $f(x)=2πσ2​1​exp(−2σ2(x−μ)2​)$
- **Ứng dụng:** tự nhiên, tài chính, noise trong ML, CLT (định lý giới hạn trung tâm).

# Poison

# Student

# Bernoulli

# Exponential

