# 1. CV
image classification
object detection
image segmentation
tracking

pose estimation
deeep fake
imagic super resshordion

# NLP


# VP


----

Về bài toán object detection

Gồm

- tọa độ bounding box
- confident: độ tin cậy của box
- accuracy: output - nhãn của objject

Quá trình phát triển
mốc là năm 2013 

- trước 2013: template chung là tạo ra 1 cái cửa sổ - sliding window trượt từ trái sang phải và trên xuống dưới. mỗi lần trượt -> đưa vào feature extraction -> mô hình học máy -> phân loại xem window này thuộc lớp nào?
![[Pasted image 20260415194735.png]]

Vaasnd dề: trượt nhiều -> có nhiều cửa sổ trùng => giải pháp là sử dụng thuật toán NMS

#### Thuật toán NMS

Với từng class lựa chọn box có confident cao nhất và lựa chọn mức độ chồng lấn IoU giữa các box này và chọn box có độ chồng lấn cao nhất

*IoU* - Intersection over Union

Diện tích giao / diện tích hợp của từng box -> lớn nhất là predicted box

#### Thuật toán Histogram of Orientation Gradients Detectors

![[Pasted image 20260415195515.png]]

Không phân tích được 2 người chồng lần
#### Thuật toán DPM - Deformable Part-based model

-----

Các thuật toán học sâu: giải quyết vaasnd dề detect người ở xa, mặt quay nghiên nhỏ

![[Pasted image 20260415195814.png]]


Đi vào 1 stage detection -> yolo

RCNN

- Thuật toán selective search -> đề xuất vùng có đối tượng. gom các vùng có chung về màu sắc bằng greedy algorithsm
- Sau khi làm vậy thi vẫn đưa vào CNN features 

FastCNN -> ốp output vùng vào ảnh gốc luôn rồi đưa vào CNN

#### ROI pooling

-> dùng cho Fast CNN

----

Yolo - you only look one

SSD kiến trúc tuần tự và dự đoán trên nhiều kích thước khác nhau


RetinaNet
