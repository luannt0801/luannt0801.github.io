---
layout: post
title: Modules - Lambdas - Decorators - Interators - Regular Expressions in Python
date: 2022-05-15 07:24:00 +0700
author: Nguyen Thanh Luan
categories: 
    - Programming
---

## Modules
Khi chương trình python dài và code chia thành nhiều files để bảo trì và sử dụng dễ dàng hơn và để có thể sử dụng lại nhiều hàm một cách tiện dụng mà không cần sao chép, định nghĩa nó vào chương trình Python đưa các định nghĩa vào một file và sử dụng chúng như một tập lệnh hoặc để trong một phiên bản tương tác của interpreter $$\rightarrow$$ File như vậy được gọi là một **module**

Module có thể được *import* vào một module khác hoặc main module.

**Định nghĩa** Module là tệp chưa các định nghĩa và function Python. Tên tệp là tên module có `.py`. Trong một module, tên module (string) có sẵn dưới dạng giá trị của biến toàn cục `__name__`. 
```Python
{% raw %}
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
{% endraw %}
```

Các tập `__init__.py` được yêu cầu để Python coi các folder chứa các file là các package. Trong trường hợp đơn giản nhất, `__init__.py` có thể chỉ là một file trống, nhưng nó cũng có thể thực thi mã khởi tạo cho package hoặc đặt biến `__all__` `= [` tên các hàm, class, ...`]` trong package.
```python
__all__ = [
    "echo",      # refers to the 'echo.py' file
    "surround",  # refers to the 'surround.py' file
    "reverse",   # !!! refers to the 'reverse' function now !!!
]

def reverse(msg: str):  # <-- this name shadows the 'reverse.py' submodule
    return msg[::-1]    #     in the case of a 'from sound.effects import *'
```

Nhiều packages trong một folder thì có thể dùng thêm một thuộc tính đặc biệt nữa đó là `__path__`. Thuộc tính này được khởi tạo thành một chuỗi các chuỗi chứa các tên của thư mục chứa package `__ini__.py` trước khi các mã trong tệp đó được thực thi. Biến này có thể sửa đổi và việc làm vậy sẽ ảnh hưởng đến các tìm kiếm trong tương lai đối với các module và sub-pakage inside module. Đây là một tính năng không thường xuyên cần đến.

## Lambdas

Không chỉ Python mà các ngôn ngữ khác như Java, C# và C++ đều có các hàm lambda được thêm vào cú pháp, trong khi các ngôn ngữ như LISP hoặc ML, Haskell, OCaml và F# sử dụng lambda làm khái niệm cốt lõi.

#### Lambdas Calculus

Lambda function có nguồn gốc từ phép tính lambda, một mô hình tính toán do Alonzo Church phát minh.
[Turning Complete](https://simple.wikipedia.org/wiki/Turing_complete)

Lambda func có thể mã hóa bất kỳ phép tính nào - là phép tính **Turning Complete** (đại loại hiểu giống như khái niệm về các máy tính toán trừu tượng - còn gọi là **automa**. Một automa được gọi là  Turing Complete nếu có thể được sử dụng để mô phỏng bất kỳ Turing machine nào. Hầu hết các ngôn ngữ lập trình hiện đại đều là Turing Complete). Lambda là một phép tính thuần túy và không giữ lại bất kỳ trạng thái nào nên nó trái ngược với khái niệm về Turing machine.

#### Functional Style

```python
def identify(x):
	return x
```

Hàm identify() lấy đối số x và trả về x.

Lambda func
```python
lambda x: x
```

- Key word: lambda
- a bound variable: x
- a body: x

Trong đó bound variable x là 1 biến ràng buộc về argument - đối số tính toán cua rhafm lambda. Còn biến tự do - body không bị ràng buộc và có thể được tham chiếu trong thân biểu thức
```python
lambda x: x+1
```

1. Có thể áp dụng cho một đối số bằng cách bound func và argument input
```python
>>>  (lambda x: x+1)(2)
3
```

Đồng nghĩa với thực hiện
```
(lambda x: x + 1)(2) = lambda 2: 2 + 1
                     = 2 + 1
                     = 3
```

2. Có thể đặt tên cho hàm Lambda như sau
```python
>>> add_one = lambda x:x+1
>>> ad_one(2)
3
```

Đồng nghĩa với việc viết func
```python
def add_one(x):
	return x+1
```

3. Đối với hàm lambda input nhiều arguments thì mỗi argument ngăn cách bằng dấu `,` 
```python
>>> full_name = lambda first, last: f'Full name: {first.title()} {last.title()}'
>>> full_name('guido', 'van rossum')
'Full name: Guido Van Rossum'
```

#### Syntax

Lambda Func có các đặc điểm
- Chỉ chứa các biểu thức mà không thể bao gồm các câu lệnh trong phần body
- Được viết dưới dạng một dòng lệnh thực thi duy nhất.
- Không hỗ trợ chú thích kiểu
- Có thể kích hoạt ngay lập tức (LIFE


## Decorators

Decorator là một công cụ mạnh mẽ trong Python, cho phép bạn **"trang trí" hoặc bổ sung chức năng cho hàm hoặc lớp** mà không cần thay đổi trực tiếp mã nguồn gốc. Decorators hoạt động bằng cách **nhận một hàm làm đầu vào và trả về một hàm mới**, thường là bản mở rộng hoặc sửa đổi của hàm gốc.

### Cách hoạt động

Decorator đơn giản là một hàm nhận một hàm khác như đối số và trả về một hàm mới.

```python
def my_decorator(func):
    def wrapper():
        print("Before function runs")
        func()
        print("After function runs")
    return wrapper

def say_hello():
    print("Hello!")

# Sử dụng decorator
decorated_func = my_decorator(say_hello)
decorated_func()

```

Kết quả

```pgsql
Before function runs
Hello!
After function runs
```



### Sử dụng cú pháp `@`

Python hỗ trợ cú pháp rút gọn để áp dụng decorator, sử dụng dấu `@` trước tên hàm:

```python
@my_decorator
def say_hello():
    print("Hello!")

say_hello()

```

Tương đương với 
```
say_hello = my_decorator(say_hello)
```

### Decorator với hàm có đối số

Khi hàm được trang trí có đối số, hàm `wrapper` bên trong cũng phải nhận và truyền đối số:

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function")
        result = func(*args, **kwargs)
        print("After function")
        return result
    return wrapper

@my_decorator
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")

```

### Decorator với `functools.wraps`

Khi dùng decorator, metadata như tên hàm, docstring sẽ bị mất. Để giữ lại, ta sử dụng `functools.wraps`:

```python
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """Wrapper function"""
        print("Before function")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Greet someone"""
    print(f"Hello, {name}!")

print(greet.__name__)  # greet
print(greet.__doc__)   # Greet someone
```
### Decorator có tham số

Muốn truyền tham số cho decorator, cần một hàm bọc ngoài cùng:
```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hi():
    print("Hi!")

say_hi()
```

### Ứng dụng thực tế của Decorators

- **Logging**: Ghi log trước/sau khi hàm chạy.
    
- **Kiểm tra quyền truy cập**: Kiểm tra user có đủ quyền.
    
- **Memoization / Caching**: Lưu kết quả để tăng hiệu suất.
    
- **Đo thời gian chạy**: Tính thời gian thực hiện của hàm.

