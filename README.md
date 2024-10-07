# Task 11: Authentication

#### Authentication

##### Đăng kí

Yêu cầu:
Email: Yêu cầu phải đúng format của email. Sử dụng regex để validate.
Password: Mật khẩu phải chứa ít nhất 6 kí tự. Dùng bcrypt để hash password trước khi lưu vào database.
Name: Yêu cầu phải là kiểu string
User đăng kí sẽ có role mặc định là User.
Hệ thống sẽ có thêm role Admin và Moderator. Hiện tại, do không cần tập trung nhiều vào API dành riêng cho CMS nên hai role này ta chỉ cần tạo thẳng 2 records vào trong database table User.
Sau khi đăng kí, user sẽ nhận được một email gửi đến mail đã đăng kí để xác thực tài khoản. Email xác thực sẽ chứa một mã code 4 kí tự. User cần call một API với 4 kí tự này để hoàn tất xác thực tài khoản.

##### Đăng nhập

Input:

- Email
- Password

Output:

```json
Json Data type:
{
  "data": {
    "name": "hai",
    "email": "sample@gmail.com",
    // ...
    "accessToken": "asdas9123...asdd1",
    "refreshToken": "asd21312312....12312",
  }
}
```

Response phải có chứa accessToken và refreshToken.

#### User

##### Thông tin user

Viết API cho phép cập nhật thông tin user. User có thể cập nhật các thông tin bổ sung sau:

- Ảnh đại diện
- Họ tên
- Ngày sinh
- Giới tính
- Số điện thoại
- Địa chỉ

Tất cả các thông tin trên đều là optional. Có nghĩa là user có thể cập nhật hoặc không cập nhật. Không ràng buộc các thuộc tính trên phải có giá trị.

##### Thay đổi mật khẩu

Cập nhật lại mật khẩu mới cho user. Yêu cầu sau khi thay đổi mật khẩu. Các accessToken và refreshToken của user hiện tại phải bị invalid hết. Và response ra một cặp accessToken và refreshToken mới cho user.

##### Refresh Token

Cấp lại cho user một cặp accessToken và refreshToken mới. User sẽ cần gửi lên refreshToken trong request.

##### Đăng xuất

Xóa accessToken và refreshToken của user.
