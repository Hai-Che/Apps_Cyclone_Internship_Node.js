# Task 13: CMS

#### Like/ Unlike bình luận

User có thể thả like/ unlike cho bình luận.

##### Danh sách bình luận theo tin tức

Lấy danh sách bình luận theo từng bài viết theo 2 kiểu sort:

- Mới nhất: Sắp xếp theo thời gian.
- Quan tâm: Sắp xếp theo số lượt like giảm dần.

Có hỗ trợ phân trang. Trong danh sách này, mỗi bình luận sẽ có thêm thống kế tổng số reply.

##### Danh sách các phản hồi theo từng bình luận

Đối với các bình luận có reply > 0. Dùng API này để lấy ra danh sách các phản hồi dựa theo bình luận ID. Có hỗ trợ phân trang.

##### Danh sách các bình luận theo user

Lấy danh sách tất cả các bình luận của user. Có hỗ trợ phân trang. Yêu cầu có accessToken để xác định được user request.

##### Tìm kiếm

Tìm kiếm bài viết với keyword có thể là title, tag, có hỗ trợ phân trang.

##### Thống kê

- Thống kê lượt xem của mỗi bài viết
- Thống kế lượt bình luận của mỗi bài viết

##### Hình ảnh

Đối với hình ảnh, mình sẽ dùng thư viện multer để upload ảnh. Tạm thời ảnh sẽ được lưu local vào trong source code. Database sẽ store path đến hình ảnh đó.
