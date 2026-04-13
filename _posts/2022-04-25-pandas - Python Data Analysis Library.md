---
layout: post
title: pandas - Python Data Analysis Library
date: 2022-04-25
author: Nguyen Thanh Luan
categories:
  - Programming
---


**Pandas** là thư viện cốt lõi trong hệ sinh thái **Data Analysis** của Python, cung cấp các cấu trúc dữ liệu mạnh mẽ như *Series* và *DataFrame* cùng hàng trăm API phục vụ xử lý, làm sạch, biến đổi, tổng hợp và phân tích dữ liệu. Bài viết này trình bày chi tiết toàn bộ các nhóm chức năng quan trọng của Pandas, bao gồm data structure, indexing, data cleaning, transformation, aggregation, time series, IO, và tối ưu hiệu năng. Mỗi phần đều phân tích các hàm tiêu biểu theo từng lĩnh vực xử lý kèm ví dụ code minh họa và output cụ thể.

## Data Structures trong Pandas

### Series

#### Khái niệm

**Series** là cấu trúc dữ liệu 1 chiều, tương tự array nhưng có index.

#### Các hàm quan trọng

* `pd.Series()`
* `.values`
* `.index`
* `.astype()`

#### Ví dụ

```python
import pandas as pd

s = pd.Series([10, 20, 30], index=["a", "b", "c"])

print("Series:")
print(s)

print("Values:", s.values)
print("Index:", s.index)
```

#### Output

```python
Series:
a    10
b    20
c    30
dtype: int64

Values: [10 20 30]
Index: Index(['a', 'b', 'c'], dtype='object')
```

### DataFrame

#### Khái niệm

**DataFrame** là bảng dữ liệu 2 chiều, gồm rows và columns.

#### Các hàm quan trọng

* `pd.DataFrame()`
* `.head()`
* `.tail()`
* `.info()`
* `.describe()`

#### Ví dụ

```python
import pandas as pd

df = pd.DataFrame({
    "name": ["A", "B", "C"],
    "age": [20, 25, 30]
})

print(df.head())
print(df.info())
```

#### Output

```python
  name  age
0    A   20
1    B   25
2    C   30

<class 'pandas.core.frame.DataFrame'>
RangeIndex: 3 entries, 0 to 2
Data columns (total 2 columns):
```

## Indexing và Selection

### Các phương thức chính

* `.loc[]` (label-based)
* `.iloc[]` (integer-based)
* `.at[]`, `.iat[]`

### Ví dụ

```python
import pandas as pd

df = pd.DataFrame({
    "A": [10, 20, 30],
    "B": [1, 2, 3]
})

print(df.loc[0])
print(df.iloc[1])
```

### Output

```python
A    10
B     1

A    20
B     2
```

## Data Cleaning

### Các hàm quan trọng

* `.isna()`
* `.dropna()`
* `.fillna()`
* `.replace()`

### Ví dụ

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "A": [1, 2, np.nan],
    "B": [4, np.nan, 6]
})

print("Original:")
print(df)

df_filled = df.fillna(0)

print("Filled:")
print(df_filled)
```

### Output

```python
Original:
     A    B
0  1.0  4.0
1  2.0  NaN
2  NaN  6.0

Filled:
     A    B
0  1.0  4.0
1  2.0  0.0
2  0.0  6.0
```

## Data Transformation

### Các hàm chính

* `.apply()`
* `.map()`
* `.astype()`
* `.rename()`

### Ví dụ

```python
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3]
})

df["A_squared"] = df["A"].apply(lambda x: x**2)

print(df)
```

### Output

```python
   A  A_squared
0  1          1
1  2          4
2  3          9
```

## GroupBy và Aggregation

### Tổng quan

`groupby` là một trong những API quan trọng nhất của Pandas để:

* Split
* Apply
* Combine

### Hàm groupby

```python
def groupby(
    self,
    by=None,
    axis: Axis | lib.NoDefault = lib.no_default,
    level: IndexLabel | None = None,
    as_index: bool = True,
    sort: bool = True,
    group_keys: bool = True,
    observed: bool | lib.NoDefault = lib.no_default,
    dropna: bool = True,
)
```

### Ví dụ cơ bản

```python
import pandas as pd

df = pd.DataFrame({
    "team": ["A", "A", "B"],
    "score": [10, 20, 30]
})

grouped = df.groupby("team").sum()

print(grouped)
```

### Output

```python
      score
team       
A        30
B        30
```

### Aggregation functions

* `.sum()`
* `.mean()`
* `.count()`
* `.agg()`

### Ví dụ nâng cao

```python
result = df.groupby("team").agg({
    "score": ["mean", "max"]
})

print(result)
```

### Output

```python
      score     
       mean max
team           
A      15   20
B      30   30
```

## Merge, Join, Concat

### Các hàm chính

* `pd.merge()`
* `df.join()`
* `pd.concat()`

### Ví dụ

```python
import pandas as pd

df1 = pd.DataFrame({"id": [1, 2], "A": [10, 20]})
df2 = pd.DataFrame({"id": [1, 2], "B": [30, 40]})

merged = pd.merge(df1, df2, on="id")

print(merged)
```

### Output

```python
   id   A   B
0   1  10  30
1   2  20  40
```

## Time Series

### Các hàm quan trọng

* `pd.to_datetime()`
* `.resample()`
* `.rolling()`

### Ví dụ

```python
import pandas as pd

dates = pd.date_range("2023-01-01", periods=5)
df = pd.DataFrame({"value": [1, 2, 3, 4, 5]}, index=dates)

print(df.resample("2D").sum())
```

### Output

```python
            value
2023-01-01      3
2023-01-03      7
2023-01-05      5
```

## Input/Output (IO)

### Các hàm chính

* `pd.read_csv()`
* `pd.read_excel()`
* `df.to_csv()`
* `df.to_excel()`

### Ví dụ

```python
import pandas as pd

df = pd.DataFrame({"A": [1, 2]})
df.to_csv("data.csv", index=False)

df_loaded = pd.read_csv("data.csv")

print(df_loaded)
```

### Output

```python
   A
0  1
1  2
```

## Tối ưu hiệu năng

### Các kỹ thuật

* Vectorization (tránh loop Python)
* Sử dụng `.values` hoặc `.to_numpy()`
* Dùng `categorical dtype`
* Chunk processing với `read_csv(chunksize=...)`

### Ví dụ vectorization

```python
import pandas as pd

df = pd.DataFrame({"A": range(1000)})

df["B"] = df["A"] * 2

print(df.head())
```

### Output

```python
   A  B
0  0  0
1  1  2
2  2  4
3  3  6
4  4  8
```

## Tổng kết

### Những gì cần nắm vững

* Data structures: Series, DataFrame
* Indexing: loc, iloc
* Data cleaning và transformation
* GroupBy và aggregation
* Merge/Join dữ liệu
* Time series processing
* IO và tối ưu hiệu năng

### Insight thực tế

* `groupby` là core của data analysis
* Vectorization giúp tăng tốc đáng kể
* Pandas phù hợp cho data vừa và nhỏ (RAM-bound)
* Với big data cần kết hợp Spark hoặc Dask

Pandas là công cụ không thể thiếu cho bất kỳ Data Scientist hay AI Engineer nào khi xử lý dữ liệu trong Python.
