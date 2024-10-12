# Task 12: Post

#### Tin tức

##### Đăng tin tức

API để đăng một bài tin tức bao gồm các property sau:

- Title: Không quá 250 kí tự.
- Content: Nội dung bài viết. Kiểu string, chứa html content. Để frontend có thể render được nội dung trên website. Không quá 20000 kí tự.
- Thumbnail: Không quá 2048 kí tự
- Category: Không quá 125 kí tự
- DateTime: Phải là kiểu DateTime string
- Author: Không quá 125 kí tự
- Tags: Là các từ khóa được đính kèm theo bài viết. Một bài viết có thể chứa nhiều tags. Mỗi tag không quá 125 kí tự
- Status: Nháp/ Xuất bản/ Xóa. Ở trạng thái Nháp/ Xóa bài viết sẽ không được xuất hiện khi gọi danh sách các bài viết.
- Description: Là mô tả ngắn gọn về nội dung bài viết. Không quá 500 kí tự.

Khi bài viết được tạo ra, data phải được lưu vào trong bộ nhớ cache.
API này chỉ cho phép user role: Admin/ Moderator thực hiện.

##### Cập nhật tin tức

Cho phép moderator có thể cập nhật lại bài đăng.
Các property nào cần update sẽ được define trong body của request. Nếu không có, nghĩa là giá trị của prop đó sẽ vẫn được giữ nguyên, không cần cập nhật.
Khi cập nhật, thông tin phải được cập nhật lại trong bộ nhớ cache.
API này chỉ cho phép user role: Admin/ Moderator thực hiện.

##### Xem chi tiết tin tức

API sẽ trả về chi tiết của bài viết dựa trên id của bài viết đó.
Trong đó, thông tin sẽ bao gồm thêm các thống kê về số lượt xem và số lượt bình luận của bài viết đó.
Thông tin của bài viết đầu tiên sẽ được lấy ra từ bộ nhớ cache. Nếu bộ nhớ cache không tồn tại, thì API phải query thông tin từ DB. Sau đó, cache bài viết vào lại bộ nhớ cache.

##### Lấy danh sách bài viết theo chuyên mục

API hiển thị danh sách bài viết theo chuyên mục được truyền vào.
API phải bao gồm tính năng phân trang (pagination). Nghĩa là user có thể lấy tin dựa theo số trang và số lượng tin.
Ví dụ: User cần lấy trang số 2, và tối đa 10 tin. Params GET của chúng ta sẽ là: …/kinh-te?page=2&limit=10
Mỗi record trong danh sách chỉ cần hiển thị các thông tin sau:

- Title
- Description
- Thumbnail
- Author
- Total Comment

##### Danh sách các tin đã xem của user

Hiển thị danh sách các tin đã xem của user.
Yêu cầu phân trang, chỉ user với accessToken mới có thể call được.
Danh sách này sẽ được lưu vào bộ nhớ cache. Không cần thiết phải lưu vào database. Có thể set thời gian expire cho data này (30 ngày). Sau 30 ngày, data này sẽ được xóa khỏi cache.

##### Danh sách các tin đã lưu của user

Hiển thị danh sách các tin user đã lưu lại.
Yêu cầu phân trang, chỉ user với accessToken mới có thể call được.

#### Bình luận

##### CRUD

Cho phép user đăng bình luận/ phản hồi vào bài viết với nội dung là string và không quá 250 kí tự.
User cũng có thể update/ delete bình luận của bản thân.
Mỗi bài viết, user chỉ có thể đăng một bình luận.
Không giới hạn số lần phản hồi bình luận của user.
Phản hồi bình luận sẽ chỉ tối đa 1 level. Ví dụ:

- B phản hồi bình luận “Hello” của A.

UserA: Hello.\
--- UserB: Hi.

Lúc này parentComment của B sẽ là comment của A.

- C phản hồi bình luận của B.

UserA: Hello.\
--- UserB: Hi.\
------- UserC: Hiiiii.

Ở đây parentComment của C phải là B nhưng vì để đơn giản các gọi ra danh sách bình luận, nên ở đây parentComment của C cũng sẽ là A.

UserA: Hello.\
--- UserB: Hi.\
--- UserC: Hiiiii.

Role: Admin/ Mod có thể ẩn các bình luận/ phản hồi của user khác. Các bình luận
