---
layout: post
author: Nguyen Thanh Luan
day create: 09-09-2024
title: Design Pattern trong AI/ML
date: 09-09-2024
categories:
  - Programming
---
Software Design Pattern là các giải pháp thiết kế đã được kiểm chứng, mang tính tái sử dụng cao, dùng để giải quyết những vấn đề lặp đi lặp lại trong quá trình thiết kế và phát triển phần mềm. Chúng không phải là đoạn code hoàn chỉnh hay thư viện có thể copy–paste trực tiếp, mà là các khuôn mẫu tư duy (design templates) mô tả cách tổ chức class, object, và relationship giữa chúng sao cho hệ thống trở nên linh hoạt, dễ mở rộng, dễ bảo trì và dễ hiểu hơn.

Nguồn gốc của khái niệm Design Pattern trong phần mềm bắt đầu từ kiến trúc xây dựng (Christopher Alexander), sau đó được áp dụng vào khoa học máy tính và phổ biến rộng rãi bởi cuốn sách kinh điển “Design Patterns: Elements of Reusable Object-Oriented Software” của nhóm Gang of Four (GoF). Từ đó đến nay, software design pattern đã trở thành nền tảng quan trọng trong lập trình hướng đối tượng và cả các kiến trúc hiện đại như microservices, cloud-native hay event-driven systems.

### 1. Phân loại các kiểu Design Pattern

#### a) Creational Patterns

Creational Patterns là các design pattern tập trung vào **cách tạo ra đối tượng (object)** sao cho hệ thống trở nên **linh hoạt, dễ mở rộng và ít phụ thuộc chặt chẽ (low coupling)**. Thay vì để code khởi tạo object một cách trực tiếp và rải rác khắp nơi, creational patterns đóng gói (encapsulate) logic khởi tạo, giúp việc thay đổi, mở rộng hoặc tái sử dụng trở nên an toàn và có kiểm soát hơn.

Vấn đề cốt lõi mà Creational Patterns giải quyết là:  
khi hệ thống lớn dần, việc `new` object ở khắp nơi sẽ khiến code phụ thuộc chặt vào class cụ thể. Chỉ cần thay đổi constructor, thêm tham số, hoặc thay thế implementation, ta có thể phải sửa rất nhiều chỗ. Điều này đặc biệt nguy hiểm khi build framework hoặc các project có vòng đời dài.

Trong thực tế, Creational Patterns xuất hiện **rất nhiều trong framework**, vì framework cần:
- Cho phép user mở rộng mà không sửa code lõi
- Che giấu chi tiết khởi tạo phức tạp
- Quản lý vòng đời object (lifecycle)
- Tách “cách dùng” khỏi “cách tạo”

Các Creational Patterns phổ biến gồm: Singleton, Factory Method, Abstract Factory, Builder và Prototype. 

Singleton Pattern dùng khi hệ thống **chỉ nên có duy nhất một instance** của một class. Trong framework, Singleton thường được dùng cho logger, config, cache manager, connection pool hoặc application context. Mục tiêu là đảm bảo mọi nơi trong hệ thống đều dùng chung một trạng thái nhất quán.

Ví dụ một config manager trong project Python:

```python
class AppConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.settings = {}
        return cls._instance

    def set(self, key, value):
        self.settings[key] = value

    def get(self, key):
        return self.settings.get(key)


config1 = AppConfig()
config2 = AppConfig()

config1.set("debug", True)
print(config2.get("debug"))  # True
```

Trong framework, cách làm này đảm bảo toàn bộ hệ thống đọc cùng một cấu hình, tránh tình trạng mỗi module giữ một bản config khác nhau.

Factory Method Pattern được dùng khi framework **không muốn hoặc không thể biết trước class cụ thể cần tạo**, mà giao quyền quyết định đó cho subclass hoặc logic runtime. Đây là pattern cực kỳ quan trọng trong framework design.

Ví dụ, một framework web cần tạo controller dựa trên route:
```python
class HomeController:
    def handle(self):
        return "Home Page"


class AboutController:
    def handle(self):
        return "About Page"


class ControllerFactory:
    @staticmethod
    def create_controller(name):
        if name == "home":
            return HomeController()
        elif name == "about":
            return AboutController()
        else:
            raise ValueError("Controller not found")
```

Framework chỉ cần gọi factory:

```python
controller = ControllerFactory.create_controller("home")
print(controller.handle())
```

Khi user thêm controller mới, framework chỉ cần mở rộng factory, không cần sửa code xử lý request chính. Đây chính là cách nhiều web framework hoạt động ở mức đơn giản.

Abstract Factory Pattern nâng cấp Factory Method lên một mức cao hơn. Nó được dùng khi hệ thống cần tạo **cả một họ (family) các object liên quan với nhau**, đảm bảo chúng tương thích. Trong framework, Abstract Factory thường xuất hiện khi hỗ trợ nhiều platform, database hoặc UI theme.

Ví dụ framework ORM hỗ trợ nhiều database:
```python
class Connection:
    pass


class Cursor:
    pass


class MySQLConnection(Connection):
    pass


class MySQLCursor(Cursor):
    pass


class PostgresConnection(Connection):
    pass


class PostgresCursor(Cursor):
    pass


class DatabaseFactory:
    def create_connection(self):
        raise NotImplementedError

    def create_cursor(self):
        raise NotImplementedError


class MySQLFactory(DatabaseFactory):
    def create_connection(self):
        return MySQLConnection()

    def create_cursor(self):
        return MySQLCursor()


class PostgresFactory(DatabaseFactory):
    def create_connection(self):
        return PostgresConnection()

    def create_cursor(self):
        return PostgresCursor()

```


Framework chỉ làm việc với interface `DatabaseFactory`. Khi đổi database, toàn bộ hệ thống vẫn hoạt động mà không cần sửa logic nghiệp vụ.

Builder Pattern được dùng khi object có **nhiều thuộc tính, nhiều bước khởi tạo**, và constructor trở nên phức tạp, khó đọc. Trong project lớn hoặc framework, Builder giúp việc tạo object rõ ràng, từng bước và tránh lỗi do truyền sai tham số.

Ví dụ build một HTTP request object:

```python
class Request:
    def __init__(self):
        self.url = None
        self.method = None
        self.headers = {}
        self.body = None


class RequestBuilder:
    def __init__(self):
        self.request = Request()

    def set_url(self, url):
        self.request.url = url
        return self

    def set_method(self, method):
        self.request.method = method
        return self

    def add_header(self, key, value):
        self.request.headers[key] = value
        return self

    def set_body(self, body):
        self.request.body = body
        return self

    def build(self):
        return self.request

```

Khi sử dụng:
```python
request = (
    RequestBuilder()
    .set_url("https://api.example.com")
    .set_method("POST")
    .add_header("Authorization", "Bearer token")
    .set_body({"name": "Alice"})
    .build()
)
```

Builder Pattern rất phổ biến trong framework HTTP client, ORM query builder và configuration system.

Prototype Pattern dùng khi việc tạo object mới **tốn kém chi phí**, và ta muốn clone từ một object mẫu có sẵn. Trong framework, prototype thường dùng cho cache template, model mặc định hoặc cấu hình phức tạp.

```python
import copy

class User:
    def __init__(self, role, permissions):
        self.role = role
        self.permissions = permissions


admin_prototype = User("admin", ["read", "write", "delete"])

new_admin = copy.deepcopy(admin_prototype)
new_admin.permissions.append("manage")
```

Thay vì build lại từ đầu, ta clone từ prototype và chỉnh sửa nhẹ, giúp code gọn và hiệu quả hơn.

Tổng kết lại, Creational Patterns đóng vai trò nền tảng trong việc xây dựng framework và project lớn. Chúng giúp framework che giấu chi tiết khởi tạo, giảm sự phụ thuộc giữa các module, kiểm soát vòng đời object và mở rộng hệ thống một cách an toàn. Khi build framework, hầu hết các “entry point” quan trọng như controller, service, repository, config, middleware… đều dựa trên Creational Patterns.

Điều quan trọng không phải là áp dụng tất cả các pattern, mà là **nhận ra khi nào việc khởi tạo object trở thành vấn đề**, từ đó chọn đúng creational pattern để giải quyết. Khi dùng đúng chỗ, Creational Patterns giúp code sạch hơn, framework dễ mở rộng hơn và project bền vững hơn theo thời gian.



b) Structural Patterns
c) Behavioral Patterns 
