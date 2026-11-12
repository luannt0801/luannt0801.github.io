---
layout: post
title: "Dev Cheat Sheet"
subtitle: "Tổng hợp các câu lệnh, script và thư viện hữu ích giúp tối ưu quy trình quản lý Git và môi trường code."
date: 2021-07-23
author: Nguyen Thanh Luan
categories:
  - Programming
cover: /assets/imgs_post/dev_cheatsheet/coding-memes-19-6-9-2025.jpg
cover_alt: "Ảnh cover minh hoạ"
---


Bài viết này tổng hợp các câu lệnh terminal, script tự động hóa và công cụ quản lý dependencies (như `pip`, `conda`, `git`) thường dùng trong quá trình phát triển phần mềm. Đây là những thao tác rất hữu ích để giữ cho dự án gọn gàng nhưng đôi khi ít dùng tới nên dễ quên—lưu lại tại đây để tiện copy và sử dụng ngay khi cần.


## 1. Auto download all branch của repo và create gitworktree folder path tương ứng để quản lý các branch
   
*Powershell*
```bash
# 1. Khai báo URL repo và tên thư mục muốn tạo
$repoUrl   = "https://github.com/wormbat-behide/RF-Aware-3D-Digital-Map.git"
$targetDir = "RF-Aware-3D-Digital-Map"

# 2. Clone bare repo
git clone --bare $repoUrl "$targetDir/.bare"
Set-Location $targetDir

# 3. Trỏ .git sang .bare để chạy git bình thường trong thư mục này
Set-Content -Path ".git" -Value "gitdir: ./.bare" -NoNewline -Encoding ascii

# 4. Set fetch refspec chuẩn -> để branch remote nằm ở refs/remotes/origin/*
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin

# 5. Tạo worktree cho từng local branch (bare clone đã tải branch vào refs/heads/* sẵn)
git branch --format="%(refname:short)" | ForEach-Object {
    $branch = $_.Trim()
    if ($branch -and -not (Test-Path $branch)) {
        Write-Host "Đang tạo worktree cho branch: $branch"
        git worktree add $branch $branch
    }
}

# 6. Kiểm tra
git worktree list
```


*Ubuntu*
```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Khai báo URL repo và tên thư mục muốn tạo
repoUrl="https://github.com/wormbat-behide/Wombat.git"
targetDir="Wombat"

# 2. Clone bare repo
git clone --bare "$repoUrl" "$targetDir/.bare"
cd "$targetDir"

# 3. Trỏ .git sang .bare để chạy git bình thường trong thư mục này
echo "gitdir: ./.bare" > .git

# 4. Set fetch refspec chuẩn -> để branch remote nằm ở refs/remotes/origin/*
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin

# 5. Tạo worktree cho từng local branch (bare clone đã tải branch vào refs/heads/* sẵn)
git branch --format="%(refname:short)" | while read -r branch; do
    branch=$(echo "$branch" | xargs)  # trim whitespace
    if [ -n "$branch" ] && [ ! -d "$branch" ]; then
        echo "Đang tạo worktree cho branch: $branch"
        git worktree add "$branch" "$branch"
    fi
done

# 6. Kiểm tra
git worktree list
```

## 2. Quản lý các dependencies của dự án

Các thư viện và dependencies của một project nên được quản lý thông qua các công cụ như `conda`, `uv`, `venv`,... để dễ dàng cài đặt, tái tạo môi trường và version control.

Thông thường, các dependencies được khai báo thông qua các file cấu hình:

- `environment.yml`: cấu hình môi trường của Conda.
- `requirements.txt`: danh sách các Python packages, thường được sử dụng với pip và venv.
- `pyproject.toml`: file cấu hình project, khai báo dependencies và metadata, được sử dụng bởi các công cụ như uv, Poetry,...
- `uv.lock`: lock file do uv tạo ra, ghi lại phiên bản cụ thể của dependencies và các dependencies bắc cầu (transitive dependencies).

Tùy vào công cụ quản lý môi trường, ta sẽ có cách export dependencies khác nhau.

Tuy nhiên, có một vấn đề thường gặp: khi cài đặt một thư viện, package manager có thể tự động cài thêm nhiều dependencies đi kèm. Nếu sử dụng `pip freeze` hoặc export toàn bộ môi trường, danh sách thu được sẽ bao gồm cả những package không được khai báo hoặc sử dụng trực tiếp trong code.

Điều này khiến file dependencies trở nên khá dài và khó quản lý.

- Direct dependencies: Các thư viện được project khai báo hoặc sử dụng trực tiếp.
- Transitive dependencies: Các thư viện được cài đặt tự động để đáp ứng dependencies của những thư viện khác.

Nếu mục tiêu là chỉ export các thư viện được sử dụng trực tiếp trong source code, tôi thường sử dụng `pipreqs`.

### 2.1. Sử dụng pipreqs

`pipreqs` phân tích các câu lệnh import trong source code để xác định những thư viện được sử dụng, sau đó tạo file `requirements.txt`.

Cài đặt:

```bash
pip install pipreqs
```

Export dependencies:

```bash
pipreqs . --force
```

Trong đó:

- `.`: thư mục source code cần phân tích.
- `--force`: ghi đè file `requirements.txt` nếu đã tồn tại.

Nếu chỉ muốn lấy tên thư viện mà không cố định version:

```
pipreqs . --force --mode no-pin
```

Ví dụ, project có sử dụng:

```
import numpyimport pandasimport torch
```

Thì `pipreqs` sẽ tạo file `requirements.txt` tương ứng, thay vì export toàn bộ các package đang được cài đặt trong environment.

**Lưu ý:** `pipreqs` phân tích import trong source code, không phải dependency manifest hoàn chỉnh. Một số thư viện được import động, sử dụng thông qua plugin hoặc chỉ xuất hiện trong các file cấu hình có thể không được phát hiện. Ngoài ra, tên package trên PyPI đôi khi khác tên module được import.

### 2.2. Export dependencies theo từng công cụ quản lý môi trường

Ngoài `pipreqs`, mỗi công cụ quản lý môi trường đều có cơ chế export riêng.


| Công cụ      | Lệnh export                       | Đặc điểm                                             |
| ------------ | --------------------------------- | ---------------------------------------------------- |
| `pipreqs`    | `pipreqs . --force`               | Phân tích import trong source code                   |
| `conda`      | `conda env export --from-history` | Export packages được cài đặt trực tiếp               |
| `venv / pip` | `pip freeze`                      | Export toàn bộ packages trong environment            |
| `uv`         | `uv export`                       | Export từ lock file, bao gồm dependencies đã resolve |
| `Poetry`     | `poetry export`                   | Export dependencies từ Poetry lock                   |

1\. **Conda**

Export toàn bộ environment:

```
conda env export > environment.yml
```

Chỉ export các package được cài đặt trực tiếp thông qua Conda, không bao gồm toàn bộ dependencies tự động resolve:

```
conda env export --from-history > environment.yml
```

Với các phiên bản Conda mới, có thể sử dụng:

```
conda export --from-history --format=environment-yaml --file=environment.yml
```

2\. **venv / pip**

`venv` chỉ là công cụ tạo virtual environment, không trực tiếp quản lý dependencies. Thông thường, chúng ta sử dụng pip để cài đặt và quản lý packages.

Export toàn bộ packages trong environment hiện tại:

```
pip freeze > requirements.txt
```

Hoặc chỉ lấy các packages thuộc project thông qua `pipreqs`:

```
pipreqs . --force
```

Lưu ý: `pip freeze` ghi lại cả direct và transitive dependencies, trong khi `pipreqs` phân tích import trong source code.

3\. **uv**

Đối với uv, dependencies được khai báo trong `pyproject.toml`, còn `uv.lock` lưu lại kết quả resolve dependencies với các phiên bản cụ thể.

Export từ `uv.lock` sang `requirements.txt`:

```
uv export --format requirements.txt --output-file requirements.txt
```

Nếu muốn giữ nguyên kết quả đã lock, không thực hiện re-lock trước khi export:

```
uv export --frozen --format requirements.txt --output-file requirements.txt
```

Tuy nhiên, cần lưu ý `uv export` vẫn export cả transitive dependencies. Nếu muốn quản lý dependencies trực tiếp, nên khai báo chúng trong `pyproject.toml` thay vì phụ thuộc vào việc phân tích source code.

4\. **Poetry**

Nếu project sử dụng Poetry, có thể export dependencies sang định dạng tương thích với pip:

```
poetry export -f requirements.txt -o requirements.txt
```

Để chỉ export dependencies chính, không bao gồm các dependencies bắc cầu:

```
poetry export --only main -f requirements.txt --without-hashes -o requirements.txt
```

Lưu ý: Lệnh trên yêu cầu Poetry Export Plugin nếu phiên bản Poetry đang sử dụng chưa tích hợp sẵn chức năng export.
