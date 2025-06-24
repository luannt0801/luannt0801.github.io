---
layout: post
title: "Computer Vision: Edge, Contour Detection and Image Segmentation"
date: 22-06-2023
author: Nguyen Thanh Luan
categories:
  - AI & ML
---

Lĩnh vực Thị giác máy tính - Computer Vision (CV) là một lĩnh vực hấp dẫn cho phép máy tính diễn giải và xử lý thông tin về hình ảnh, giúp chúng thực hiện các nhiệm vụ như phát hiện vật thể (object detection), nhận dạng hình ảnh (image recognition), ...
Trong đó , các kĩ thuật được sử dụng chính trong CV dùng để phân tách đặc trưng (feature extraction) là Edge Detection và Contour Detection. Còn phân đoạn hình ảnh (Image Segmentaion) là một kĩ thuật phân vùng hình ảnh số (digital image) thành các nhóm dùng để thông báo các nhóm đối tượng và các task liên quan.

# Edge Detection


Edge Detection là một kỹ thuật trong xử lý ảnh được dùng để tìm **các đường viền hoặc cạnh** trong một bức ảnh. Các cạnh này thường là nơi có **sự thay đổi rõ rệt về độ sáng hoặc màu sắc** giữa các vùng khác nhau của ảnh.

Ví dụ: ranh giới giữa một vật thể và nền phía sau của nó.

Một điểm ảnh (pixel) được coi là "biên" khi **giá trị độ sáng (intensity)** của nó **thay đổi mạnh** so với các điểm xung quanh. Điều này thể hiện rằng có một đường viền, một ranh giới hoặc một chi tiết quan trọng tại điểm đó.

Các thuật toán phát hiện biên mạnh mẽ, gồm các bước chính:

1. **Gaussian smoothing (Làm mượt ảnh)**: Giảm nhiễu bằng cách làm mờ ảnh với bộ lọc Gaussian.
    
2. **Tính gradient intensity**: Tính độ thay đổi sáng mạnh yếu theo hướng ngang và dọc.
    
3. **Non-maximum suppression**: Loại bỏ các điểm không phải là biên thực sự.
    
4. **Double thresholding**: Xác định đâu là biên mạnh, đâu là biên yếu.
    
5. **Edge tracking**: Kết nối các điểm biên yếu vào các đường biên mạnh nếu chúng liên quan.


## Kỹ thuật phát hiện biên Gradient

```matlab
>> img = imread("grayscale_img.jpg");
>> imshow(img);
>> info = size(img)
info = 300 332 3
>> gray_img = im2double(rgb2gray(img));
>> imshow(gray_img);
>> BW_sobel = edge(gray_img, 'sobel');
>> figure('Name', 'Phát hiện Biên Gradient (Sobel)');
>> subplot(1, 2, 1);
>> imshow(gray_img);
>> title('Ảnh Gốc (Grayscale)');
>> subplot(1, 2, 2);
>> imshow(BW_sobel);
>> title('Cạnh được phát hiện bởi Sobel');
>> colormap(gray);
```

![ảnh]({{ site.baseurl }}/assets/imgs/Pasted%20image%2020250622234318.png)


## Kỹ thuật phát hiện biên Laplace

```matlab
>> BW_laplace = edge(gray_img, 'log');

>> figure('Name', 'Phát hiện Biên Laplace (LoG)');

subplot(1, 2, 1);

imshow(gray_img);

title('Ảnh Gốc (Grayscale)');

subplot(1, 2, 2);

imshow(BW_laplace);

title('Cạnh được phát hiện bởi LoG');

colormap(gray);
```


![ảnh]({{ site.baseurl }}/assets/imgs/Pasted%20image%2020250622235051.png)

## Kỹ thuật phát hiện biên Canny

Canny Edge Detection là một thuật toán phát hiện cạnh của ảnh khá phổ biến được phát triển bởi **John F.Canny** vào năm 1986 [Wiki](https://en.wikipedia.org/wiki/Canny_edge_detector). Mục tiêu của Canny là tìm ra các cạnh sắc nét, mỏng và liên tục, đồng thời loại bỏ noise và các cạnh giả.

Các bước tính toán của thuật toán Canny:
1. Loại bỏ nhiễu bằng bộ lọc Gaussian (Gaussian Blurring or Gaussion smoothing) 
   Sử dụng bộ lọc Gaussian làm mịn ảnh bằng cách tính trung  bình trọng số của các pixel lân cận, với các pixel gần tâm có trọng số lớn hơn bằng hàm Gaussian. Về cơ bản nó là phép tích chập ảnh (convolving) với hàm Gauss. 
   Vì phép biến đổi Fourier của một hàm Gaussian là một hàm Gaussian khác nên việc áp dụng Gaussian Func có tác dụng làm giảm các thành phần có tần số cao của hình ảnh, Gaussian Blurring được coi như là 1 bộ lọc thông thấp.
   Phép biến đổi cho từng điểm ảnh trong Image:
   $$
   G(x) = \frac{1}{\sqrt(2\pi \sigma^2)} e^{-\frac{x^2}{2\sigma^2}}
   $$
   
   Trong 2 chiều, hàm Gauss là tích của 2 hàm Gauss khác ở mỗi chiều:
   $$
   G(x) = \frac{1}{\sqrt(2\pi \sigma^2)} e^{-\frac{x^2 + y^2}{2\sigma^2}}
   $$
  Trong đó, (x, y) là tọa độ trên mặt phẳng (Oxy). $\sigma$ là độ lệch chuẩn của phân phối Gauss. Khi áp dụng trên không gian 2 chiều thì hàm $G(x)$ tạo ra một bề mặt có đường viền là các vòng tròn đồng tâm với phân phối chuẩn Gauss từ tâm.
  $\Rightarrow$ Các giá trị từ phân phối này sẽ sử dụng để xây dựng ma trận tích chập được áp dụng cho ảnh gốc. Giá trị mới của mỗi pixel được đặt thành **giá trị trung bình có trọng số** của vùng lân cận pixel đó. Giá trị của pixel gốc nhận được có trọng số lớn nhất và các pixel lân cận nhận được trọng số nhỏ hơn khi khoảng cách của chúng đến pixel gốc tăng lên. $\rightarrow$ Hiệu ứng làm mờ bảo toàn ranh giới và cạnh tốt hơn các bộ lọc làm mờ đồng đều khác.
  ![ảnh]({{ site.baseurl }}/assets/imgs/Gaussian%20Blurring.png)
  
  Ví dụ tính toán: Ma trận ảnh gốc với kích thước 5x5
$$
\begin{pmatrix}
  10 & 20 & 30 & 40 & 50\\
  15 & 25 & 35 & 45 & 55\\
  20 & 30 & 40 & 50 & 60\\
  25 & 35 & 45 & 55 & 65\\
  30 & 40 & 50 & 60 & 70\\
\end{pmatrix}
$$

Làm mờ với kernel Gaussian 3x3
$$
\begin{pmatrix}
  0.075 & 0.125 & 0.075\\
  0.125 & 0.200 & 0.125\\
  0.075 & 0.125 & 0.075\\
\end{pmatrix}
$$
Kernel 3x3 sẽ bao phủ các pixel từ (1,1) đến (3,3) của ảnh gốc:

```
Vùng ảnh bị bao phủ bởi kernel:
[ 10  20  30 ]
[ 15  25  35 ]
[ 20  30  40 ]

Kernel Gaussian:
[ 0.075  0.125  0.075 ]
[ 0.125  0.200  0.125 ]
[ 0.075  0.125  0.075 ]
```

Nhân từng pixel trong vùng ảnh với trọng số tương ứng trong kenel và cộng tổng lại. 

$\Rightarrow$ **Pixel (2,2) sau khi bị làm mờ sẽ có giá trị là 25.0**
    
2. Tính Gradient cường độ ảnh (Intensity Gradient)
   Sau khi ảnh được làm mịn, sử dụng toán tử gradient như *sobel hoặc Prewitt*. Các toán tử này sẽ tính đạo hàm riêng theo chiều ngang $G_{(y)}$ hoặc dọc $G_{(x)}$
   Cường độ Gradient của một điểm ảnh $G= \sqrt{G_{(x^2)} + G_{(y^2)}}$  
   Hướng Gradient của điểm đó: $\theta = \tan^{-1} (\frac{G_y}{G_x})$ 
   Hướng gradient luôn vuông góc với các cạnh. Nó được làm tròn thành một trong bốn góc biểu thị hướng dọc, hướng ngang và hai hướng chéo.
3. Loại bỏ các điểm không phải cực đại (Non-maximum Suppression-NMS)
   
   Sau khi lấy được độ lớn và hướng của Gradient, quét toàn bộ hình ảnh để thực hiện loại bỏ bất kì pixel không tạo thành cạnh. Mỗi pixel sẽ được kiểm tra xem nó có phải là giá trị cực đại local trong vùng lân cận của nó theo hướng Gradient hay không. 
   ![ảnh]({{ site.baseurl }}/assets/imgs/NMS.png)
	Điểm A nằm trên cạnh (theo hướng thẳng đứng). Hướng gradient vuông góc với cạnh. Điểm B và C theo hướng gradient. Vì vậy, điểm A được kiểm tra với điểm B và C để xem liệu nó có tạo thành cực đại cục bộ hay không.
	Nếu có, A sẽ được xem xét để nối, nếu không A sẽ được đặt về 0 (xóa).
	Sau giai đoạn này, hình ảnh nhận được là một ảnh binary có các cạnh mỏng. 
	
4. Double Thresholding and Edge Linkking by Hysteresis
   
   - Hysteresis Thresholding
    Hai giá trị ngưỡng, minVal và maxVal dùng để xác định rất cả các cạnh tìm được ở bước 3, thì cạnh nào thật sự là cạnh cần tìm, cạnh nào không. 
    Bất kỳ cạnh nào có độ dốc cường độ lớn hơn maxVal chắc chắn là cạnh và những cạnh dưới minVal chắc chắn là không phải cạnh, do đó bị loại bỏ.
   Những cạnh nằm giữa hai ngưỡng này được phân loại là cạnh hoặc không phải cạnh dựa trên khả năng kết nối của chúng. Nếu chúng được kết nối với các pixel "sure-edge", chúng được coi là một phần của các cạnh. Nếu không, chúng cũng bị loại bỏ.
		   ![ảnh]({{ site.baseurl }}/assets/imgs/Pasted%20image%2020250622230935.png)
Giai đoạn này cũng loại bỏ các điểm ảnh nhiễu nhỏ dựa trên giả định rằng các cạnh là các đường dài.
$\Rightarrow$ Cuối cùng chúng ta có được các cạnh sắc nét trong hình ảnh.

```matlab
>> BW_canny = edge(gray_img, 'canny');

>> figure('Name', 'Phát hiện Biên Canny');

subplot(1, 2, 1);

imshow(gray_img);

title('Ảnh Gốc (Grayscale)');

subplot(1, 2, 2);

imshow(BW_canny);

title('Cạnh được phát hiện bởi Canny');

colormap(gray);
```

![ảnh]({{ site.baseurl }}/assets/imgs/Pasted%20image%2020250622235341.png)


```python
import cv2
def perform_canny_edge_detection(image_path, min_threshold, max_threshold):
	img = cv2.imread(image_path, 0) edges = cv2.Canny(img, min_threshold, max_threshold)
	return edges

if __name__ == "__main__":
	input_image_path = 'sample.png'
	min_threshold = 50
	max_threshold = 150
	edges = perform_canny_edge_detection(input_image_path, min_threshold, max_threshold)
	cv2.imshow("Canny Edge Detection", edges)
	cv2.waitKey(0)
	cv2.destroyAllWindows()
```

![ảnh]({{ site.baseurl }}/assets/imgs/result_edge_detection.png)
Phương pháp sử dụng cho ví dụ trên là Canny Edge Detection, một thuật toán phát hiện cạnh của ảnh khá phổ biến được phát triển bởi **John F.Canny** vào năm 1986 [Wiki](https://en.wikipedia.org/wiki/Canny_edge_detector)
 

# Contour Detection

Contouring là kĩ thuật căn bản của CV và xử lý ảnh (Image Processing), đóng một vai trò quan trọng trong việc xác định và trích xuất (identifying and extracting) các đường bao của đối tượng (object boundaries) trong 1 ảnh. Các đường viền (contour) được biểu diễn dưới dạng các đường liên tục hoặc đường cong (curve), xác định được boundary của đối tượng. 

Để tìm kiếm, xác định các đường bao này thường dựa trên sự thay đổi liên tục của các điểm ảnh có cùng thuộc tính (màu sắc, cường độ sáng).

Quá trình phát triển các thuật toán phát hiện biên - Contour/Boundary Detection


![ảnh]({{ site.baseurl }}/assets/imgs/Boundary%20detection.png)

Trong đó vòng 45 năm có rất nhiều thuật toán xác định đường biên của ảnh. Trong đó hiệu suất cao nhất là thuật toán **"Human"** là tốt nhất và thường được coi là chuẩn mực để so sánh với các thuật toán khác. Thuật toán **"Multiscale-Ren(2008)"** đạt performance khá tốt và gần với **Human**, là một trong những phương pháp tính toán hiệu quả.


