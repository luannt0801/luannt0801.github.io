<script>
  const categoryLinks = document.querySelectorAll('.category-link');
  const postItems = document.querySelectorAll('.post-item'); // Các bài viết trong blog

  categoryLinks.forEach(link => {
    link.addEventListener('click', function () {
      const category = this.getAttribute('data-category'); // Lấy tên chủ đề được click

      // Lặp qua các bài viết và ẩn tất cả bài viết
      postItems.forEach(post => {
        const postCategories = post.getAttribute('data-categories').split(',');
        if (postCategories.includes(category)) {
          post.style.display = 'block'; // Hiển thị bài viết nếu thuộc chủ đề được click
        } else {
          post.style.display = 'none'; // Ẩn bài viết nếu không thuộc chủ đề đó
        }
      });
    });
  });
</script>
