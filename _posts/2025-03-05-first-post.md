---
title: "My First Blog Post"
date: 2024-03-08
categories: [AI, Machine Learning]
permalink: /category/AI/
author: "Luan Nguyen"
image: "/assets/imgs/default.jpg"
---

## Hugging Face Course

1. Transformer Models
    
    - **Natural Language Processing**
        Mục tiêu của NLP không phải là hiểu được ý nghĩa của 1 từ riêng lẻ mà hiểu được context (ngữ cảnh) của những từ đó.

        Các task của NLP phổ biến là:

        - *Classifying whole sentences*: Phân loại cả câu xem các câu nào là mail rác, check ngữ pháp, logic hai câu.
        - *Classifying each world in a sentence*: Xác định các thành phần ngữ pháp của câu (Danh từ, động từ , tính từ) hoặc các thực thể được đặt tên (người, địa điểm, tổ chức).
        - *Generating text content*: Hoàn thành một promt với việc tự động generate từ, điền vào chỗ trống trong văn bản bằng các từ được che giấu.
        - *Extracting an answer from a text*: Trích xuất câu trả lời cho câu hỏi dựa trên thông tin được cung cấp trong ngữ cảnh.
        - *Generating a new sentence from an input text*: Dịch văn bản sang ngôn ngữ khác, tóm tắt văn bản.

        Tuy nhiên NLP không giới hạn ở văn bản viết, nó cũng giải quyết các thách thức phức tạp trong nhận dạng giọng nói và thị giác máy tính (tạo bản ghi *mẫu âm thanh* hoặc *mô tả hình ảnh*)

    - **Transformer, what can they do?**
        Transformer models được dùng để giải quyết tất cả các task của NLP
        ![alt text](/image.png)

        [Thư viện transformer](https://github.com/huggingface/transformers)

    - **How do Transformer work**

        Lịch sử phát triển của mô hình transformer
        ![alt text](/image-1.png)

        Kiến trúc Transformer được giới thiệu vào tháng 6 năm 2017. Trọng tâm của nghiên cứu ban đầu là các nhiệm vụ dịch thuật. Tiếp theo đó là sự ra mắt của một số mô hình có ảnh hưởng, bao gồm:
        - Tháng 6 năm 2018: GPT, mô hình Transformer được đào tạo trước đầu tiên, được sử dụng để tinh chỉnh các nhiệm vụ NLP khác nhau và thu được kết quả tiên tiến
        - Tháng 10 năm 2018: BERT, một mô hình lớn khác mô hình được đào tạo trước, mô hình này được thiết kế để tạo ra các bản tóm tắt câu tốt hơn (nhiều hơn về điều này trong chương tiếp theo!)
        - Tháng 2 năm 2019: GPT-2, phiên bản cải tiến (và lớn hơn) của GPT chưa được phát hành công khai ngay lập tức do trước những lo ngại về đạo đức
        - Tháng 10 năm 2019: DistilBERT, một phiên bản chắt lọc của BERT nhanh hơn 60%, bộ nhớ nhẹ hơn 40% và vẫn giữ được 97% hiệu suất của BERT
        - Tháng 10 năm 2019: BART và T5, hai mô hình được đào tạo trước lớn sử dụng cùng kiến ​​trúc như mẫu Transformer nguyên bản (mẫu đầu tiên làm như vậy)
        - Tháng 5 năm 2020, GPT-3, một phiên bản thậm chí còn lớn hơn của GPT-2 có khả năng thực hiện tốt nhiều tác vụ khác nhau mà không cần tinh chỉnh (gọi là zero-shot learning)

        Transformer chia làm 3 loại:
        - GPT -like (also called auto-regressive Transformer models)
        - BERT -like (also called auto-encoding Transformer models)
        - BART/T5 -like (also called sequence-to-sequence Transformer models)

        Tất cả các model transformer đều được **đào tạo mô hình ngôn ngữ có giám sát, tức đào tạo với 1 lượng lớn văn bản thô theo kiểu tự giám sát.** Học tự giám sát có nghĩa là mục tiêu được tính toán tự động từ đầu vào của mô hình **==> Không cần thiết phải gắn nhãn cho dữ liệu!**

        Trong quá trình học chuyển giao, mô hình được tinh chỉnh một cách có giám sát - sử dụng nhãn do con người chú thích cho 1 mục đích nhất định.
        ***=> Mô hình hóa ngôn ngữ nhân quả vì đầu ra phụ thuộc vào đầu vào trong quá khứ và hiện tại chứ không phụ thuộc vào đầu vào trong tương lai.***

    - **Encoder Model**
        Các mô hình mã hóa chỉ sử dụng bộ mã hóa của mô hình Transformer. Ở mỗi giai đoạn, các lớp chú ý có thể truy cập tất cả các từ trong câu đầu tiên. Các mô hình này thường được mô tả là có sự chú ý “hai chiều” và thường được gọi là các mô hình mã hóa tự động .

        Quá trình đào tạo trước các mô hình này thường xoay quanh việc làm hỏng một câu nhất định (ví dụ, bằng cách che giấu các từ ngẫu nhiên trong câu đó) và giao cho mô hình nhiệm vụ tìm hoặc tái tạo câu ban đầu.

        Các mô hình mã hóa phù hợp nhất cho các nhiệm vụ đòi hỏi phải hiểu toàn bộ câu, chẳng hạn như phân loại câu, nhận dạng thực thể được đặt tên (và nói chung là phân loại từ) và trả lời câu hỏi trích xuất.

        Đại diện của nhóm mô hình này bao gồm:

        [ALBERT](https://huggingface.co/docs/transformers/model_doc/albert)
        [BERT](https://huggingface.co/docs/transformers/model_doc/bert)
        [DistilBERT](https://huggingface.co/docs/transformers/model_doc/distilbert)
        [ELECTRA](https://huggingface.co/docs/transformers/model_doc/electra)
        [RoBERTa](https://huggingface.co/docs/transformers/model_doc/roberta)

    - **Decoder model**
        Các mô hình bộ giải mã chỉ sử dụng bộ giải mã của mô hình Transformer. Ở mỗi giai đoạn, đối với một từ nhất định, các lớp chú ý chỉ có thể truy cập các từ được đặt trước từ đó trong câu. Những mô hình này thường được gọi là mô hình tự hồi quy. Việc huấn luyện trước các mô hình giải mã thường xoay quanh việc dự đoán từ tiếp theo trong câu. Những mô hình này phù hợp nhất cho các nhiệm vụ liên quan đến việc tạo văn bản. Đại diện của gia đình người mẫu này bao gồm:

        [CTRL](https://huggingface.co/transformers/model_doc/ctrl)
        [GPT](https://huggingface.co/docs/transformers/model_doc/openai-gpt)
        [GPT-2](https://huggingface.co/transformers/model_doc/gpt2)
        [Transformer XL](https://huggingface.co/transformers/model_doc/transfo-xl)

    
    - **Sequence to sequence model**
        Các mô hình bộ mã hóa-giải mã (còn gọi là mô hình tuần tự) sử dụng cả hai phần của kiến ​​trúc Transformer. Ở mỗi giai đoạn, các lớp chú ý của bộ mã hóa có thể truy cập tất cả các từ trong câu đầu tiên, trong khi các lớp chú ý của bộ giải mã chỉ có thể truy cập các từ được đặt trước một từ nhất định trong đầu vào. Việc huấn luyện trước các mô hình này có thể được thực hiện bằng cách sử dụng các mục tiêu của mô hình bộ mã hóa hoặc bộ giải mã, nhưng thường liên quan đến một cái gì đó phức tạp hơn một chút.
        
        Ví dụ: T5 được huấn luyện trước bằng cách thay thế các đoạn văn bản ngẫu nhiên (có thể chứa một số từ) bằng một từ đặc biệt mặt nạ duy nhất và mục tiêu là dự đoán văn bản mà từ mặt nạ này thay thế.
        
        Các mô hình tuần tự phù hợp nhất cho các nhiệm vụ xoay quanh việc tạo câu mới tùy thuộc vào đầu vào nhất định, chẳng hạn như tóm tắt, dịch thuật hoặc trả lời câu hỏi tổng hợp. Đại diện của gia đình người mẫu này bao gồm:

        [BART](https://huggingface.co/transformers/model_doc/bart)
        [mBART](https://huggingface.co/transformers/model_doc/mbart)
        [Marian](https://huggingface.co/transformers/model_doc/marian)
        [T5](https://huggingface.co/transformers/model_doc/t5)


    - **Bias and Limitation**

        Nếu bạn có ý định sử dụng mô hình được đào tạo trước hoặc phiên bản tinh chỉnh trong sản xuất, hãy lưu ý rằng, mặc dù các mô hình này là những công cụ mạnh mẽ, nhưng chúng cũng có những hạn chế. Hạn chế lớn nhất là, để có thể đào tạo trước trên lượng dữ liệu lớn, các nhà nghiên cứu thường thu thập tất cả nội dung họ có thể tìm thấy, lấy cả nội dung tốt nhất và tệ nhất có sẵn trên internet.

        Để minh họa nhanh, chúng ta hãy quay lại ví dụ về fill-maskđường ống với mô hình BERT:
        ```python
        from transformers import pipeline

        unmasker = pipeline("fill-mask", model="bert-base-uncased")
        result = unmasker("This man works as a [MASK].")
        print([r["token_str"] for r in result])

        result = unmasker("This woman works as a [MASK].")
        print([r["token_str"] for r in result])
        ```

        output
        ```python
        ['lawyer', 'carpenter', 'doctor', 'waiter', 'mechanic']
        ['nurse', 'waitress', 'teacher', 'maid', 'prostitute']
        ```

        Khi được yêu cầu điền từ còn thiếu trong hai câu này, mô hình chỉ đưa ra một câu trả lời không phân biệt giới tính (waiter/waitress). Những câu trả lời còn lại là nghề nghiệp thường gắn liền với một giới tính cụ thể — và đúng vậy, gái mại dâm đã lọt vào top 5 khả năng mà mô hình liên kết với “phụ nữ” và “công việc”. Điều này xảy ra mặc dù BERT là một trong số ít mô hình Transformer không được xây dựng bằng cách thu thập dữ liệu từ khắp nơi trên internet, mà thay vào đó sử dụng dữ liệu có vẻ trung lập (được đào tạo trên bộ dữ liệu Wikipedia tiếng Anh và BookCorpus ).

        Khi bạn sử dụng các công cụ này, do đó bạn cần phải ghi nhớ rằng mô hình ban đầu bạn đang sử dụng có thể dễ dàng tạo ra nội dung phân biệt giới tính, phân biệt chủng tộc hoặc kỳ thị người đồng tính. Việc tinh chỉnh mô hình trên dữ liệu của bạn sẽ không làm mất đi sự thiên vị cố hữu này.

    - **Summary**

        Cách tiếp cận các tác vụ NLP khác nhau bằng cách sử dụng hàm cấp cao pipeline()từ 🤗 Transformers. Bạn cũng đã thấy cách tìm kiếm và sử dụng các mô hình trong Hub, cũngnhư cách sử dụng Inference API để kiểm tra các mô hình trực tiếp trong trình duyệt của bạn.

        Chúng tôi đã thảo luận về cách các mô hình Transformer hoạt động ở cấp độ cao và nói về tầm quan trọng của việc học chuyển giao và tinh chỉnh. Một khía cạnh quan trọng là bạn có thể sử dụng toàn bộ kiến ​​trúc hoặc chỉ bộ mã hóa hoặc bộ giải mã, tùy thuộc vào loại nhiệm vụ bạn muốn giải quyết. Bảng sau tóm tắt điều này:

        |Model|Examples|Tasks|
        |-----|--------|-----|
        |Encoder|ALBERT, BERT, DistilBERT, ELECTRA, RoBERTa|Sentence classification, named entity recognition, extractive question answering|
        |Decoder|CTRL, GPT, GPT-2, Transformer XL|Text generation|
        |Encoder-decoder|BART, T5, Marian, mBART|Summarization, translation, generative question answering|