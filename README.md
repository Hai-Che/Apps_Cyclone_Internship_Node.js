# Task 6: Class-Transformer/ Class-Validator

#### Tìm hiểu DTO ( Data Transfer Object ) trong Typescript.

##### Khái niệm

DTO (Data transfer object): là một mẫu thiết kế (design pattern) thường được sử dụng trong lập trình, đặc biệt là trong các ứng dụng có kiến trúc phân tầng như ứng dụng web. Nó là các class đóng gói data để chuyển giữa client - server hoặc giữa các service trong microservice. Mục đích tạo ra DTO là để giảm bớt lượng info không cần thiết phải chuyển đi, và cũng tăng cường độ bảo mật.

##### Mục đích

- Giảm thiểu số lần gọi: DTO giúp gom nhóm nhiều dữ liệu lại thành một đối tượng, điều này giúp giảm số lần gọi giữa các tầng trong ứng dụng.
- Tăng hiệu suất: Thay vì truyền nhiều đối tượng riêng lẻ thì ta chỉ cần truyền một đối tượng DTO, giúp tiết kiệm băng thông và nâng cao hiệu suất.
- Tách biệt dữ liệu: DTO có thể tách biệt dữ liệu tồn tại trong cơ sở dữ liệu và cách thức dữ liệu được sử dụng trong ứng dụng, điều này giúp cho việc bảo trì mã nguồn dễ dàng hơn.
- Đơn giản hóa dữ liệu: DTO chỉ chứa các thuộc tính cần thiết cho việc truyền tải dữ liệu mà không cần bao gồm các logic phức tạp hoặc hành vi (methods).

#### Tìm hiểu class-transformer.

##### Khái niệm

class-transformer là một thư viện trong TypeScript và JavaScript (sử dụng trên nền tảng Node.js) giúp chuyển đổi các đối tượng giữa các lớp (class) khác nhau một cách dễ dàng. Thư viện này thường được sử dụng trong các ứng dụng Node.js, đặc biệt là khi làm việc với dữ liệu nhận từ APIs.

##### Mục đích

- Chuyển Đổi Dữ Liệu: Cho phép chuyển đổi đối tượng plain (đối tượng đơn giản) thành các instance của lớp cụ thể và ngược lại.
- Tùy Chỉnh: Hỗ trợ việc tùy chỉnh cách thức chuyển đổi thông qua các decorators.
- Hỗ Trợ Thư Viện Khác: Có thể tích hợp tốt với các thư viện khác như class-validator để kiểm tra tính hợp lệ của dữ liệu.

#### Tìm hiểu class-validator.

##### Khái niệm

class-validator là một thư viện trong JavaScript/TypeScript, chủ yếu được sử dụng để xác thực (validate) các đối tượng, thường là các lớp (class) trong ứng dụng Node.js hoặc Angular. Thư viện này giúp dễ dàng kiểm tra tính hợp lệ của dữ liệu dựa trên các thuộc tính của lớp.

##### Mục đích

- Xác thực Dữ liệu: có thể xác thực các thuộc tính của lớp bằng các decorator (chú thích) được cung cấp bởi thư viện.
- Tích hợp Dễ dàng: thường được sử dụng cùng với thư viện class-transformer, cho phép chuyển đổi và xác thực dữ liệu từ các nguồn khác nhau như JSON.
