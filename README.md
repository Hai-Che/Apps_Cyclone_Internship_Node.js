# Task 5: TypeORM

#### Tìm hiểu TypeORM ?

##### Khái niệm

TypeORM là một thư viện Object Relational Mapper chạy trong node.js và được viết bằng TypeScript. TypeScript là một cải tiến đối với JavaScript với kiểu gõ tùy chọn. TypeScript là một ngôn ngữ biên dịch. Nó không được diễn giải tại thời điểm chạy run-time. Trình biên dịch TypeScript biên dịch file TypeScript (.ts) thành file JavaScript (.js).

TypeORM hỗ trợ nhiều cơ sở dữ liệu như MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana và WebSQL. TypeORM là ORM dễ sử dụng để tạo mới ứng dụng kết nối với cơ sở dữ liệu. Chức năng TypeORM là các khái niệm dành riêng cho RDBMS.

##### Đặc điểm

- Tự động tạo các lược đồ bảng cơ sở dữ liệu dựa trên các mô hình của bạn
- Dễ dàng chèn, cập nhật và xóa đối tượng trong cơ sở dữ liệu
- Tạo ánh xạ (một-một, một-nhiều và nhiều-nhiều) giữa các bảng
- Cung cấp các lệnh CLI đơn giản

##### Lợi ích

- Các ứng dụng chất lượng cao và được ghép nối lỏng lẻo
- Các ứng dụng có thể mở rộng
- Dễ dàng tích hợp với các modules khác
- Hoàn toàn phù hợp với mọi kiến trúc từ ứng dụng nhỏ đến ứng dụng doanh nghiệp

#### Tìm hiểu cách tạo connection đến database sử dụng TypeORM ?

Tạo connection đến Mysql database với TypeORM

```js
import "reflect-metadata";
import { DataSource } from "typeorm";

const MysqlDataSource = new DataSource({
  type: "mysql",
  host: `${host}`,
  port: parseInt(`${port}`),
  username: `${username}`,
  password: `${password}`,
  database: `${name}`,
  entities: [],
  synchronize: true,
  logging: false,
});

MysqlDataSource.initialize()
  .then(() => {
    console.log("Connect to mysqldb successfully");
  })
  .catch((error) => console.log(error));
```

#### Tìm hiểu Entity ?

Có thể hiểu như 1 table trong cơ sở dữ liệu quan hệ, sử dụng @Entity để tạo 1 entity. Ta có thể thực hiện các tác vụ CRUD cơ bản với entity.

- Thêm 1 cột trong bảng: @Column()
- Thêm 1 cột với khóa chính: @PrimaryColumn()
- Thêm 1 cột với giá trị khởi tạo tự động: @PrimaryGeneratedColumn() (giống auto-increment)
- Thêm 1 cột với kiểu dữ liệu xác định: @Column({length: 100,}), @Column("text"), @Column("double"),...

#### Tìm hiểu Query builder ?

Query Builder được sử dụng xây dựng các truy vấn SQL phức tạp một cách dễ dàng. Nó được khởi tạo từ Connection method và QueryRunner objects.

- Có 3 cách để tạo QueryBuilder:

  - Connection method:

  ```js
  import { getConnection } from "typeorm";

  const user = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  ```

  - Entity manager

  ```js
  import { getManager } from "typeorm";

  const user = await getManager()
    .createQueryBuilder(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  ```

  - Repository

  ```js
  import { getRepository } from "typeorm";

  const user = await getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  ```

- Aliases

```js
import { getConnection } from "typeorm";

const user = await getConnection()
  .createQueryBuilder()
  .select("stud")
  .from(Student, "stud"); // <=> select * from students as stud
```

#### Tìm Hiểu Transaction ?

Transaction là một đơn vị logic chịu trách nhiệm thực hiện truy xuất dữ liệu và cập nhật.

- Creating transactions

```js
// Connection method
import { getConnection } from "typeorm";
await getConnection().transaction(async (transactionalEntityManager) => {
  await connection.manager.save(students);
});
// Entity manager
import { getManager } from "typeorm";

await getManager().transaction(async (transactionalEntityManager) => {
  await transactionalEntityManager.save(students);
});
```

- Decorators:
  - @Transaction: Wraps all the execution in single database transcation.
  - @TransactionManager: Used to execute queries inside transaction.
  ```js
  @Transaction({ isolation: "SERIALIZABLE" })
  save(@TransactionManager() manager: EntityManager, student: Student) {
  return manager.save(student);
  }
  ```
  - @TransactionRepository: Used to inject transaction in repository.
  ```js
  @Transaction() save(student: Student, @TransactionRepository(Student) studentRepository:
  Repository<Student>) {
  return studentRepository.save(student);
  }
  ```

#### Tìm Hiểu Migration ?

Migration giống vcs cho database. Nó được sử dụng để sửa đổi và chia sẻ lược đồ cơ sở dữ liệu của ứng dụng, giúp đồng bộ database tại local giữa các developer khi làm việc chung.
Syntax:

- Creating a new migration: typeorm migration:create ./path-to-migrations-dir/PostRefactoring
- Running migrations: typeorm migration:run -- -d path-to-datasource-config
- Revert migrations: typeorm migration:revert -- -d path-to-datasource-config
