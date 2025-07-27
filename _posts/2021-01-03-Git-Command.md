---
layout: post
title: Git Command
date: 2020-01-05 10:00:00 +0700
author: Nguyen Thanh Luan
categories:
  - Programming
---
**Git** là một hệ thống quản lý phiên bản giúp theo dõi và lưu trữ lịch sử thay đổi của mã nguồn trong quá trình phát triển phần mềm. Với Git, lập trình viên có thể dễ dàng quay lại các phiên bản trước đó, so sánh thay đổi, làm việc song song trên nhiều nhánh (branches) mà không ảnh hưởng đến main code, và kết hợp (merge) các thay đổi khi hoàn tất.

Git cũng hỗ trợ làm việc nhóm hiệu quả thông qua việc đồng bộ mã nguồn giữa các máy tính qua các kho lưu trữ từ xa như GitHub, GitLab,... Nhờ đó, Git trở thành công cụ không thể thiếu trong quy trình phát triển phần mềm hiện đại, giúp tăng tính linh hoạt, an toàn và minh bạch trong quản lý mã nguồn.

Bài viết này mục đích lưu trữ các git command mà `ntl0801` thường dùng.
# Git Command

`git rebase -i` dùng để check xem các commit nào chưa có trên main.

`git branch -a` show các branch local và branch remote, branch remote thì sẽ có thêm origin/ten-branch còn lại là các branch local

`git status` dùng để check xem branch hiện tại có trạng thái như nào, có update gì so với branch remote ko.

`git fetch origin main` lệnh này sẽ update nhánh hiện tại với nhánh main trên remote nhưng không update vào nhánh main của local
Còn nếu muốn cập nhật luôn nhánh main ở local dù đang ở nhánh khác:
```
git fetch origin
git switch main
git pull origin main
```

**Sự khác biệt giữa git pull và git fetch**

`git fetch` dùng để tải dữ liệu từ remote về local (nhưng chưa merge vào nhánh local) --> Không merge
(An toàn để xem trước remote có gì mới)
`git pull` fetch + merge vào nhánh đang đứng --> có thể gây conflict
(Lấy code và nhập ngay vào nhánh đang làm việc)

`git remote prune origin` dùng để cập nhật các nhánh remote đã bị xóa (ở local lúc này vẫn còn connect các nhánh đó) --> cập nhật lại phía local.


### Các lệnh git cơ bản thường dùng

|Lệnh|Ý nghĩa|
|---|---|
|`git init`|Khởi tạo một Git repository mới trong thư mục hiện tại|
|`git clone <url>`|Tạo bản sao (clone) của một repository từ remote (thường là GitHub)|
|`git status`|Kiểm tra trạng thái của các file (đã thay đổi, staged hay chưa, v.v.)|
|`git add <file>`|Thêm file vào "staging area" để chuẩn bị commit|
|`git add .`|Thêm tất cả các file thay đổi vào staging|
|`git commit -m "message"`|Commit các thay đổi đã staged với mô tả|
|`git log`|Hiển thị lịch sử các commit|

### Git with branch

|Lệnh|Ý nghĩa|
|---|---|
|`git branch`|Xem danh sách các nhánh|
|`git branch <ten-nhanh>`|Tạo nhánh mới|
|`git checkout <ten-nhanh>`|Chuyển sang nhánh khác|
|`git checkout -b <ten-nhanh>`|Tạo và chuyển ngay sang nhánh mới|
|`git merge <ten-nhanh>`|Gộp nhánh `<ten-nhanh>` vào nhánh hiện tại|
|`git branch -d <ten-nhanh>`|Xoá nhánh (đã merge)|

### Git remote

|Lệnh|Ý nghĩa|
|---|---|
|`git remote -v`|Hiển thị remote repository đang kết nối|
|`git push`|Đẩy commit lên remote (GitHub, GitLab,...)|
|`git push origin <branch>`|Đẩy nhánh lên remote|
|`git pull`|Kéo code mới nhất từ remote về local|
|`git fetch`|Lấy dữ liệu từ remote nhưng **không** merge|

### Undo and restore

|Lệnh|Ý nghĩa|
|---|---|
|`git reset <file>`|Bỏ staging một file đã `git add`|
|`git reset --hard <commit>`|Reset về một commit cũ và xoá toàn bộ thay đổi sau đó|
|`git checkout -- <file>`|Khôi phục file về trạng thái lần commit cuối|
|`git revert <commit>`|Tạo commit đảo ngược lại commit đã chọn|

### Other commands

|Lệnh|Ý nghĩa|
|---|---|
|`git diff`|Hiển thị sự khác biệt giữa các file đã thay đổi|
|`git stash`|Lưu tạm thời các thay đổi chưa commit|
|`git stash pop`|Khôi phục lại thay đổi đã stash|
|`git tag <tagname>`|Gắn thẻ (tag) cho một commit cụ thể, thường dùng để đánh dấu phiên bản|


At last, you can `git push origin main --force` j4f =)))))))))))))))