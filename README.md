# Task3: Pending

#### Tìm hiểu ExpressJS là gì?

Expressjs là một framework được xây dựng trên nền tảng của Nodejs. Nó cung cấp các tính năng mạnh mẽ để phát triển web hoặc mobile. Expressjs hỗ trợ các method HTTP và midleware tạo ra API vô cùng mạnh mẽ và dễ sử dụng.
Một số tính năng chính của Expressjs:

- Phát triển máy chủ nhanh chóng: Expressjs cung cấp nhiều tính năng dưới dạng các hàm để dễ dàng sử dụng ở bất kỳ đâu trong chương trình. Điều này đã loại bỏ nhu cầu viết mã từ đó tiết kiệm được thời gian.
- Phần mềm trung gian Middleware: Đây là phần mềm trung gian có quyền truy cập vào cơ sở dữ liệu, yêu cầu của khách hàng và những phần mềm trung gian khác. Phần mềm Middleware này chịu trách nhiệm chính cho việc tổ chức có hệ thống các chức năng của Express.js.
- Định tuyến - Routing: Express js cung cấp cơ chế định tuyến giúp duy trì trạng thái của website với sự trợ giúp của URL.
- Tạo mẫu - Templating: Các công cụ tạo khuôn mẫu được Express.js cung cấp cho phép các nhà xây dựng nội dung động trên các website bằng cách tạo dựng các mẫu HTML ở phía máy chủ.
- Gỡ lỗi - Debugging: Để phát triển thành công các ứng dụng web không thể thiết đi việc gỡ lỗi. Giờ đây với Expressjs việc gỡ lỗi đã trở nên dễ dàng hơn nhờ khả năng xác định chính xác các phần ứng dụng web có lỗi.

#### Tìm hiểu Routing trong ExpressJS?

Routing trong ExpressJS là quá trình xác định cách thức ứng dụng web phản hồi với các yêu cầu của người dùng đến các URL cụ thể, giúp điều hướng và xử lý các yêu cầu từ người dùng một cách linh hoạt và dễ dàng. Nói cách khác, Routing trong ExpressJS giúp xử lý các yêu cầu HTTP đến các endpoint khác nhau. Express sử dụng các phương thức HTTP như GET, POST, PUT, PATCH, DELETE để định nghĩa route; hỗ trợ các tham số trong URL để tạo ra các route động và ta có thể sử dụng middleware để thực hiện các xử lý chung cho các route.

#### Tìm hiểu Middleware trong ExpressJS ?

Middleware: là một hàm có thể thực hiện các tác vụ nào đó trên yêu cầu (request) và phản hồi (response) trước khi chúng đến với route handler. Middleware có thể được sử dụng để thực hiện kiểm tra chứng thực (authentication), phân tích thông tin (logging), xử lý lỗi, và nhiều tác vụ khác.
Middleware trong ExpressJS giúp bạn xử lý các yêu cầu HTTP trước khi chúng được gửi đến route handler cuối cùng.
Cách khai báo: Là 1 hàm với ba tham số: req, res, và next. Đối với middleware dùng để xử lý lỗi sẽ có thêm 1 tham số err.
Khi triển khai middleware cần lưu ý đến thứ tự được khai báo để đảm bảo chương trình hoạt động đúng như mong muốn

#### Tìm hiểu Error Handling ExpressJS ?

Error Handling là quá trình xử lý các lỗi xảy ra trong ứng dụng, giúp lập trình viên kiểm soát và phản hồi khi có sự cố xảy ra. Trong ExpressJS, ta có thể xử lý lỗi bằng cách sử dụng middleware.
ExpressJS có một cách đặc biệt để định nghĩa middleware cho việc xử lý lỗi. Middleware xử lý lỗi có thể được định nghĩa bằng cách thêm 4 tham số: err, req, res, next.

<!-- Ex: Viết chức năng tạo người dùng

- Input : username / password / fullName / dob / address

- Validate Input ( Middleware ) :

1. username : bắt buộc / chuỗi / ít nhất 6 kí tự / chấp nhận chữ + số ( sử dụng regex ).
2. password : bắt buộc / chuỗi / ít nhất 4 kí tự / phải có chữ + số + kí tự đặc biệt ( sử dụng regex).
3. fullName : bắt buộc / chuỗi / ít nhất 6 kí tự và dài nhất 64 kí tự / chấp nhận chữ hoa + chữ thường.
4. dob : không bắt buộc / ngày ( yyyy / mm /dd ).
5. address : không bắt buộc / chuỗi.

- Sử dụng Error Handling ExpressJS để xử lý lỗi. -->
