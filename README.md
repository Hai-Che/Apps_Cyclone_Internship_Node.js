# MySQL

### Tìm hiểu Transaction?

##### Khái niệm:

Transaction là một tiến trình xử lý có xác định điểm đầu và điểm cuối, được chia nhỏ thành các operation (phép thực thi) , tiến trình được thực thi một cách tuần tự và độc lập các operation đó theo nguyên tắc hoặc tất cả đều thành công hoặc một operation thất bại thì toàn bộ tiến trình thất bại. Nếu việc thực thi một operation nào đó bị fail đồng nghĩa với việc dữ liệu phải rollback về trạng thái ban đầu.

##### Kiểu của Transaction:

Flat Transaction – Transaction ngang hàng:
Việc chia các operation là ngang hàng nhau. Thực thi các operation là tuần tự từ trái sang phải hoặc từ trên xuống dưới.
Nested Transaction – Transaction lồng nhau:
Việc thực thi các operation dựa theo nguyên tắc từ trong ra ngoài.
Các thuộc tính của Transaction:

- Atomicity – tính nguyên tử: Nếu một thành phần nào đó trong transaction thực thi hỏng (fail) thì đồng nghĩa với việc không có gì xảy ra tức không có gì thay đổi về mặt dữ liệu.
- Consistency – nhất quán: Dữ liệu nhất quán với transaction ở thời điểm bắt đầu và kết thúc.
- Isolation – độc lập: Nếu hai transaction thực thi cùng lúc thì nguyên tắc thực thi là thực thi độc lập. (không tác động lẫn nhau)
- Durability – bền vững: Dữ liệu của transaction sau khi thực thi xong được cố định, chính thức và bền vững. (không thể quay lại trạng thái dữ liệu lúc trước khi thực hiện transaction)

Trong MySQL, transaction bắt đầu với câu lệnh BEGIN WORK và kết thúc với một trong hai câu lệnh COMMIT hoặc ROLLBACK. Các câu lệnh SQL đặt giữa [BEGIN WORK … COMMIT/ROLLBACK] là phần chính của một transaction.

- Lệnh COMMIT: Khi một transaction hoàn chỉnh được hoàn thành thì lệnh COMMIT phải được đưa ra để mọi sự thay đổi đều được tác động đến tất cả các table liêu quan.
- Lệnh ROLLBACK: Nếu bị lỗi, thì lệnh ROLLBACK nên được đưa ra để đưa tất cả các table liên quan với transaction về lại trạng thái trước đó.

### Tìm hiểu Stored Procedure?

##### Khái niệm:

Một Stored Procedure là bao gồm các câu lệnh Transact-SQL và được lưu lại trong cơ sở dữ liệu. Transact-SQL dựa trên SQL, nó là một ngôn ngữ lập trình được sử dụng làm trung gian giữa cơ sở dữ liệu và các ứng dụng.
Lợi ích của Stored Procedure:

- Module hóa: Chỉ cần viết Stored Procedure 1 lần, sau đó có thể gọi nó nhiều lần ở trong ứng dụng.
- Hiệu suất: Stored Procedure thực thi mã nhanh hơn và giảm tải băng thông.
  - Thực thi nhanh hơn: Stored Procedure sẽ được biên dịch và lưu vào bộ nhớ khi được tạo ra. Điều đó có nghĩa rằng nó sẽ thực thi nhanh hơn so với việc gửi từng đoạn lệnh SQL.
  - Giảm tải băng thông: Hiệu suất đường truyền của việc gửi 1 Stored Procedure cao hơn so với việc gửi nhiều câu lệnh SQL.
- Bảo mật: Có những tác vụ không thể truy cập trực tiếp nhưng bằng việc cung cấp các Stored Procedure đã truy cập tới các tác vụ này thì người dùng có thể truy cập được.

### Tìm hiểu Trigger ?

##### Khái niệm:

Trigger là một stored procedure không có tham số. Trigger thực thi một cách tự động khi một trong ba câu lệnh Insert, Update, Delete làm thay đổi dữ liệu trên bảng có chứa trigger.
Cú pháp:

```sql
CREATE TRIGGER tên_trigger ON tên_bảng
FOR {DELETE, INSERT, UPDATE}
AS
  câu_lệnh_sql
```

Ứng dụng:
Trigger thường được sử dụng để kiểm tra ràng buộc (check constraints) trên nhiều quan hệ (nhiều bảng/table) hoặc trên nhiều dòng (nhiều record) của bảng. Ngoài ra việc sử dụng Trigger để chương trình có những hàm chạy ngầm nhằm phục vụ nhưng trường hợp hữu hạn và thường không sử dụng cho mục đích kinh doanh hoặc giao dịch.

Ex:
Sử dụng mysql tạo Table :
User: ( userId, username, password , fullName )
UserAdvance : ( userId, dob, address )
Viết Stored Procedure :
Thêm người dùng vào table: User/UserAdvance ( 10 bản ghi )
Lấy danh sách người dùng ( Lấy hết cột của 2 table và phân trang.)
Lấy chi tiết người dùng ( Lấy hết cột của 2 table).
Cập nhật người dùng.
Xoá người dùng.

Tạo database và tables:

```sql
CREATE DATABASE task3;
USE task3;

CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(100) NOT NULL
);

CREATE TABLE UserAdvance (
    userId INT,
    dob DATE,
    address VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES User(userId)
);
```

Viết Stored Procedure :

- Thêm người dùng vào table: User/UserAdvance ( 10 bản ghi )

```sql
DELIMITER $$

CREATE PROCEDURE AddUsers()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 10 DO
        INSERT INTO `User` (userId, username, password, fullName)
        VALUES (i, CONCAT('Username', i), CONCAT('Password', i), CONCAT('Full Name ', i));
        INSERT INTO UserAdvance (userId, dob, address)
        VALUES (i, DATE_SUB(CURDATE(), INTERVAL i YEAR), CONCAT('Address ', i));

        SET i = i + 1;
    END WHILE;
END $$

DELIMITER ;

CALL AddUsers();
```

Kết quả:
![image 1.1](/images/1.1.png)
![image 1.2](/images/1.2.png)

- Lấy danh sách người dùng ( Lấy hết cột của 2 table và phân trang.)

```sql
DELIMITER $$

CREATE PROCEDURE GetUserList(
    IN pageNum INT,
    IN pageSize INT
)
BEGIN
    DECLARE offset INT;
    SET offset = (pageNum - 1) * pageSize;
    SELECT
        U.userId,
        U.username,
        U.password,
        U.fullName,
        UA.dob,
        UA.address
    FROM
        User U
    JOIN
        UserAdvance UA ON U.userId = UA.userId
    LIMIT pageSize OFFSET offset;
END$$

DELIMITER ;
CALL GetUserList(2, 5);
```

![image 2](/images/2.png)

- Lấy chi tiết người dùng ( Lấy hết cột của 2 table).

```sql
DELIMITER $$

CREATE PROCEDURE GetAllUsersWithDetail()
BEGIN
    SELECT
        U.userId,
        U.username,
        U.password,
        U.fullName,
        UA.dob,
        UA.address
    FROM
        User U
    LEFT JOIN
        UserAdvance UA ON U.userId = UA.userId;
END$$

DELIMITER ;
CALL GetAllUsersWithDetail();
```

![image 3](/images/3.png)

Cập nhật người dùng.

```sql
DELIMITER $$

CREATE PROCEDURE UpdateUser(
    IN p_userId INT,
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_fullName VARCHAR(100),
    IN p_dob DATE,
    IN p_address VARCHAR(255)
)
BEGIN
    UPDATE User
    SET
        username = p_username,
        password = p_password,
        fullName = p_fullName
    WHERE userId = p_userId;

    UPDATE UserAdvance
    SET
        dob = p_dob,
        address = p_address
    WHERE userId = p_userId;
END $$

DELIMITER ;
CALL UpdateUser(1, 'new_username1', 'new_password1', 'New Full Name 1', '2000-01-01', 'New Address 1');
```

![image 4.1](/images/4.1.png)
![image 4.2](/images/4.2.png)
Xoá người dùng.

```sql
DELIMITER $$

CREATE PROCEDURE DeleteUser(IN p_userId INT)
BEGIN
    DELETE FROM UserAdvance
    WHERE userId = p_userId;

    DELETE FROM User
    WHERE userId = p_userId;
END $$

DELIMITER ;
CALL DeleteUser(1);
```

![image 5.1](/images/5.1.png)
![image 5.2](/images/5.2.png)
