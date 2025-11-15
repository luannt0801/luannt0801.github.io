---
layout: post
title: Quantum bit
date: 2025-09-24
author: Nguyen Thanh Luan
categories:
  - Computer Science
---
# Qubit - Quantum bit

Mặc dù công nghệ lượng tử sử dụng mã nhị phân, dữ liệu lượng tử thu được từ hệ thống lượng tử—chẳng hạn như qubit—mã hóa dữ liệu khác với bit truyền thống, với một vài ưu điểm đáng chú ý. Các nhà nghiên cứu đã thiết lập nhiều cách khác nhau để tạo ra qubit hoặc sử dụng các hệ thống lượng tử tự nhiên làm qubit. Tuy nhiên, trong hầu hết các trường hợp, máy tính lượng tử cần được làm lạnh cực độ để cô lập qubit và ngăn ngừa nhiễu.

Về mặt lý thuyết, bất kỳ hệ lượng tử hai cấp nào cũng có thể được sử dụng để tạo ra qubit. Một hệ lượng tử được mô tả là hai cấp khi một số thuộc tính của hệ thống có thể được đo lường ở vị trí nhị phân, chẳng hạn như lên hoặc xuống. Hệ lượng tử đa cấp cũng có thể được sử dụng để tạo ra qubit, miễn là hai khía cạnh của hệ thống đó có thể được cô lập hiệu quả để tạo ra phép đo nhị phân.

Cũng giống như máy tính truyền thống có thể sử dụng nhiều loại bit—chẳng hạn như dòng điện, điện tích, hoặc các lỗ đục (hoặc không đục) trên một tờ giấy để tính toán bằng thẻ đục lỗ—máy tính lượng tử có thể sử dụng nhiều loại bit. Một số bit phù hợp hơn với một số chức năng nhất định, và một máy tính lượng tử tiên tiến có thể sẽ sử dụng kết hợp các loại bit để thực hiện các phép toán khác nhau.

Vì mỗi bit có thể biểu diễn số 0 hoặc số 1, bằng cách ghép nối hai bit thông tin, chúng ta có thể tạo ra tối đa bốn tổ hợp nhị phân duy nhất:

1. 0 0
2. 0 1
3. 1 0
4. 1 1

Trong khi mỗi bit có thể là 0 hoặc 1, một qubit đơn lẻ có thể là 0, 1 hoặc _chồng chập_ . Chồng chập lượng tử có thể được mô tả là cả 0 và 1, hoặc là tất cả các trạng thái có thể có giữa 0 và 1, vì nó thực sự biểu diễn xác suất trạng thái của qubit.

Ở cấp độ lượng tử, xác suất qubit được đo bằng hàm sóng. Biên độ xác suất của một qubit có thể được sử dụng để mã hóa nhiều hơn một bit dữ liệu và thực hiện các phép tính cực kỳ phức tạp khi kết hợp với các qubit khác.

Khi xử lý một bài toán phức tạp, chẳng hạn như phân tích một số nguyên tố lớn, các bit truyền thống bị ràng buộc bởi việc lưu trữ một lượng lớn thông tin. Bit lượng tử hoạt động khác. Vì qubit có thể duy trì trạng thái chồng chập, một máy tính lượng tử sử dụng qubit có thể tính toán một khối lượng dữ liệu lớn hơn nhiều.  

Để hiểu rõ hơn về bit so với qubit, hãy tưởng tượng bạn đang đứng giữa một mê cung phức tạp. Để thoát khỏi mê cung, một máy tính truyền thống sẽ phải  “brute force” giải bài toán, thử mọi tổ hợp đường đi có thể để tìm ra lối ra. Loại máy tính này sẽ sử dụng bit để khám phá các đường đi mới và ghi nhớ đường đi nào là ngõ cụt.

So sánh mà nói, một máy tính lượng tử, nói một cách hình tượng, có thể ngay lập tức đưa ra góc nhìn toàn cảnh của mê cung, thử nghiệm nhiều đường đi cùng lúc và tìm ra lời giải đúng. Tuy nhiên, qubit không "thử nghiệm nhiều đường đi" cùng một lúc. Thay vào đó, máy tính lượng tử đo biên độ xác suất của qubit để xác định kết quả.

Vì các biên độ này hoạt động như sóng, chúng cũng chồng chéo và giao thoa lẫn nhau. Khi sóng bất đồng bộ chồng chéo, nó loại bỏ hiệu quả các giải pháp khả thi cho các vấn đề phức tạp và sóng hoặc các sóng kết hợp được tạo ra sẽ đưa ra giải pháp.

## Sự vướng víu lượng tử là gì?

Lần đầu tiên được Einstein mô tả là "hành động kỳ lạ từ xa", vướng víu lượng tử là hiện tượng trong đó hai qubit (hoặc bất kỳ hai hoặc nhiều hạt lượng tử) đan xen theo cách mà trạng thái của một hạt không thể được mô tả độc lập với trạng thái của hạt kia, bất kể khoảng cách giữa chúng.

Khi hai qubit bị vướng víu, cả hai đều tồn tại trong trạng thái chồng chập cho đến khi một trong hai được đo. Một khi được quan sát, trạng thái chồng chập lượng tử của cả hai sẽ sụp đổ và qubit nào không được quan sát sẽ ở vị trí ngược lại với qubit đã được quan sát.

Ví dụ, nếu một nửa của cặp qubit vướng víu được đo ở vị trí 1, qubit còn lại có thể ngay lập tức được đo ở vị trí 0. Ý nghĩa của hiện tượng vướng víu lượng tử rộng lớn như sự hiểu biết của chúng ta về hiện tượng này còn hạn chế. Có thể nói rằng các bit truyền thống không bị vướng víu.

Theo cách này, các qubit vướng víu dường như có thể truyền thông tin qua cả năm ánh sáng ngay lập tức, nhanh hơn tốc độ ánh sáng. Mặc dù qubit không thực sự truyền dữ liệu nhanh hơn ánh sáng, nhưng hiện tượng vướng víu lượng tử có thể làm tăng đáng kể sức mạnh của các mạch lượng tử.

## Các loại qubit khác nhau và ưu điểm của chúng

Vì bất kỳ hệ lượng tử hai cấp nào cũng có thể được sử dụng để tạo ra qubit, nên hiện nay có nhiều loại qubit đang được các nhà nghiên cứu phát triển—và một số qubit phù hợp hơn với một số ứng dụng nhất định.

![](/assets/imgs_post/cac loai qubit.png)


# Qubit so với bit

Có nhiều loại bit và qubit khác nhau, nhưng tất cả qubit phải tuân theo các định luật vật lý lượng tử và có thể tồn tại trong trạng thái chồng chập lượng tử.

Một bit cổ điển chỉ có thể tồn tại ở vị trí 0 hoặc 1. Tuy nhiên, qubit cũng có thể chiếm một trạng thái thứ ba, được gọi là chồng chập. Một chồng chập biểu diễn 0, 1 và tất cả các vị trí ở giữa được lấy cùng một lúc, tổng cộng là ba vị trí riêng biệt.

Mặc dù qubit có thể mã hóa ba vị trí riêng biệt, chúng vẫn được sử dụng để truyền tải thông tin thông qua hệ nhị phân. Trong các hệ thống như vậy, thuật ngữ bit có thể đề cập đến vật liệu hoặc quy trình được sử dụng để biểu diễn 0 hoặc 1, hoặc phép đo bit đó (tức là 0 hoặc 1).



+ Xây dựng, mô phỏng và tối ưu các thuật toán lượng tử (ví dụ: Grover, Shor, Quantum Fourier Transform, VQE, QAOA,…).  
+ Phát triển thuật toán ứng dụng cho mật mã học, tối ưu hóa, mô phỏng vật lý, tài chính, hóa học lượng tử,…  
+ Tìm giải pháp tăng hiệu quả khi chạy trên số qubit hữu hạn và hệ thống nhiễu (NISQ).

+ Viết code mô phỏng trên các framework lượng tử (Qiskit, Cirq, PennyLane, Braket).  
+ Tối ưu hóa mạch lượng tử (circuit optimization, gate synthesis, error mitigation).  
+ Xây dựng pipeline test hiệu năng thuật toán trên máy tính cổ điển trước khi triển khai lên máy lượng tử thực.

- Phát triển thuật toán post-processing lượng tử trong QKD (error correction, privacy amplification).  
+ Tích hợp kết quả QRNG vào các ứng dụng mật mã lượng tử hoặc PQC.  
+ Nghiên cứu tấn công lượng tử lên các hệ mật mã cổ điển và đề xuất giải pháp thay thế.



