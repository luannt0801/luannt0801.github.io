---
layout: post
title: Data Engineer - Message Protocols
date: 2024-01-05 10:00:00 +0700
author: Nguyen Thanh Luan
categories: 
    - AI & ML
---

# Message Protocols

Trong lĩnh vực **Data Engineering**, “protocols” thường đề cập đến các **giao thức truyền dữ liệu**, **chuẩn trao đổi thông tin**, hoặc **kỹ thuật giao tiếp giữa các hệ thống dữ liệu**. Dưới đây là các loại **protocol phổ biến** mà Data Engineers thường làm việc cùng:
## 1. **Messaging Protocols** (Dùng cho stream & queue data)
 
|Protocol|Mô tả|Dùng trong|
|---|---|---|
|**Kafka** (Apache)|Distributed event streaming platform|Real-time data pipelines|
|**MQTT**|Lightweight pub/sub protocol for IoT|IoT, sensor data|
|**AMQP** (e.g., RabbitMQ)|Advanced Message Queuing Protocol|Messaging systems|
|**NATS**|Lightweight, high-performance messaging|Cloud-native microservices|

## 2. **Data Transfer & API Protocols**

| Protocol       | Mô tả                                       | Dùng trong                      |
| -------------- | ------------------------------------------- | ------------------------------- |
| **HTTP/HTTPS** | Web-based data communication                | REST APIs, ingestion            |
| **gRPC**       | High-performance RPC using Protocol Buffers | Microservices, internal APIs    |
| **WebSockets** | Bi-directional communication over HTTP      | Real-time streaming             |
| **FTP/SFTP**   | File transfer                               | Legacy systems, batch ingestion |
| **OData**      | Open Data Protocol                          | RESTful APIs for data services  |

## 3. **Database Protocols / Query Languages**

|Protocol|Mô tả|Dùng trong|
|---|---|---|
|**SQL** (Structured Query Language)|Query language for RDBMS|Data warehousing, ETL|
|**ODBC / JDBC**|Interfaces for connecting to databases|Application-database interaction|
|**Thrift** / **Avro**|Serialization protocols used in distributed systems|Big data (Hive, HDFS)|
|**Parquet / ORC**|Columnar file formats (not protocols, but standard)|Big Data storage & transfer|

## 4. **Streaming & Big Data Ecosystem Protocols**

|Protocol|Mô tả|Dùng trong|
|---|---|---|
|**Apache Avro / Protobuf**|Efficient serialization protocols|Kafka, Flink, Spark|
|**Delta Lake Protocol**|Transactional storage layer on data lakes|Data Lakehouse|
|**Iceberg / Hudi**|Table format protocols for large-scale analytics|Big Data Lakehouse|

## 5. **Cloud-Native / Inter-System Protocols**

|Protocol|Mô tả|Dùng trong|
|---|---|---|
|**REST / GraphQL**|API-based data access|Data services|
|**AWS S3 Protocol**|Object storage access via API|Cloud data pipelines|
|**Google Pub/Sub**|Messaging service protocol|GCP Streaming|

## Kết luận:

Là một **Data Engineer**, bạn thường sẽ tương tác với nhiều loại protocol khác nhau phụ thuộc vào:

- **Nguồn dữ liệu** (stream, batch, IoT…)
    
- **Đích dữ liệu** (data warehouse, data lake…)
    
- **Công nghệ trung gian** (Kafka, Spark, Airflow…)


