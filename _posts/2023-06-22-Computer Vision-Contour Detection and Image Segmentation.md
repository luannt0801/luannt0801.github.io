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

![ảnh](/imgs/Pasted%20image%2020250622234318.png)


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


![ảnh](/imgs/Pasted%20image%2020250622235051.png)

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
  ![ảnh](/imgs/Gaussian%20Blurring.png)
  
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
   ![ảnh](/imgs/NMS.png)
	Điểm A nằm trên cạnh (theo hướng thẳng đứng). Hướng gradient vuông góc với cạnh. Điểm B và C theo hướng gradient. Vì vậy, điểm A được kiểm tra với điểm B và C để xem liệu nó có tạo thành cực đại cục bộ hay không.
	Nếu có, A sẽ được xem xét để nối, nếu không A sẽ được đặt về 0 (xóa).
	Sau giai đoạn này, hình ảnh nhận được là một ảnh binary có các cạnh mỏng. 
	
4. Double Thresholding and Edge Linkking by Hysteresis
   
   - Hysteresis Thresholding
    Hai giá trị ngưỡng, minVal và maxVal dùng để xác định rất cả các cạnh tìm được ở bước 3, thì cạnh nào thật sự là cạnh cần tìm, cạnh nào không. 
    Bất kỳ cạnh nào có độ dốc cường độ lớn hơn maxVal chắc chắn là cạnh và những cạnh dưới minVal chắc chắn là không phải cạnh, do đó bị loại bỏ.
   Những cạnh nằm giữa hai ngưỡng này được phân loại là cạnh hoặc không phải cạnh dựa trên khả năng kết nối của chúng. Nếu chúng được kết nối với các pixel "sure-edge", chúng được coi là một phần của các cạnh. Nếu không, chúng cũng bị loại bỏ.
		   ![ảnh](/imgs/Pasted%20image%2020250622230935.png)
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

![ảnh](/imgs/Pasted%20image%2020250622235341.png)


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

![ảnh](/imgs/result_edge_detection.png)
Phương pháp sử dụng cho ví dụ trên là Canny Edge Detection, một thuật toán phát hiện cạnh của ảnh khá phổ biến được phát triển bởi **John F.Canny** vào năm 1986 [Wiki](https://en.wikipedia.org/wiki/Canny_edge_detector)
 

# Contour Detection

Contouring là kĩ thuật căn bản của CV và xử lý ảnh (Image Processing), đóng một vai trò quan trọng trong việc xác định và trích xuất (identifying and extracting) các đường bao của đối tượng (object boundaries) trong 1 ảnh. Các đường viền (contour) được biểu diễn dưới dạng các đường liên tục hoặc đường cong (curve), xác định được boundary của đối tượng. 

Để tìm kiếm, xác định các đường bao này thường dựa trên sự thay đổi liên tục của các điểm ảnh có cùng thuộc tính (màu sắc, cường độ sáng).

Quá trình phát triển các thuật toán phát hiện biên - Contour/Boundary Detection

![imgs](/imgs/Pasted%20image%2020250706113754.png)

Trong đó vòng 45 năm có rất nhiều thuật toán xác định đường biên của ảnh. Trong đó hiệu suất cao nhất là thuật toán **"Human"** là tốt nhất và thường được coi là chuẩn mực để so sánh với các thuật toán khác. Thuật toán **"Multiscale-Ren(2008)"** đạt performance khá tốt và gần với **Human**, là một trong những phương pháp tính toán hiệu quả.

Vấn đề của bài toán Contour Detection và Segmentation là có liên quan đến nhau nhưng không giống hệt nhau. Tổng quát chung, các thuật toán dò đường viền không đảm bảo việc tạo ra các viền khép kín vì vậy chúng không nhất thiết đảm bảo một phân vùng các đối tượng vùng trong ảnh. Nhưng nhờ việc khôi phục các đường viền khép kín từ các ranh giới 

![imgs](/imgs/Pasted%20image%2020250706114539.png)

Các phương pháp ban đầu để phát hiện đường viền nhằm mục đích định lượng sự hiện diện của đường biên tại một vị trí hình ảnh nhất định thông qua các phép đo cục bộ.

Các phép đo với toán tử Roberts, Sobel, Prewitt phát hiện các cạnh bằng cách tích chập một hình ảnh xám với  các bộ lọc đạo hàm cục bộ. 

Marr và Hildreth sử dụng các điểm đổi dấu của toán tử Laplacian của Gaussian (LoG). Bộ phát hiện cạnh Canny cũng mô hình hóa cạnh như sự gián đoạn mạnh trong kênh độ sáng, bổ sung thêm các bước đè cực đại (non-maximum suppression) và ngưỡng hóa theo kiểu dây chuyền (hysteresis thresholding). 

Thuật toán phát hiện cạnh Canny

Phương pháp Oriented Energy, Lindeberg

Các phương pháp hiện đại xét đến thông tin về màu sắc và kết cấu, sử dụng kỹ thuật học máy để kết hợp các tín hiệu đầu vào.

**Martin et al. [2]** định nghĩa các toán tử gradient cho các kênh độ sáng, màu và kết cấu, rồi sử dụng chúng làm đầu vào cho một bộ phân loại logistic nhằm dự đoán độ mạnh của đường viền.

Thay vì dựa vào đặc trưng được thiết kế thủ công, **Dollar et al. [27]** đề xuất thuật toán **Boosted Edge Learning (BEL)** — tìm cách học một bộ phân loại đường viền dưới dạng cây tăng cường xác suất (probabilistic boosting tree [39]) từ hàng ngàn đặc trưng đơn giản tính toán trên các mảnh ảnh. Ưu điểm của phương pháp này là có khả năng xử lý các tín hiệu như tính song song và hoàn thiện (completion) ngay từ giai đoạn phân loại đầu tiên.

**Mairal et al. [26]** xây dựng bộ phát hiện đường viền vừa tổng quát vừa theo lớp đối tượng bằng cách học biểu diễn thưa phân biệt (discriminative sparse representation) của các mảnh ảnh cục bộ. Với mỗi lớp, họ học một từ điển phân biệt và sử dụng lỗi tái tạo từ từng từ điển làm đầu vào cho bộ phân loại cuối cùng.

Tuy nhiên, vấn đề về **sự đa dạng trong thang đo (scale)** mà các đối tượng có thể xuất hiện trong ảnh vẫn là một mối quan tâm trong các phương pháp cục bộ hiện đại. **Ren [28]** chứng minh lợi ích khi kết hợp thông tin từ nhiều thang đo khác nhau của các toán tử cục bộ do [2] đề xuất. Các tín hiệu định vị (localization cues) và độ tương phản tương đối (relative contrast cues), được định nghĩa từ đầu ra của bộ phát hiện đa thang đo, được đưa vào bộ phân loại biên. Với mỗi thang đo, tín hiệu định vị đo khoảng cách từ pixel đến điểm phản hồi cực đại gần nhất; còn độ tương phản tương đối chuẩn hóa mỗi pixel dựa trên lân cận xung quanh.


# Thực hiện phân vùng dựa trên phát triển vùng ảnh sau với ngưỡng độ chênh lệch bằng 2


```matlab
>> A = [1 3 4 3 4;

3 4 2 1 3;

4 3 1 0 0;

4 1 1 0 0;

5 4 3 2 0];

>> [rows, cols] = size(A);

>> region = zeros(rows, cols);

>> region_id = 1;

>> threshold = 2;

>> is_valid = @(r, c) r >= 1 && r <= rows && c >= 1 && c <= cols;

>> neighbors = [ -1 0; 1 0; 0 -1; 0 1 ];

>> for r = 1:rows

for c = 1:cols

if region(r, c) == 0

% Tạo hàng đợi và khởi tạo vùng mới

queue = [r, c];

region(r, c) = region_id;

seed_val = A(r, c);

% Vòng lặp phát triển vùng

while ~isempty(queue)

[cur_r, cur_c] = deal(queue(1,1), queue(1,2));

queue(1,:) = []; % pop

% Kiểm tra 4 lân cận

for k = 1:size(neighbors,1)

nr = cur_r + neighbors(k,1);

nc = cur_c + neighbors(k,2);

if is_valid(nr, nc) && region(nr,nc) == 0

if abs(A(nr,nc) - seed_val) <= threshold

region(nr,nc) = region_id;

queue(end+1,:) = [nr, nc]; %#ok<AGROW>

end

end

end

end

region_id = region_id + 1; % vùng mới

end

end

end

>> disp('Kết quả phân vùng (ma trận nhãn):');

disp(region);

imagesc(region);

colormap(jet);

colorbar;

title('Kết quả phân vùng bằng Region Growing');

Kết quả phân vùng (ma trận nhãn): 1 1 2 2 2 1 2 2 3 2 2 2 3 3 3 2 3 3 3 3 2 2 2 2 3
```

![imgs](/imgs/Pasted%20image%2020250706222338.png)




# TìmhiểubàibáovàthựchiệntrênMatlab: Region Growing for Medical Image Segmentation Using a Modified Multiple-seed Approach on a Multi-core CPU Computer  

Đọc và trình bày nội dung bài tổng hợp về các phương pháp phân vùng

Color Image Segmentation: A State-of-the-Art Survey, L. Luccheseyz and S.K. Mitray

 Region Growing for Medical image segmentation using a modified multiple-seed approach on a Multi-core CPU computer

Region Growing

**Region Growing** là một **thuật toán phân đoạn ảnh (image segmentation)** đơn giản nhưng hiệu quả, thường dùng trong xử lý ảnh y tế.

- Ý tưởng: bắt đầu từ một hoặc nhiều **điểm hạt giống (seed points)** và **mở rộng vùng** ra xung quanh dựa trên tiêu chí tương đồng (ví dụ: độ sáng, màu sắc, hoặc texture).
    
- Nếu một pixel lân cận **giống** với vùng hiện tại (theo ngưỡng đặt trước), nó sẽ được **thêm vào vùng**, và quá trình tiếp tục.

Medical Image Segmentation Là quá trình tách và phân loại các vùng quan trọng trong ảnh y tế – ví dụ:

- Tách khối u ra khỏi mô lành
    
- Phân chia các cơ quan như gan, tim, não
    
- Đánh giá kích thước, hình dạng các cấu trúc bên trong cơ thể

Phân đoạn ảnh là bài toán **tốn tài nguyên** (do ảnh y tế có độ phân giải cao).
Tác giả **tối ưu thuật toán region growing để chạy song song trên nhiều lõi CPU**.
    
    - Mỗi lõi xử lý một vùng ảnh
        
    - Tăng tốc độ thực thi rõ rệt
        
    - Phù hợp với máy tính thông thường (không cần GPU)

```matlab
img = imread('MRI-Brain-Images-abenign-bmalignant-images.png'); % thay bằng tên ảnh của bạn

if size(img,3) == 3

img = rgb2gray(img);

end

imshow(img);

title('Click chuột để chọn điểm seed');

seed = round(ginput(1)); % lấy 1 điểm hạt giống từ chuột

threshold = 15; % ngưỡng tương đồng có thể điều chỉnh

% Khởi tạo

[rows, cols] = size(img);

region = false(rows, cols); % mặt nạ vùng kết quả

visited = false(rows, cols); % đánh dấu pixel đã xét

seed_val = double(img(seed(2), seed(1)));

region(seed(2), seed(1)) = true;

visited(seed(2), seed(1)) = true;

queue = seed; % danh sách pixel cần mở rộng

% Bắt đầu thuật toán Region Growing

while ~isempty(queue)

point = queue(1, :);

queue(1, :) = []; % bỏ phần tử đầu (dequeue)

% Duyệt 8 pixel lân cận

for dx = -1:1

for dy = -1:1

x = point(1) + dx;

y = point(2) + dy;

if x > 0 && x <= cols && y > 0 && y <= rows && ~visited(y,x)

diff = abs(double(img(y,x)) - seed_val);

if diff < threshold

region(y,x) = true;

queue(end+1, :) = [x, y]; % thêm vào hàng đợi

end

visited(y,x) = true;

end

end

end

end

% Hiển thị kết quả

figure;

imshow(region);

title('Vùng được phân đoạn bằng Region Growing');

>>
```

![imgs](/imgs/Pasted%20image%2020250706232618.png)

![imgs](/imgs/Pasted%20image%2020250706232607.png)


**Phân vùng ảnh (image segmentation)** là một bước nền tảng trong xử lý ảnh, đặc biệt trong các ứng dụng nhận dạng đối tượng, theo dõi chuyển động, trích xuất đặc trưng và truy vấn cơ sở dữ liệu hình ảnh. Mục tiêu của phân vùng là chia ảnh thành các vùng đồng nhất và liên kết, dựa trên đặc trưng màu sắc, hình dạng hoặc kết cấu, mà không cần đến kiến thức bổ sung về các đối tượng cụ thể trong ảnh. Đối với ảnh màu, các vùng đồng nhất thường liên quan đến sự tương đồng về màu sắc hoặc kết cấu màu. Khác với pixel đơn lẻ, các vùng sau khi phân đoạn có thể được mô tả bằng các thuộc tính hình học và thống kê, điều này giúp cho các bước xử lý tiếp theo trở nên hiệu quả hơn.

Một trong những kỹ thuật được áp dụng phổ biến trong phân đoạn ảnh màu là **phân cụm trong không gian màu**. Đây là phương pháp chia ảnh thành các nhóm pixel (cluster) có màu sắc tương tự nhau, bằng cách sử dụng các thuật toán phân cụm như **k-means**. Trong kỹ thuật này, mỗi pixel được xem là một điểm trong không gian ba chiều RGB, và thuật toán tìm cách gom các điểm này vào các cụm sao cho khoảng cách nội bộ trong từng cụm là nhỏ nhất. K-means yêu cầu người dùng xác định trước số lượng cụm k và các tâm cụm khởi tạo, điều này ảnh hưởng đáng kể đến kết quả. Các bước của thuật toán bao gồm gán mỗi pixel vào cụm gần nhất, cập nhật tâm cụm và lặp lại cho đến khi hội tụ. Tuy nhiên, do không xét đến thông tin không gian (tức vị trí của pixel trong ảnh), kỹ thuật này dễ bị ảnh hưởng bởi nhiễu và có thể gây ra hiện tượng phân đoạn quá mức (oversegmentation).

![imgs](/imgs/Pasted%20image%2020250706233415.png)

![imgs](/imgs/Pasted%20image%2020250706233426.png)


Một hướng tiếp cận khác có tính chất xây dựng hơn là **kỹ thuật phân vùng dựa trên vùng (region-based techniques)**, trong đó nổi bật là **Region Growing**. Phương pháp này bắt đầu từ một hoặc nhiều điểm hạt giống (seeds), sau đó mở rộng vùng bằng cách thêm các pixel lân cận có đặc trưng màu sắc tương tự. Trong phiên bản cổ điển, điều kiện đồng nhất (homogeneity criterion) thường dựa trên khoảng cách Euclidean giữa màu sắc của pixel xét và màu trung bình của vùng hiện tại. Nếu khoảng cách này nhỏ hơn ngưỡng định sẵn, pixel được thêm vào vùng, và thông số vùng được cập nhật. Quá trình tiếp tục cho đến khi không còn pixel nào thỏa mãn điều kiện mở rộng. Phân vùng theo cách này có ưu điểm là vừa xét đến độ tương đồng màu, vừa xét đến mối liên kết không gian, cho ra kết quả tự nhiên hơn so với phân cụm thuần túy.

![imgs](/imgs/Pasted%20image%2020250706233437.png)

Hai biến thể chính của region growing là **có hạt giống (seeded)** và **không có hạt giống (unseeded)**. Ở phương pháp có hạt giống, người dùng hoặc hệ thống sẽ xác định trước các điểm bắt đầu vùng (seeds), sau đó từng vùng sẽ được mở rộng dựa trên điều kiện đồng nhất. Hiệu quả của phương pháp này phụ thuộc rất lớn vào vị trí của các seed. Nếu seed được đặt vào điểm nhiễu hoặc ở rìa đối tượng, kết quả phân đoạn có thể bị sai lệch hoặc chia thành nhiều vùng không mong muốn. Để khắc phục điều này, các kỹ thuật lựa chọn seed tự động đã được đề xuất, như dựa trên histogram màu, vị trí đỉnh của ảnh Voronoi (liên quan đến khoảng cách từ rìa đối tượng), hoặc các điểm thu hút thị giác từ mô hình chú ý (visual attention models).

Phương pháp **unseeded region growing** là một dạng tự động hoàn toàn. Mỗi pixel trong ảnh ban đầu được xem như một vùng đơn lẻ. Sau đó, các pixel được hợp nhất dần với các vùng lân cận nếu thỏa mãn tiêu chí về màu sắc và liên kết không gian. Việc hợp nhất này có thể được thực hiện qua quét ảnh theo nhiều hướng, như từ trái qua phải hoặc ngược lại. Tuy nhiên, kết quả của unseeded region growing có thể phụ thuộc vào thứ tự quét pixel, do đó các kỹ thuật song song hoặc tái thiết kế thuật toán là cần thiết nếu muốn đảm bảo tính độc lập với thứ tự xử lý.

![imgs](/imgs/Pasted%20image%2020250706233451.png)

Sau bước phân đoạn ban đầu, nhiều ảnh sẽ có hiện tượng **phân đoạn quá mức (oversegmentation)** do nhiễu hoặc do các chi tiết nhỏ. Để cải thiện kết quả, các bước **xử lý hậu kỳ (postprocessing)** được áp dụng. Kỹ thuật phổ biến là loại bỏ hoặc hợp nhất các vùng nhỏ dựa trên ngưỡng diện tích hoặc độ tương đồng màu với vùng lân cận. Việc lựa chọn ngưỡng cần phải linh hoạt vì nếu quá lớn sẽ loại bỏ luôn cả những chi tiết quan trọng, còn nếu quá nhỏ thì không hiệu quả. Một số phương pháp dùng tiêu chí như histogram màu, khoảng cách Fisher, hoặc đồ thị vùng lân cận (Region Adjacency Graph – RAG) để xác định vùng nào nên hợp nhất.

Một vấn đề khác cũng ảnh hưởng đến độ chính xác của phân đoạn là **bóng đổ và vùng sáng chói (shadows and highlights)**. Chúng có thể làm sai lệch đặc trưng màu sắc của vùng, dẫn đến chia sai vùng đối tượng. Để khắc phục, các phương pháp sử dụng các không gian màu khác như HSI hoặc CIE L*a*b* (phù hợp với thị giác con người hơn RGB) đã được nghiên cứu. Ngoài ra, một kỹ thuật khá hiệu quả là sử dụng **góc giữa hai vector màu trong không gian RGB**, thay vì khoảng cách tuyến tính. Cách làm này giúp làm giảm ảnh hưởng của độ sáng và tập trung vào thành phần sắc độ thực sự.

Để đánh giá chất lượng phân đoạn, ngoài đánh giá chủ quan bởi chuyên gia, một số **chỉ số định lượng** đã được đề xuất. Trong đó, chỉ số Q(I) và VM được sử dụng để so sánh giữa các kỹ thuật phân đoạn. Kết quả thực nghiệm cho thấy region growing (đặc biệt là unseeded version) thường cho kết quả tốt hơn so với k-means, nếu đánh giá theo chỉ số Q(I).