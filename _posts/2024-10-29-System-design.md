---
layout: post
title: "System design"
subtitle: "Thiết kế hệ thống, framework đối với Data scientist giúp thuận lợi cho việc thử nghiệm, benchmark các thuật toán và đánh giá kết quả."
date: 2024-10-29
author: Nguyen Thanh Luan
categories:
  - Programming
tags: [Computer science, System, Design pattern]
description: "Viết về các kiến trúc, khái niệm trong system design và ứng dụng thực tế khi lập trình."
cover: /assets/imgs_post/system_design/image_f73a164e.jpeg
cover_alt: "Ảnh cover minh hoạ"
published: true
---

Trong phát triển phần mềm, System Design với Python thường được chia làm hai cấp độ chính: Low-Level Design - LLD tập trung vào lập trình hướng đối tượng và Design Patterns, và High-Level Design - HLD tập trung vào kiến trúc hệ thống phân tán, tính mở rộng (scalability) và hiệu năng.

## Low-Level Design (LLD)

### 1. Registry & Factory Pattern

Khi thiết kế framework, thường có nhiều implementation cùng sử dụng một interface chung. Ví dụ: cùng là một object xử lý render bản đồ, framework có thể hỗ trợ nhiều phương pháp render khác nhau như Ray Tracing hoặc Pixel-based Rendering.

Mặc dù mỗi engine có cách triển khai thuật toán riêng, chúng đều phải tuân thủ một interface thống nhất, chẳng hạn như method `engine.render()`.

Chính vì vậy, ta cần thiết kế **Registry** để đăng ký và quản lý các implementation khác nhau. Khi cần sử dụng, **Factory** sẽ chịu trách nhiệm khởi tạo đúng implementation dựa trên tên hoặc cấu hình được cung cấp.

→ Nhờ đó:
- Các thành viên trong team có thể phát triển những engine độc lập mà không ảnh hưởng đến framework core.
- Các engine có thể được thay thế linh hoạt mà không cần thay đổi logic xử lý chính.
- Dễ dàng kiểm thử, bảo trì và fix bug riêng cho từng implementation.
- Framework có thể mở rộng thêm engine mới mà không phải sửa đổi code hiện có (Open/Closed Principle).

#### 1.1. Base Class & Interface

Đầu tiên, định nghĩa một Base Class để quy định interface chung mà tất cả các engine phải tuân thủ.

```python
from abc import ABC, abstractmethod


class BaseEngine(ABC):

    def __init__(self, map, depth, dimensions):
        self.map = map
        self.depth = depth
        self.dimensions = dimensions

    @abstractmethod
    def render(self):
        """Render the map."""
        pass
```

Ở đây:
- `BaseEngine`: Định nghĩa contract chung cho tất cả engine.
- `render()`: Method bắt buộc phải được implement bởi các class kế thừa.
- `map`, `depth`, `dimensions`: Các thuộc tính đầu vào dùng chung.

#### 1.2. Implement các Engine

Mỗi engine sẽ kế thừa `BaseEngine` và triển khai thuật toán riêng của mình.

Ví dụ:

```python
class RayTracingEngine(BaseEngine):

    def __init__(self, map, depth, dimensions, num_rays):
        super().__init__(map, depth, dimensions)
        self.num_rays = num_rays

    def render(self):
        print(f"Rendering using Ray Tracing: {self.num_rays} rays")
        # Ray tracing implementation


class PixelEngine(BaseEngine):

    def __init__(self, map, depth, dimensions, pixel_size):
        super().__init__(map, depth, dimensions)
        self.pixel_size = pixel_size

    def render(self):
        print(f"Rendering using Pixel Engine: {self.pixel_size}")
        # Pixel-based rendering implementation
```

Điểm quan trọng: hai engine có thể có constructor và thuật toán khác nhau, nhưng bắt buộc cung cấp method `render()` theo interface của `BaseEngine`.

#### 1.3. Registry – Đăng ký các Engine

Registry chịu trách nhiệm lưu trữ các implementation đã được đăng ký và cho phép framework tra cứu chúng theo tên.

```python
class EngineRegistry:

    _registry = {}

    @classmethod
    def register(cls, name):

        def decorator(engine_cls):

            if name in cls._registry:
                raise KeyError(f"Engine '{name}' already registered")

            cls._registry[name] = engine_cls
            return engine_cls

        return decorator

    @classmethod
    def get(cls, name):

        if name not in cls._registry:
            raise KeyError(f"Engine '{name}' is not registered")

        return cls._registry[name]
```

Sử dụng decorator để đăng ký các engine:

```python
@EngineRegistry.register("ray_tracing")
class RayTracingEngine(BaseEngine):
    # Implementation
    ...


@EngineRegistry.register("pixel")
class PixelEngine(BaseEngine):
    # Implementation
    ...
```

Khi một class được khai báo với decorator `@EngineRegistry.register()`, class đó sẽ tự động được thêm vào Registry.

Registry lúc này có thể được hình dung như sau:

```python
{
    "ray_tracing": RayTracingEngine,
    "pixel": PixelEngine
}
```

#### 1.4. Factory – Khởi tạo Engine

Factory sử dụng Registry để tìm kiếm implementation và khởi tạo object tương ứng.

```python
class EngineFactory:

    @staticmethod
    def create(engine_type, **kwargs):

        engine_cls = EngineRegistry.get(engine_type)

        return engine_cls(**kwargs)
```

Ví dụ khởi tạo:

```python
engine = EngineFactory.create(
    engine_type="ray_tracing",
    map=map_data,
    depth=100,
    dimensions=(512, 512),
    num_rays=10000
)
```

Hoặc:

```python
engine = EngineFactory.create(
    engine_type="pixel",
    map=map_data,
    depth=100,
    dimensions=(512, 512),
    pixel_size=5
)
```

Factory không cần biết chi tiết cách từng engine hoạt động. Nó chỉ cần tìm đúng class trong Registry và truyền các tham số khởi tạo tương ứng.

#### 1.5. Sử dụng trong Framework

Đây là phần quan trọng nhất: Framework Core chỉ làm việc với interface chung, không phụ thuộc trực tiếp vào implementation cụ thể.

```python
class MapRenderer:

    def __init__(self, engine):
        self.engine = engine

    def run(self):
        return self.engine.render()
```

Sử dụng:

```python
engine = EngineFactory.create(
    engine_type="ray_tracing",
    map=map_data,
    depth=100,
    dimensions=(512, 512),
    num_rays=10000
)

renderer = MapRenderer(engine)
renderer.run()
```

Khi muốn chuyển sang Pixel Engine, chỉ cần thay đổi `engine_type` và các tham số tương ứng. Không cần sửa đổi `MapRenderer`.

#### 1.6. Luồng hoạt động của Registry & Factory Pattern

```text
            User Configuration
                    |
                    v
              EngineFactory
                    |
                    v
              EngineRegistry
                    |
             Lookup Engine Type
                    |
          +---------+---------+
          |                   |
          v                   v
   RayTracingEngine       PixelEngine
          |                   |
          +---------+---------+
                    |
                    v
               BaseEngine
                    |
               render()
                    |
                    v
               MapRenderer
                    |
                    v
                Output
```

**Phân chia trách nhiệm:**

| Component | Responsibility |
|---|---|
| `BaseEngine` | Định nghĩa interface chung |
| `RayTracingEngine` | Implement thuật toán Ray Tracing |
| `PixelEngine` | Implement thuật toán Pixel-based Rendering |
| `EngineRegistry` | Đăng ký và tra cứu implementation |
| `EngineFactory` | Khởi tạo engine theo yêu cầu |
| `MapRenderer` | Điều phối quá trình render thông qua interface chung |

**Nguyên tắc thiết kế:** Framework Core chỉ phụ thuộc vào `BaseEngine`, không phụ thuộc trực tiếp vào `RayTracingEngine` hay `PixelEngine`. Các implementation mới có thể được bổ sung thông qua Registry mà không cần thay đổi logic của Framework Core.