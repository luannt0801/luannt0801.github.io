---
layout: post
author: Nguyen Thanh Luan
title: How to write a pyproject.toml file?
day create: 26-11-2023
date: 26-11-2023
categories:
  - Programming
---

# 1. `pyproject.toml` dùng để làm gì?

`pyproject.toml` là chuẩn mới để cấu hình việc **đóng gói (build)** và **phân phối (install)** một Python package.  
Nó thay thế vai trò của:

- `setup.py`
- `requirements.txt`
- `setup.cfg`

và gom tất cả vào **một file chuẩn PEP 621**.

Dự án của bạn đang dùng:

- **setuptools** để build
- **PEP 621** để khai báo metadata (tên package, version, tác giả...)
- **dependencies** được quản lý ngay trong file này

# 2. Cấu trúc của pyproject

## `[build-system]`
```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"
````

Phần này cho Python biết cần dùng **setuptools** để build package.  
Khi chạy `pip install .`, pip sẽ gọi backend này để đóng gói.

## `[project]` – Metadata của package

```toml
[project]
name = "wormbatnet"
version = "0.1.0"
description = "Wormbat Network ... 4G/5G ..."
authors = [{ name = "Luan", email = "ntl080102@gmail.com" }]
```

- `name` → tên package để import → `import wormbatnet`
- `version` → version của package
- `description` → mô tả hiển thị trên PyPI
- `authors` → list tác giả

## `keywords`

Để tìm kiếm trên PyPI, GitHub:

```toml
keywords = ["5G", "viettel", "reinforcement learning", "machine learning"]
```

## `requires-python`

```toml
requires-python = ">=3.10"
```

Project yêu cầu Python ≥ 3.10.

## `dependencies`

```toml
dependencies = [
    "alive-progress==3.3.0",
    "botorch==0.16.0",
    ...
]
```

Tất cả dependency sẽ tự động cài khi người dùng chạy:

```
pip install wormbatnet
```

hoặc

```
pip install .
```

Không còn cần `requirements.txt` nữa (nếu muốn thể thêm vào project vẫn được).

## `[project.urls]`

```toml
source = "https://github.com/luannt0801/WormbatNet.git"
```

Thông tin hiển thị trên PyPI (link source, docs…).

## `[tool.setuptools]`

```toml
[tool.setuptools]
package-dir = { "" = "src" }
```

Nghĩa là toàn bộ mã nguồn nằm trong thư mục `src`, theo chuẩn PEP 621:

```
/src/wormbatnet/
```

Cấu trúc project:

```
wormbatnet/
│ pyproject.toml
│ README.md
└── src/
	├── __init__.py
	├── ...
```

# 3. Cách **cài đặt** project

## Cài đặt cho development (editable mode)

Trong folder root:

```bash
pip install -e .
```

Ưu điểm:

- sửa code trong `src/wormbatnet` → chạy lại là nhận thay đổi ngay
## Cài đặt như một package bình thường

```bash
pip install .
```

# 4. Cách **build** và publish

Cài công cụ build:

```bash
pip install build twine
```

Build:

```bash
python -m build
```

Sau đó sẽ tạo:

```
dist/
  wormbatnet-0.1.0.tar.gz
  wormbatnet-0.1.0-py3-none-any.whl
```

# 5. Cách chạy package sau khi install

Giả sử package có module:

```python
from wormbatnet import simulator
simulator.run()
```

Chỉ cần import:

```python
python3 -c "import wormbatnet; print(wormbatnet.__version__)"
```

# 6. Nếu muốn tạo CLI (command line)

Ta thêm vào `[project]`:

```toml
[project.scripts]
wormbat = "wormbatnet.main:run"
```

Sau đó chỉ cần gọi:

```
wormbat
```

---
# Ví dụ
```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "wormbat"
version = "0.0.1"
description = "Wormbat Network is a framework for testing algorithms in 4G/5G Radio Cellular Network System."
authors = [
    { name = "Luan", email = "ntl080102@gmail.com" }
]

keywords = [
    "5G/6G",
    "wormbat",
    "reinforcement learning",
    "machine learning"
]

requires-python = ">=3.10"

dependencies = [
    "alive-progress==3.3.0",
    "botorch==0.16.0",
    "folium==0.20.0",
    "geographiclib==2.1",
    "geopy==2.4.1",
    "gpytorch==1.14.2",
    "graphemeu==0.7.2",
    "h3==4.3.1",
    "numpy==2.2.6",
    "openpyxl==3.1.5",
    "pandas==2.3.3",
    "psutil==7.0.0",
    "pygame==2.6.1",
    "pynvml==13.0.1",
    "pyparsing==3.2.0",
    "pytest==8.4.2",
    "PyYAML==6.0.2",
    "scipy==1.16.3",
    "tqdm==4.67.1",
    "matplotlib==3.10.7"
]

[project.urls]
source = "https://github.com/luannt0801/WormbatNet.git"
# documentation = "https://nvlabs.github.io/sionna/"
# issues = "https://github.com/nvlabs/sionna/issues"

[tool.setuptools]
package-dir = { "" = "src" }
```
