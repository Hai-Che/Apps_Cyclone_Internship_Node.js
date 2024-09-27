# Task 9: Message Queues

#### Tìm hiểu Message Queues là gì?

##### Khái niệm

Message queue là một cơ chế trong lập trình và kiến trúc phần mềm, được sử dụng để truyền thông tin (thông điệp) giữa các thành phần của hệ thống mà không cần chúng tương tác trực tiếp với nhau.

##### Các thành phần chính của Message Queue

- Producer: bộ phân tạo ra thông tin để tương tác với bộ phận khác. Thông tin này sẽ được truyền vào Message queue.
- Consumer:bộ phận/thành phần trong hệ thống nhận thông tin và xử lý thông tin từ Producer thông qua Message queue.
- Message: Thông tin (thông điệp) thường ở dạng text hoặc JSON, đôi khi có thể là Binary do Producer tạo ra.
- Message queue: Nơi lưu trữ tạm thời Message cho tới khi được Consumer lấy ra và xử lý.
- Broker: Xử lý Message và quản lý Message queue để đảm bảo Producer và Consumer truyền thông tin được cho nhau. Broker giúp định tuyến thông tin, quản lý tình trạng của hàng đợi, và đảm bảo rằng thông tin được chuyển giao đúng cách.
- Channel: Là cơ chế truyền thông tin giữa producer và consumer thông qua Message Queue. Channel đóng vai trò như một cầu nối để truyền thông điệp qua lại giữa các bên.

##### Cách thức hoạt động của Message Queue:

- Bước 1: Producer tạo ra thông điệp cần truyền đi. Thông tin này có thể là dữ liệu hoặc các thông tin bổ sung. Thông tin này sẽ được truyền vào Message queue thông qua channel và được lưu trữ tạm thời tại đây.
- Bước 2: Consumer sẽ lấy thông điệp của Producer thông qua Message queue. Thông tin thường được được lấy theo cơ chế FIFO (first in - first out), tuy nhiên vẫn có thể can thiệp vào cơ chế này bằng cách định ra các ưu tiên.
- Bước 3: Sau khi Consumer lấy được thông tin sẽ tiếp tục xử lý và thực hiện các hành động tuỳ thuộc vào yêu cầu của hệ thống.

##### Ưu và nhược điểm của Message Queue:

Ưu điểm:

- Bất đồng bộ: Message Queue hỗ trợ truyền thông điệp giữa các thành phần mà không đòi hỏi chúng phải chờ đợi nhau. Điều này giúp cải thiện hiệu suất và tăng tính mở rộng của hệ thống.
- Tính độc lập : Producer và consumer không cần biết về sự tồn tại của nhau. Sự phân tách này giúp giảm sự phụ thuộc giữa các thành phần và tăng khả năng mở rộng của hệ thống.
- Xử lý lưu lượng cao: Message Queue có thể xử lý lượng thông điệp lớn và đồng thời từ nhiều nguồn mà không gây ảnh hưởng lớn đến hiệu suất của hệ thống.
- Đảm bảo giao tiếp tin cậy: Hệ thống Message Queue thường có cơ chế đảm bảo rằng việc trao đổi thông tin giữa Producer và Consumer được chính xác và xử lý đúng cách.
- Giảm lỗi chồng chéo : Message Queue giúp giảm lỗi chồng chéo bằng cách loại bỏ trực tiếp kết nối giữa các thành phần, giảm khả năng lỗi do sự phụ thuộc và giao tiếp trực tiếp.
- Khả năng phục hồi: Do các thành phần hoạt động hoàn toàn độc lập với nhau nên khi một thành phần gặp sự cố thì thành phần kia vẫn có thể hoạt động bình thường. Việc bảo trì, sửa chữa hệ thống cũng không quá phức tạp.
  Nhược điểm:
- Phức tạp hóa hệ thống: Sử dụng Message Queue có thể làm phức tạp hóa hệ thống và tốn kém. Đối với các hệ thống nhỏ, đôi khi triển khai Message queue là không cần thiết.
- Độ trễ : Việc trao đổi thông tin bất đồng bộ giữa các thành phần sẽ có một độ trễ nhất định.
- Chi phí xử lý: Message Queue sẽ tăng tải của hệ thống nếu phải xử lý lượng lớn thông tin.
- Quản lý và theo dõi: Khi hệ thống có nhiều hàng đợi, hoặc có nhiều Producer/Consumer thì việc quản lý và theo dõi hoạt động của Message queue sẽ gặp nhiều khó khăn.
- Khó xử lý đồng bộ: Khi hệ thống cần xử lý đồng bộ giữa các service thì Message queue không phải lựa chọn hàng đầu mà phải chọn các cơ chế khác phù hợp hơn như Rest hoặc rGPC

##### Ứng dụng của Message Queue trong thực tế

- Message được lưu giữ trong hàng đợi (queue) nên khi các thành phần xử lý gặp lỗi hoặc bộ phận trong hệ thống gặp sự cố thì không mất dữ liệu. Khi hệ thống được phục hồi thì có thể tiếp tục lấy message trong queue để xử lý tiếp.
- Khi số lượng Message quá lớn, thì cơ chế xử lý bất đồng bộ sẽ phát huy hiệu quả. Các Message sẽ được xử lý dần dần cho tới khi hoàn tất mà không sợ bị thất thoát thông tin hoặc gây quá tải cho hệ thống.
- Các thành phần hoạt động tách biệt nên dễ dàng mở rộng hệ thống. Trong thực tế có những thời điểm lượng message tăng cao thì có thể tăng lượng consumer lên để xử lý.

#### Tìm hiểu cách sử dụng BullMQ ?

##### Khái niệm

Bull là một trong số các thư viện hỗ trợ message queue rất tốt trên NodeJS (bên cạnh RabbitMQ, Kafka, rsmq, agenda,...), và dựa trên Redis để lưu dữ liệu.

##### Cách sử dụng BullMQ

- Tạo một queue và thêm các job vào queue

```js
import { Queue } from "bullmq";

const myQueue = new Queue("foo");
async function addJobs() {
  await myQueue.add("myJobName", { foo: "bar" });
  await myQueue.add("myJobName", { qux: "baz" });
}
await addJobs();
```

- Tạo worker để xử lý các job trong queue

```js
import { Worker } from "bullmq";
const worker = new Worker("foo", async (job) => {
  console.log(job.data);
});
```

- Lắng nghe sự thay đổi từ các job được xử lý:

```js
worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});
```

- Sử dụng class QueueEvents để lắng nghe sự thay đổi từ các worker được chỉ định.

```js
import { QueueEvents } from "bullmq";

const queueEvents = new QueueEvents();

queueEvents.on("waiting", ({ jobId }) => {
  console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on("active", ({ jobId, prev }) => {
  console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on("completed", ({ jobId, returnvalue }) => {
  console.log(`${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`${jobId} has failed with reason ${failedReason}`);
});
```

#### Tìm hiểu cách sử dụng bull-board ?

##### Khái niệm

Bull Dashboard là một giao diện người dùng được xây dựng trên Bull hoặc BullMQ giúp ta có cái nhìn trực quan về các queue và job trong hệ thống.

##### Cách sử dụng bull-board?

- Set up bull-board:

```js
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { emailQueue } from "../../queues/emailQueue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/api/admin/queues"); // Set path

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)], // Set queue
  serverAdapter: serverAdapter,
});

export default serverAdapter;
```

- Cập nhật lại router

```js
import express from "express";
import accessRoute from "./access/index";
import userRoute from "./user/index";
import queueRoute from "./queue";
const router = express.Router();

router.use("/admin/queues", queueRoute.getRouter());
router.use("/", accessRoute);
router.use("/", userRoute);

export default router;
```
