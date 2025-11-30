---
layout: post
Author: Nguyen Thanh Luan
Day: 30-11-2025
title: Overview of network generations (4G, 5G, 6G, etc.)
categories:
  - Computer Science
---
Mạng di động đã phát triển qua nhiều thế hệ từ 1G đến 6G với mục tiêu tăng tốc độ, mở rộng dịch vụ và giảm độ trễ.

- **1G** là mạng analog chỉ phục vụ thoại với chất lượng kém.
- **2G** chuyển sang số hóa (GSM/CDMA), hỗ trợ SMS và dữ liệu tốc độ thấp như GPRS/EDGE.
- **3G** đánh dấu bước nhảy lớn với hỗ trợ Internet di động, video call và tốc độ từ vài Mbps đến hàng chục Mbps (UMTS/HSPA).
- **4G LTE** đưa mạng di động lên chuẩn IP hoàn toàn, hỗ trợ streaming HD, VoLTE và đạt tốc độ hàng chục đến hàng trăm Mbps.
- **5G** nâng chất lượng với tốc độ gigabit, độ trễ mili-giây, hỗ trợ IoT quy mô lớn và các ứng dụng như xe tự hành, VR/AR.
Trong tương lai, **6G** dự kiến đạt tốc độ hàng trăm Gbps đến Tbps, độ trễ micro-giây, tích hợp AI gốc (AI native) trong mạng, truyền thông siêu tin cậy và phổ tần terahertz, hướng đến thế giới “Internet of Senses”, mạng không gian–trái đất thống nhất và kết nối ở mọi nơi.

## AI trong network

AI đóng vai trò ngày càng quan trọng trong các thế hệ mạng từ 4G đến 6G. Trong **4G**, AI chủ yếu hỗ trợ ở tầng vận hành như tối ưu tài nguyên vô tuyến, dự đoán nghẽn mạng, phân tích lưu lượng và tự động hóa vận hành mạng (SON). Đến **5G**, AI được tích hợp sâu hơn vào kiến trúc mạng, đặc biệt trong slicing, điều khiển beamforming, tối ưu MIMO, dự đoán tải theo thời gian thực và vận hành tự động (Zero-Touch O&M). AI cũng cho phép mạng 5G phục vụ đồng thời eMBB, URLLC và mMTC thông qua điều phối thông minh. Với **6G**, AI trở thành “bộ não” của hệ thống, được tích hợp gốc trong từng lớp mạng (AI-native network), hỗ trợ tự tối ưu, tự cấu hình, tự phục hồi, và ra quyết định theo thời gian thực. 6G dự kiến sử dụng AI để khai thác phổ tần terahertz, phối hợp mạng không gian–không trung–mặt đất, nhận thức môi trường (environment sensing), hỗ trợ Internet of Senses, và tạo nên mạng tự trị với khả năng học liên tục và xử lý phân tán ở edge.```

### 4G

1. Tổng quan kiến trúc mạng 4G
![](/assets/imgs_post/Pasted image 20251130233944.png)
(Telecom Forums)


## Kiến trúc mạng 4G và vai trò của AI trong từng thành phần

Kiến trúc mạng **4G LTE** gồm bốn phần chính: **UE**, **E-UTRAN (eNodeB)**, **EPC (MME, SGW, PGW)** và **OSS/BSS**. Trong giai đoạn 4G, AI chưa được “nhúng” sâu vào mạng như 5G/6G, nhưng vẫn có tác động mạnh mẽ trong tối ưu vận hành và chất lượng mạng.

### 2. **E-UTRAN – eNodeB (vô tuyến)**
- **Vai trò kiến trúc**: xử lý PHY/MAC, scheduling, HARQ, handover, đo đạc RSRP/RSRQ/SINR.
- **AI tác động**:
  - **Tối ưu công suất & tilt anten** (tự động tối ưu coverage và interference).
  - **AI-based Scheduler** giúp phân bổ tài nguyên theo QoS, tải và dự đoán nhu cầu UE.
  - **Dự đoán nghẽn trạm** để chuyển tải thông minh, giảm overload.
  - **Tối ưu handover** dựa trên mô hình học máy để giảm drop & ping-pong.
  - Phát hiện bất thường RF (nhiễu, mất đồng bộ, phần tử anten lỗi).

### 3. **EPC – Evolved Packet Core**
EPC gồm các thành phần chính:
- **MME**: điều khiển signaling, mobility.
- **SGW/PGW**: xử lý user-plane, định tuyến dữ liệu, QoS.
- **HSS**: cơ sở dữ liệu thuê bao.

#### AI tác động:
- **Dự đoán Mobility Pattern** để tối ưu luồng signaling và load trên MME.
- **Traffic Forecasting** để phân chia tải giữa SGW/PGW, tránh nghẽn lõi mạng.
- **Phát hiện bất thường** (fraud, DDoS, lưu lượng bất thường).
- **QoS Optimization**: AI phân loại dịch vụ để PGW cấp băng thông hợp lý.
- **Predictive Maintenance**: dự báo lỗi phần cứng trong SGW/PGW, cải thiện độ tin cậy.

### 4. **OSS/BSS – Vận hành và kinh doanh**
- **Vai trò kiến trúc**: quản lý mạng, cấu hình, giám sát, chăm sóc khách hàng, billing.
- **AI tác động**:
  - **SON (Self-Organizing Networks)**: tự tối ưu cell, tự cấu hình, tự phục hồi.
  - Phân tích KPI/KQI để nhận biết sớm khu vực suy giảm chất lượng.
  - Mô hình AI dự đoán churn, tối ưu gói cước, cá nhân hóa dịch vụ.
  - Automation O&M: đề xuất sửa lỗi, tối ưu tham số, cải thiện throughput & coverage.

## Tổng kết
AI trong 4G chủ yếu tập trung vào:
- **Tối ưu vô tuyến (RF Optimization)**  
- **Tối ưu traffic & QoS**  
- **Dự đoán lỗi & tự động hóa vận hành (SON)**  
- **Giảm tải và tăng hiệu quả lõi mạng EPC**  
- **Phân tích hành vi người dùng và lưu lượng**  

AI **không thay đổi kiến trúc 4G**, nhưng giúp mạng vận hành thông minh, hiệu quả và ổn định hơn, đặt nền tảng cho AI-native networks trong 5G và 6G.

