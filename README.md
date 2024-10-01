# Task 10: TypeDI

#### Tìm hiểu Dependency Injection là gì?

##### Khái niệm

Dependency Injection (DI) là một kỹ thuật trong lập trình phần mềm cho phép ta "tiêm" các phụ thuộc vào một thành phần thay vì định nghĩa chúng bên trong thành phần đó. DI giúp quản lý và tổ chức các phụ thuộc giữa các thành phần trong một hệ thống, giảm sự ràng buộc và tăng tính linh hoạt. Nói 1 cách đơn giản hơn thì Dependency Injection là một dạng design pattern được thiết kế với mục đích ngăn chặn sự phụ thuộc giữa các class, để khiến cho code dễ hiểu hơn, trực quan hơn, nhằm phục vụ cho mục đích bảo trì và nâng cấp code.

##### Các loại Dependency Injection

- Constructor injection: là loại phổ biến nhất có tính mạnh mẽ và rõ ràng cao. Với loại Constructor Injection, các phụ thuộc được truyền vào thông qua các tham số của hàm khởi tạo của một lớp. Khi một đối tượng mới được tạo, các phụ thuộc được chuyển vào và được lưu trữ bởi đối tượng.
- Setter injection: có tính linh hoạt hơn do loại DI này có thể thiết lập phụ thuộc tùy ý và thay đổi sau khi đối tượng đã được tạo. Setter Injection sẽ có các phụ thuộc được tiêm vào thông qua các phương thức thiết lập (setter methods) của một lớp. Sau khi đối tượng được tạo, các phương thức thiết lập được gọi để thiết lập các phụ thuộc.
- Interface injection: là loại kém phổ biến và thường không được khuyến nghị. Với Interface Injection, một giao diện được sử dụng để định nghĩa một phương thức chung để tiêm các phụ thuộc. Lớp cần phụ thuộc sẽ implement giao diện này và triển khai phương thức tiêm phụ thuộc.

##### Lợi ích và hạn chế khi dùng Dependency Injection

Lợi ích:

- Linh hoạt và giảm ràng buộc: DI làm giảm ràng buộc giữa các thành phần trong hệ thống. Thay vì các thành phần phải tạo ra các phụ thuộc của mình, chúng có thể nhận các phụ thuộc từ bên ngoài thông qua DI. Điều này tạo ra một cấu trúc mềm dẻo và cho phép chúng ta dễ dàng thay đổi và tái sử dụng các phụ thuộc, cũng như tách biệt logic và giao diện của thành phần.
- Tăng khả năng kiểm tra: Bằng cách tiêm các phụ thuộc thông qua DI, người dùng có thể dễ dàng thay thế các phụ thuộc bằng các đối tượng giả (mock objects) để tạo ra các bài kiểm tra đơn vị riêng biệt và độc lập. Điều này giúp giảm sự phụ thuộc vào các thành phần khác và tạo ra các bài kiểm tra hiệu quả hơn.
- Tăng tính mô-đun và dễ bảo trì: DI giúp tạo ra cấu trúc rõ ràng và tăng tính mô-đun trong hệ thống. Các thành phần trở nên đơn giản hơn và tách biệt hơn, vì chúng không cần biết chi tiết về việc khởi tạo các phụ thuộc của mình. Điều này giúp giảm sự rối loạn và làm cho mã nguồn dễ đọc, bảo trì và mở rộng hơn.
- Khả năng mở rộng và tái sử dụng cao: DI làm giảm sự ràng buộc giữa các thành phần trong hệ thống. Thay vì chỉ có thể sử dụng một cách cứng nhắc, chúng ta có thể thay đổi hoặc thay thế các phụ thuộc một cách linh hoạt để đáp ứng các yêu cầu khác nhau hoặc môi trường khác nhau. Điều này giúp hệ thống trở nên linh hoạt hơn và dễ dàng thích ứng với sự thay đổi và mở rộng.

Hạn chế:

- Có sự ràng buộc về kiểu dữ liệu: Việc tạo ra các ràng buộc về kiểu dữ liệu giữa các thành phần có thể làm tăng sự phụ thuộc và giảm tính linh hoạt của hệ thống. Nếu các phụ thuộc thay đổi kiểu dữ liệu, cần phải điều chỉnh và cấu hình lại DI để đảm bảo tính tương thích.
- Quản lý và cấu hình phức tạp: Quản lý và cấu hình DI container có thể trở nên phức tạp và đòi hỏi kiến thức sâu. Nếu thực hiện không đúng cách, quản lý và cấu hình DI sẽ gây rối loạn trong việc hiểu và bảo trì hệ thống.
- Tăng độ phức tạp nếu sử dụng không đúng cách: Khi sử dụng DI sai quy cách, người dùng có thể đưa các phụ thuộc không cần thiết vào các thành phần và gây khó khăn trong việc quản lý cũng như hiệu năng của hệ thống. Điều này có thể xảy ra khi không tuân thủ nguyên tắc "Inversion of Control" hoặc khi sử dụng DI quá phức tạp và không cần thiết cho các thành phần đơn giản.
- Nguy cơ tiềm ẩn vòng lặp phụ thuộc: Trong nhiều trường hợp sử dụng, người dùng có thể tạo ra vòng lặp phụ thuộc giữa các thành phần. Việc này gây ra các vấn đề về thứ tự khởi tạo và làm tăng độ phức tạp của hệ thống.

#### Tìm hiểu cách Sử dụng TypeDI ?

##### Khái niệm

TypeDI là một công cụ tiêm phụ thuộc cho TypeScript và JavaScript, giúp ta xây dựng các ứng dụng có cấu trúc tốt và dễ dàng kiểm tra trong Node hoặc trong trình duyệt.

##### Cách sử dụng TypeDI?

Đầu tiên ta phải xác định các service mà được dùng để tiêm vào lớp khác. Sử dụng decorator @Service() để typeDI coi nó như 1 Service class, tự động tạo một bản sao của nó và tiêm bất cứ khi nào cần thiết.
Ví dụ:

```js
import { Service } from "typedi";
@Service()
export class UserRepository {
  someFunction = () => {};
}
```

Các cách sử dụng TypeDI:

- Lấy từ global Container:
  Ví dụ:

```js
import { UserRepository } from "./UserRepository";
import { Service, Inject, Container } from "typedi";

@Service()
export class UserService {
  logUserData = () => {
    const userRepo = Container.get(UserRepository);
    userRepo.someFunction();
  };
}
```

- Tiêm vào lớp
  Ví dụ:

```js
import { UserRepository } from "./UserRepository";
import { Service, Inject, Container } from "typedi";

@Service()
export class UserService {
  @Inject()
  userRepo: UserRepository;

  logUserData = () => {
    this.userRepo.someFunction();
  };
}
```

- Sử dụng Constructor:

```js
import { UserRepository } from "./UserRepository";
import { Service, Inject, Container } from "typedi";

@Service()
export class UserService {

  constructor(public userRepo: UserRepository) {}

  logUserData = () => {
    this.userRepo.someFunction();
  };
}
```
