---
layout: post
title: "Kiến trúc O-RAN trong mạng 5G/6G"
subtitle: "Nghiên cứu tìm hiểu và định nghĩa về kiến trúc O-RAN trong thế hệ mạng 5G, từ cơ sở lý thuyết đến thực tế từ các Network Operators / Vendors"
date: 2026-11-01
author: Nguyen Thanh Luan
categories:
  - Network
tags: [O-RAN, 5G, 6G, RAN]
description: "Mô tả tổng quan khái niệm từ kiến trúc đến các thành phần trong O-RAN và ứng dụng đối với vận hành mạng."
cover: /assets/imgs_post/o-ran_in_5g_6g/OPEN_RAN_5G_6G.jpg
cover_alt: "Ảnh cover minh hoạ"
published: true
---

<!-- Đây là **đoạn mở đầu** của bài viết. Nó có *chữ nghiêng*, ~~gạch ngang~~, một [liên kết](https://github.com/luannt0801) và `inline_code()` nằm giữa câu. Mục tiêu: mọi block bên dưới phải hiện **đúng thứ tự** đã viết. -->


**O-RAN (Open Radio Access Network)** là kiến trúc mạng truy nhập vô tuyến mở, được phát triển và chuẩn hóa bởi O-RAN Alliance, nhằm thúc đẩy việc phân tách (disaggregation), ảo hóa (virtualization) và chuẩn hóa các thành phần RAN thông qua các giao diện mở (Open Interfaces). Khác với kiến trúc RAN truyền thống phụ thuộc vào giải pháp độc quyền của một nhà cung cấp, O-RAN cho phép tích hợp các thành phần đa nhà cung cấp (Multi-vendor), tăng khả năng tương tác và linh hoạt trong triển khai, vận hành mạng. Kiến trúc này nổi bật với hai thành phần điều khiển thông minh là Near-Real-Time RAN Intelligent Controller (Near-RT RIC) và Non-Real-Time RAN Intelligent Controller (Non-RT RIC), hỗ trợ quản lý, tối ưu hóa mạng thông qua các ứng dụng thông minh (xApps/rApps), kết hợp AI/ML và cơ chế điều khiển vòng kín (Closed-loop Automation). Nhờ đó, O-RAN tạo nền tảng cho việc tự động hóa vận hành RAN, tối ưu tài nguyên vô tuyến theo dữ liệu thời gian thực và thúc đẩy đổi mới trong nghiên cứu, triển khai mạng 5G và 6G.

# Tại sao cần phát triển kiến trúc O-RAN

Khi mạng RAN ngày càng phát triển với các thế hệ mạng kế tiếp (5G, 6G) được xây dựng trên nền tảng các thiết bị của nhiều vendor khác nhau với công nghệ và các băng tần không đồng nhất. Đặc biệt là công nghệ 5G mới với nhiều công nghệ mới Massive Input Massive Output (MIMO), mmWave, giao tiếp thông qua sub-terahertz, network slicing, etc. _Điều này gây ra áp lực lớn đến chi phí vận hành và tối ưu của các nhà vận hành mạng trong quá trình nâng cấp và vận hành hạ tầng của họ để theo kịp các yêu cầu của thị trường, các yêu cầu của công nghệ mới và yêu cầu khách hàng._

Việc quản lý và tối ưu hệ thống này đòi hỏi một kiến trúc RAN có tính **OPEN**, qua đó mang lại các lợi ích:

- Dễ dàng thu thập dữ liệu và phân tích.
- Close-loop control và tự động.

Các vendor nghiên cứu và cung cấp thiết bị RAN thường đóng kín và các giao thức kết nối, điều khiển giữa các thiết bị thường chỉ tương thích đối với sản phẩm cùng vendor. Các nhà khai thác, vận hành mạng không thể nắm quyền điều khiển chi tiết các thiết bị mà phải dựa vào API thiết bị của vendor, họ coi chúng như "hộp đen" điều khiển.

Việc vận hành và tối ưu mạng bằng cách vận hành thông qua các API vendor cung cấp mà không thật sự tác động vào sâu bên trong dẫn đến hệ quả:
1. **Khả năng tái cấu hình RAN bị hạn chế:** Các thiết bị không thể được cấu hình phù hợp với các mô hình triển khai đa dạng hay các cấu hình về lưu lượng khác nhau do phải phụ thuộc vào các giới hạn phần mềm của vendor.

2. **Sự phối hợp giữa các node mạng bị hạn chế:** Giao thức và thiết kế giữa các node mạng với các vendor khác nhau là bất đồng, ngăn cản việc tối ưu và kiểm soát đồng bộ các thành phần RAN

3. **Vendor lock-in:** Đây là yếu tố ràng buộc mà không nhà vận hành nào muốn, các nhà mạng sẽ bị hạn chế trong việc lựa chọn vendor, giá cả (độc quyền), etc. 

# Kiến trúc O-RAN

![Kiến trúc O-RAN](https://docs.o-ran-sc.org/en/latest/_images/o-ran-architecture.png "Hình 1. O-RAN architecture overview")

Từ trung tâm vận hành và điều khiển của các nhà mạng, `Service Management and Orchestration (SMO)` và `Non-RT RIC` giám sát, phân tích dữ liệu và đưa ra các chính sách tối ưu mạng.

`Near-RT RIC` tiếp nhận và điều phối các quyết định tối ưu gần thời gian thực.

Các thành phần `O-CU`, `O-DU` và `O-RU` phối hợp xử lý tín hiệu, truyền dữ liệu và kết nối người dùng với mạng di động.

Nhờ các giao diện mở và khả năng tích hợp AI/ML, nhà mạng có thể tự động điều chỉnh cấu hình mạng, cải thiện chất lượng dịch vụ và giảm sự phụ thuộc vào một nhà cung cấp thiết bị duy nhất.

# Các thành phần

| STT | Thành phần    | Tên đầy đủ                                | Mô tả                                                                                                                                                                                                      |
| --- | ------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `Near-RT RIC` | Near-Real-Time RAN Intelligent Controller | Bộ điều khiển thông minh RAN gần thời gian thực, cho phép giám sát, điều khiển và tối ưu hóa các thành phần, tài nguyên RAN thông qua thu thập dữ liệu và thực hiện hành động điều khiển qua giao diện E2. |
| 2   | `Non-RT RIC`  | Non-Real-Time RAN Intelligent Controller  | Bộ điều khiển thông minh RAN phi thời gian thực, hỗ trợ phân tích và tối ưu hóa RAN ở mức dài hạn. Ứng dụng AI/ML để huấn luyện, cập nhật mô hình và xây dựng chính sách điều khiển cho Near-RT RIC.       |
| 3   | `NMS`         | Network Management System                 | Hệ thống quản lý mạng, hỗ trợ giám sát, cấu hình và vận hành mạng; quản lý trạng thái thiết bị, cảnh báo, hiệu năng và xử lý sự cố.                                                                        |
| 4   | `O-CU`        | O-RAN Centralized Unit                    | Đơn vị xử lý tập trung, đảm nhiệm các chức năng giao thức lớp cao của RAN, bao gồm RRC, SDAP và PDCP. Có thể được chia thành O-CU-CP và O-CU-UP.                                                           |
| 5   | `O-CU-CP`     | O-RAN Centralized Unit – Control Plane    | Đơn vị xử lý tập trung mặt phẳng điều khiển, đảm nhiệm giao thức RRC và phần mặt phẳng điều khiển của PDCP, phục vụ thiết lập, duy trì và quản lý kết nối.                                                 |
| 6   | `O-CU-UP`     | O-RAN Centralized Unit – User Plane       | Đơn vị xử lý tập trung mặt phẳng người dùng, đảm nhiệm phần mặt phẳng người dùng của PDCP và giao thức SDAP, phục vụ truyền tải dữ liệu người dùng.                                                        |
| 7   | `O-DU`        | O-RAN Distributed Unit                    | Đơn vị xử lý phân tán, đảm nhiệm các chức năng RLC, MAC và High-PHY, bao gồm lập lịch tài nguyên vô tuyến và xử lý tín hiệu băng gốc.                                                                      |
| 8   | `O-RU`        | O-RAN Radio Unit                          | Đơn vị vô tuyến, đảm nhiệm các chức năng Low-PHY và RF, bao gồm xử lý FFT/iFFT, PRACH và chuyển đổi tín hiệu số thành tín hiệu vô tuyến để truyền, nhận với thiết bị người dùng (UE).                      |
| 9   | `O1`          | O-RAN Management Interface                | Giao diện kết nối giữa SMO và các phần tử mạng O-RAN, hỗ trợ quản lý cấu hình, hiệu năng, lỗi, bảo mật (FCAPS), phần mềm và tập tin.                                                                       |
| 10  | `O1*`         | O1 Infrastructure Management Interface    | Giao diện kết nối giữa SMO và khung quản lý cơ sở hạ tầng O-Cloud, hỗ trợ quản lý, giám sát và điều phối tài nguyên điện toán, lưu trữ và mạng cho các chức năng mạng ảo O-RAN.                            |
| 11  | `xApp`        | Near-RT RIC Application                   | Ứng dụng phần mềm chạy trên nền tảng Near-RT RIC, cung cấp các chức năng điều khiển và tối ưu hóa RAN gần thời gian thực. Có thể được phát triển bởi nhà mạng, nhà cung cấp thiết bị hoặc bên thứ ba.      |

# Ứng dụng

- Tối ưu mạng vô tuyến: Tự động điều chỉnh công suất phát, góc nghiêng anten (Tilt), phân bổ tài nguyên vô tuyến và cấu hình cell nhằm cải thiện vùng phủ, dung lượng và chất lượng dịch vụ.
- Tự động vận hành mạng: Ứng dụng AI/ML và cơ chế Closed-loop Automation để phát hiện bất thường, phân tích nguyên nhân và đề xuất hoặc thực thi các giải pháp tối ưu mạng.
- Quản lý tài nguyên thông minh: Phân bổ linh hoạt tài nguyên giữa các cell, tần số và khu vực theo lưu lượng, nhu cầu người dùng và điều kiện mạng.
- Tiết kiệm năng lượng: Tối ưu công suất và tự động đưa các thành phần mạng vào chế độ tiết kiệm năng lượng khi lưu lượng thấp, đồng thời đảm bảo chất lượng dịch vụ.
- Tích hợp multi-vendor: Sử dụng các giao diện mở để kết hợp thiết bị và giải pháp từ nhiều nhà cung cấp, giảm phụ thuộc vào hệ sinh thái độc quyền.
- Phát triển ứng dụng AI/ML: Cho phép nhà mạng và bên thứ ba phát triển các ứng dụng xApp/rApp chuyên biệt, phục vụ các bài toán tối ưu hóa và tự động hóa RAN.
  ![AI/ML workflow in the O-RAN architecture. ](F:/assets/imgs_post/o-ran_in_5g_6g/{6B0326E7-2EE0-4AED-91DF-CFC8B7D64F45}.png "Hình 2. AI/ML workflow in the O-RAN architecture. ref [3]")
- Hỗ trợ triển khai mạng 5G/6G: Tạo nền tảng linh hoạt, có khả năng mở rộng và tích hợp các công nghệ mới như Network Digital Twin, Federated Learning và AI-native RAN.

# References

[1] [3GPP ETSI TR 121 905 V14.1.1 (2017-07)](https://www.etsi.org/deliver/etsi_tr/121900_121999/121905/14.01.01_60/tr_121905v140101p.pdf)

[2] [Understanding O-RAN: Architecture, Interfaces, Algorithms, Security, and Research Challenges](https://arxiv.org/html/2202.01032v2)

[3] [O-RAN Software community](https://docs.o-ran-sc.org/en/latest/architecture/architecture.html)