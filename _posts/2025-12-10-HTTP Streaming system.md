---
layout: post
title: "HTTP Streaming system"
date: 10-122025
author: Nguyen Thanh Luan
categories:
  - Computer Science
---

### This tutorial walks you through the steps to set up a basic HTTP streaming system using open-source tools. HTTP streaming is ideal for delivering audio or video content over the internet. We'll use the following tools:

1. **NGINX with RTMP Module**: A lightweight, high-performance web server that can be configured for streaming.
2. **FFmpeg**: A powerful media handling library for encoding and streaming.
3. **VLC Media Player**: To test and play back the stream.

### Nginx

Nginx là một web server mã nguồn mở, đồng thời cũng là reverse proxy và load balancer rất phổ biến trong hệ thống web hiện đại. Nó được thiết kế theo mô hình event-driven, bất đồng bộ, cho phép xử lý hàng chục nghìn kết nối đồng thời với mức tiêu thụ tài nguyên thấp. Nhờ đặc điểm này, Nginx đặc biệt phù hợp cho các hệ thống có lưu lượng truy cập lớn, yêu cầu độ ổn định và hiệu năng cao.

![](Pasted%20image%2020260122231648.png)

Về mặt chức năng, Nginx thường được sử dụng để phục vụ nội dung tĩnh như HTML, CSS, JavaScript, hình ảnh, video. Khả năng xử lý file tĩnh của Nginx nhanh và hiệu quả hơn nhiều so với việc để backend application trực tiếp xử lý. Trong các kiến trúc hiện đại, Nginx hiếm khi đứng một mình mà thường đóng vai trò lớp front, đứng trước các ứng dụng backend viết bằng Java, Node.js, Python, PHP hoặc Go.

Một ứng dụng rất phổ biến của Nginx trong industry hiện nay là reverse proxy. Nginx nhận request từ client, xử lý các vấn đề như SSL/TLS, nén, giới hạn tốc độ, sau đó chuyển request vào backend. Cách làm này giúp backend đơn giản hơn, tăng bảo mật vì backend không lộ trực tiếp ra Internet, đồng thời dễ mở rộng hệ thống khi số lượng người dùng tăng.

Nginx cũng được dùng rộng rãi như một load balancer ở tầng ứng dụng. Nó phân phối traffic đến nhiều backend server theo các thuật toán khác nhau như round-robin, least connections hoặc dựa trên IP. Trong thực tế, nhiều hệ thống production dùng Nginx để cân bằng tải cho các cụm server chạy microservices hoặc các cụm ứng dụng container, giúp hệ thống chịu lỗi tốt hơn và dễ scale theo chiều ngang.

Trong kiến trúc microservices và cloud-native, Nginx thường xuất hiện ở vai trò API Gateway hoặc Ingress Controller. Trong môi trường Kubernetes, Nginx Ingress Controller là một trong những giải pháp phổ biến nhất để định tuyến request từ bên ngoài vào các service bên trong cluster. Nó đảm nhiệm việc routing theo path hoặc domain, termination SSL và áp dụng các chính sách bảo mật ở mức gateway.

Caching là một ứng dụng quan trọng khác của Nginx trong thực tế. Nginx có thể cache response từ backend hoặc upstream server, giảm đáng kể số request phải xử lý lại, từ đó tăng tốc độ phản hồi và giảm tải cho hệ thống phía sau. Điều này rất phổ biến trong các website tin tức, thương mại điện tử hoặc hệ thống có nhiều nội dung ít thay đổi nhưng lượng truy cập lớn.

Trong industry, Nginx được sử dụng bởi rất nhiều công ty lớn và nền tảng phổ biến như các trang thương mại điện tử, hệ thống streaming, SaaS, fintech và các nền tảng mạng xã hội. Họ tận dụng Nginx để xử lý traffic ở edge, bảo vệ hệ thống trước các đợt traffic spike, và làm lớp trung gian ổn định giữa người dùng và backend phức tạp phía sau.

Tổng quan, Nginx không chỉ là một web server đơn thuần mà là một thành phần hạ tầng cốt lõi trong các hệ thống web hiện đại. Nó đóng vai trò cầu nối giữa client và backend, giúp hệ thống nhanh hơn, an toàn hơn và dễ mở rộng hơn, nên gần như là công cụ “mặc định” trong rất nhiều kiến trúc industry hiện nay.

#### RTMP
- Real-Time Messaging Protocol (RTMP)
- HLS
- DASH

https://nginx-rtmp.blogspot.com/

About

RTMP ([Real-Time Messaging Protocol](https://www.google.com/search?sca_esv=0b64f9733fed06e0&sxsrf=ANbL-n6bzQ1qglLhlR7X6-qaDj2V_qelNA%3A1769101909667&q=Real-Time+Messaging+Protocol&source=lnms&fbs=ADc_l-ZXQWBHI_L0epjkf31fijnbXSPRt3UPEhp-KmUrvgDudp8REbOZqjulWRZWTin-MPwWQi_mmqeKIyC_bGEAJGy8DBEB6JrBehVFa2G_-PO5fTpL9LR9pBDRes3wxuVI6XE50yk_cIagCwjbVwun8wbJQK5F8DLk0d_rKTMtRQXFZk1nlADrPBdGQICKtELkgRYHYu9yOdLR28Dmks0TbEx1qGu8AHv93ny1OZJA5cDEnESRSZLDiIQoVbdZZ4_0ZLmLYMmg&sa=X&ved=2ahUKEwi-_uOg0p-SAxXOZfUHHaZrJjoQgK4QegQIARAB&biw=2133&bih=982&dpr=0.9&aic=0)) là giao thức truyền phát âm thanh, video và dữ liệu theo thời gian thực qua Internet, ban đầu được Macromedia (sau này là Adobe) phát triển cho Flash nhưng vẫn là nền tảng quan trọng trong streaming hiện đại, chủ yếu dùng để **đưa nguồn cấp dữ liệu (ingestion)** từ bộ mã hóa đến máy chủ phát trực tiếp nhờ khả năng kết nối liên tục và độ trễ thấp (low-latency). RTMP chia nhỏ dữ liệu thành các gói nhỏ, đảm bảo phân phối ổn định, và có các biến thể như RTMPS (bảo mật SSL) hay RTMPT (qua HTTP) để vượt tường lửa, hỗ trợ streaming trực tiếp sự kiện, hội thảo trên web.

![](Pasted%20image%2020260123001158.png)

RTMP hoạt động bằng cách
- Giao tiếp TCP: tạo kết nối bền vững giữa client (bộ mã hóa) và server, đảm bảo dữ liệu được gửi đi đáng tin cậy.
- Data Chunking: chia media thành các chunk nhỏ, giúp quản lý và truyền tải hiệu quả hơn, giảm gián đoạn.
- Low Latency: Độ trễ 4-5s so với thời gian thực
- Simulate Channel: Sử dụng các channel ảo khác nhau để xử lý các loại dữ liệu riêng biệt (âm thanh, video, ...)


```bash
Attaching to ffmpeg-c, nginx-c
nginx-c  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
nginx-c  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
nginx-c  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
nginx-c  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
nginx-c  | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
nginx-c  | /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
nginx-c  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
nginx-c  | 20-envsubst-on-templates.sh: Running envsubst on /etc/nginx/templates/rtmp.conf.template to /etc/nginx/conf.d/rtmp.conf
nginx-c  | 20-envsubst-on-templates.sh: Running envsubst on /etc/nginx/templates/http.conf.template to /etc/nginx/conf.d/http.conf
nginx-c  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
nginx-c  | /docker-entrypoint.sh: Configuration complete; ready for start up
nginx-c  | 2026/01/22 19:11:44 [emerg] 1#1: "worker_processes" directive is not allowed here in /etc/nginx/nginx.conf:10
nginx-c  | nginx: [emerg] "worker_processes" directive is not allowed here in /etc/nginx/nginx.conf:10
ffmpeg-c  | ffmpeg version 6.1.1-3ubuntu5 Copyright (c) 2000-2023 the FFmpeg developers
ffmpeg-c  |   built with gcc 13 (Ubuntu 13.2.0-23ubuntu3)
ffmpeg-c  |   configuration: --prefix=/usr --extra-version=3ubuntu5 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --arch=amd64 --enable-gpl --disable-stripping --disable-omx --enable-gnutls --enable-libaom --enable-libass --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libglslang --enable-libgme --enable-libgsm --enable-libharfbuzz --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzimg --enable-openal --enable-opencl --enable-opengl --disable-sndio --enable-libvpl --disable-libmfx --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-chromaprint --enable-frei0r --enable-ladspa --enable-libbluray --enable-libjack --enable-libpulse --enable-librabbitmq --enable-librist --enable-libsrt --enable-libssh --enable-libsvtav1 --enable-libx264 --enable-libzmq --enable-libzvbi --enable-lv2 --enable-sdl2 --enable-libplacebo --enable-librav1e --enable-pocketsphinx --enable-librsvg --enable-libjxl --enable-shared
ffmpeg-c  |   libavutil      58. 29.100 / 58. 29.100
ffmpeg-c  |   libavcodec     60. 31.102 / 60. 31.102
ffmpeg-c  |   libavformat    60. 16.100 / 60. 16.100
ffmpeg-c  |   libavdevice    60.  3.100 / 60.  3.100
ffmpeg-c  |   libavfilter     9. 12.100 /  9. 12.100
ffmpeg-c  |   libswscale      7.  5.100 /  7.  5.100
ffmpeg-c  |   libswresample   4. 12.100 /  4. 12.100
ffmpeg-c  |   libpostproc    57.  3.100 / 57.  3.100
ffmpeg-c  | Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'videoplayback.mp4':
ffmpeg-c  |   Metadata:
ffmpeg-c  |     major_brand     : mp42
ffmpeg-c  |     minor_version   : 0
ffmpeg-c  |     compatible_brands: isommp42
ffmpeg-c  |     encoder         : Google
ffmpeg-c  |   Duration: 00:04:29.79, start: 0.000000, bitrate: 670 kb/s
ffmpeg-c  |   Stream #0:0[0x1](und): Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 640x360 [SAR 1:1 DAR 16:9], 572 kb/s, 30 fps, 30 tbr, 15360 tbn (default)
ffmpeg-c  |     Metadata:
ffmpeg-c  |       handler_name    : ISO Media file produced by Google Inc.
ffmpeg-c  |       vendor_id       : [0][0][0][0]
ffmpeg-c  |   Stream #0:1[0x2](eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 96 kb/s (default)
ffmpeg-c  |     Metadata:
ffmpeg-c  |       handler_name    : ISO Media file produced by Google Inc.
ffmpeg-c  |       vendor_id       : [0][0][0][0]
ffmpeg-c  | [tcp @ 0x5640ad5bfd00] Failed to resolve hostname nginx-c: Name or service not known
ffmpeg-c  | [rtmp @ 0x5640ac79c500] Cannot open connection tcp://nginx-c:1935?tcp_nodelay=0
ffmpeg-c  | [out#0/flv @ 0x5640ac648a40] Error opening output rtmp://nginx-c/hls/my-video: Input/output error
ffmpeg-c  | Error opening output file rtmp://nginx-c/hls/my-video.
ffmpeg-c  | Error opening output files: Input/output error
nginx-c exited with code 1
ffmpeg-c exited with code 251
```

