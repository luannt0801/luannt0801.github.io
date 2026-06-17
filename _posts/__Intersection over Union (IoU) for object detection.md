
Đây là một thuật toán kiểu như bla bla hay phết

Sau này sẽ viết thêm sau =)

Ncl thuật toán này cho phép sau khi các ảnh được đưa qua các lớp backbone - (phần core model) thực hiện các phép tính conv nhằm tách ra các đặc trưng của ảnh.

1. Lớp backbone

Lớp này đa phần vẫn giữ lại kích thước ảnh khác lớn, chỉ là dùng conv với các kernel khác nhau nhằm cô đọng đặc trưng của ảnh

Thường có thêm các hàm ReLU - nhằm loại bỏ mức tuyến tính hoặc mức âm - vì mức âm không mang giá trị dữ liệu.


2. Lớp neck

Neck này bắt đầu tạo các khung quét - maybe để quét từ các đặc trưng kia, dùng các thuật toán để đưa ra nhiều khung

huấn luyện nhằm predict các khung sát với vật thể

3. Lớp activation -> output

Sử dụng các thuật toán để loại bỏ nhiều đáp án trùng nhau trên vật thể, từ đó đưa ra box/đáp án chính xác nhất

trong đó có thuật toán IoU nhằm lưạ chọn box chính xác nhất cho bài object detection.

-----

Các nguyên tắc của Luân

Các từ khóa. Quá trình làm việc, tôi đang viết cái gì thế này.