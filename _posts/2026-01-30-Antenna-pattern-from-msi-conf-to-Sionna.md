---
layout: post
day create: 30-01-2026
author: Nguyen Thanh Luan
categories:
  - etc
date: 30-01-20205
---
Mô tả các thành phần của Antenna Pattern, và từ cấu hình mô tả Antenna Pattern chuyển thành phương trình mô tả gain theo từng góc của pattern.

Khái niệm Far Field của Transmitting Antenna, coi rằng trường điện từ (electric field) khi phát ở xa của antenna trong không gian (free space) có thể được mô tả bằng một sóng hình cầu có hướng tính từ tâm của antenna dạng:
$$
E(r, \theta, \varphi, t) = E(r, \theta, \varphi) e^{jwt} = E_0(\theta, \varphi)\frac{e^{-jk_0t}}{r}e^{jwt}
$$
Trong đó $E_0(\theta, \varphi)$ là pha của trường điện từ, $r$ là khoảng cách (bán kính), $\theta$ là zenith angle và $\varphi$ là azimuth angle.

Ngược lại, đối với plannar wave, độ lón của trường điện từ bằng $1/r$


Một antenna pattern có thể là phân cực đơn hoặc phân cực kép và với mỗi hướng phân cực sẽ có pattern riêng. Mô hình phân cực kép có thể được coi là 2 antenna phân cực tuyến tính được đặt cùng 1 chỗ.

![[dual_polarized.png]]
Bằng phương pháp toán học, một mẫu antenna (antenna pattern) có thể được định nghĩa bằng hàm
$$
f: (\theta, \varphi) \mapsto (\mathbb{C}_{\theta}((\theta, \varphi)), \mathbb{C}_{\varphi}(\theta, \varphi))
$$

được map tương ứng với 2 góc zenith và azimuth từ mô tả với 2 góc zenith và azimuth của pattern.

### Phân biệt sự khác nhau giữa Polarization, Polarity và Polar Pattern

https://www.rfvenue.com/blog/2015/07/01/polarization-polarity-and-polar-pattern-whats-the-difference


### Các loại phân cực

- "V"
- "H"
- "VH"
- "Cross - Pola"

File .msi mô tả 


