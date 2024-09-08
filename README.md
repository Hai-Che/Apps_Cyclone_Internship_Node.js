# Task2: Nodejs: Internal

## Tìm hiểu libUV.

#### Khái niệm

`libuv` là một thư viện đa nền tảng được viết bằng C, cung cấp giao diện bất đồng bộ (asynchronous) và hướng sự kiện (event-driven) cho các hoạt động hệ thống như I/O mạng, truy cập file, và quản lý quy trình (process management). `Libuv` được biết đến rộng rãi vì là nền tảng cơ bản cho Node.js, giúp Node.js xử lý các tác vụ I/O một cách bất đồng bộ, từ đó nâng cao hiệu suất và khả năng mở rộng.

#### Các thành phần chính của `libuv`:

- `Event-loop`: Chịu trách nhiệm quản lý các sự kiện và xử lý chúng khi chúng được kích hoạt, tiếp tục chạy cho đến khi không còn sự kiện nào cần xử lý. Các sự kiện có thể là các yêu cầu mạng, đọc/ghi file hay các tín hiệu từ hệ điều hành.
- `Quản lý I/O bất đồng bộ`: Libuv cung cấp API để thực hiện các tác vụ I/O như đọc/ghi file, kết nối mạng mà không làm gián đoạn ứng dụng chính. Điều này được thực hiện thông qua các system call bất đồng bộ.
- `Timers`: Libuv hỗ trợ các bộ định thời bất đồng bộ, cho phép thực hiện các tác vụ theo lịch trình định trước, chẳng hạn như gọi hàm sau một khoảng thời gian (setTimeOut) hoặc lặp lại một hành động sau các khoảng thời gian đều đặn(setInterval).
- `Thread Pool`: Libuv sử dụng một nhóm các luồng làm việc (worker threads) để xử lý các tác vụ I/O đồng thời mà không làm tắc nghẽn vòng lặp sự kiện chính.
- `Quản lý process`: Libuv cung cấp các API để tạo và quản lý các quy trình con, cho phép các tác vụ như phân tách công việc giữa nhiều quy trình hoặc thực hiện các lệnh hệ thống từ bên trong ứng dụng.
- `Signals`: Libuv cho phép ứng dụng lắng nghe và xử lý các tín hiệu từ hệ điều hành, chẳng hạn như SIGINT, SIGTERM, hoặc SIGHUP.

#### Ứng dụng của `libuv` trong Node.js:

- `Non-blocking I/O`: Node.js sử dụng libuv để quản lý tất cả các thao tác I/O bất đồng bộ, cho phép xử lý nhiều yêu cầu cùng một lúc mà không bị chặn.
- `Kiến trúc Event-driven`: Event loop của libuv cho phép Node.js hoạt động theo mô hình hướng sự kiện, phù hợp với các ứng dụng thời gian thực như máy chủ web, chat servers, hoặc hệ thống thu thập dữ liệu.
- `Hỗ trợ đa nền tảng`: Libuv giúp Node.js chạy trên nhiều hệ điều hành khác nhau mà không cần phải thay đổi mã nguồn chính của ứng dụng.

## Tìm hiểu Sync vs Async.

- `Synchronous`: Diễn ra tuần tự, các hành động sau sẽ được thực hiện khi tác vụ trước kết thúc.
- `Asynchronous`: Diễn ra không theo thứ tự, cho phép các tác vụ được bắt đầu và không cần chờ hoàn thành trước khi chuyển sang tác vụ khác. Trong mô hình này, khi một tác vụ đang thực hiện, chương trình có thể tiếp tục xử lý các tác vụ khác. Khi tác vụ bất đồng bộ hoàn thành, một callback, promise, hoặc async/await được sử dụng để xử lý kết quả.

## Cách NodeJS có thể chạy các tác vụ bất đồng bộ.

Để rõ hơn về cách Node.js chạy các tác vụ bất đồng bộ, ta sẽ đi qua 1 ví dụ cụ thể trong hình sau:

[Watch the video](https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fd5131502a8e84dfcab11f1c3820101b7%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=d5131502a8e84dfcab11f1c3820101b7&alt=media&optimized=true)

- Luồng thực thi chính luôn bắt đầu trong phạm vi toàn cục (global scope). Hàm toàn cục (global function) được đẩy lên call stack. Tại 1ms, "First" được log ra console và hàm được đẩy ra call stack. Tại 2ms, phương thức readFile được đẩy lên call stack. Vì readFile là một tác vụ bất đồng bộ, nên nó bị đẩy qua cho libuv.
- libuv bắt đầu đọc nội dung tệp trên một luồng riêng biệt. Tại 3ms, JavaScript, đẩy hàm log vào call stack, thực thi và đẩy ra khỏi call stack khi kết thúc.
- Tại 4ms, lúc này tác vụ đọc file đã được hoàn thành tại thread pool. Hàm callback được liên kết được thực hiện trên call stack, "Second" được log ra console và hàm log bị đẩy ra khỏi call stack.
- Khi không còn code để chạy, hàm global cũng bị đẩy khỏi ngăn xếp. Kết quả cuối cùng từ console là: "First", "Third", và "Second".
  \
  Bên cạnh đó về mặt lập trình, ta sử dụng các phương thức như Callback, Promises và async/await để xử lý các tác vụ bất đồng bộ:
- `Callback`: Phương thức chính trong Node.js để xử lý các tác vụ bất đồng bộ. Khi một tác vụ bắt đầu, thay vì chờ nó hoàn thành, Node.js sẽ chuyển một hàm callback để xử lý kết quả khi tác vụ hoàn thành.
  Ví dụ:

```js
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
```

- `Promises`: 1 cách tiếp cận khác để xử lý bất đồng bộ, tránh được vấn đề callback hell của Callback
  Ví dụ:

```js
fs.promises
  .readFile("file.txt")
  .then((data) => console.log(data.toString()))
  .catch((err) => console.error(err));
```

- `async/await`: là cú pháp mới hơn trên Promises, giúp viết code bất đồng bộ một cách gọn gàng và dễ hiểu hơn.
  Ví dụ:

```js
async function readFile() {
  try {
    const data = await fs.promises.readFile("file.txt");
    console.log(data.toString());
  } catch (err) {
    console.error(err);
  }
}
readFile();
```

## EventLoop.

EventLoop là một chương trình C, chạy liên tục miễn là ứng dụng Node.js vẫn đang hoạt động, xử lý nhiều hoạt động thực thi đồng thời. Có 6 hàng đợi khác nhau trong mỗi vòng lặp, mỗi hàng đợi giữ một hoặc nhiều hàm callback cần được thực thi trên call stack.

![Work flow of node.js](https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6b288555862049b4b5cd7f19e2ae909f?format=webp&width=2000)

- Timer queue: Chứa các callback liên quan tới hàm setTimeout và setInterval.
- I/O queue: Chứa các callback liên quan đến các phương thức async như các phương thức liên quan đến các module fs và http.
- Check queue: Chứa các callback được liên quan tới hàm setImmediate.
- Close queue: Chứa các callback được liên quan tới việc đóng sự kiện của các tác vụ bất đồng bộ.
  Hàng đợi microtask chứa hai hàng đợi riêng biệt.
- nextTick queue: Chứa các callback được liên quan tới hàm process.nextTick
- Promise queue: Chứa các callback liên quan tới Promise trong Javascript.

#### Cách event loop hoạt động:

Thứ tự thực hiện:

- Bất kỳ callback trong hàng đợi microtask đều được thực thi. Đầu tiên là các task trong nextTick queue, sau đó là các task trong promise queue.
- Tất cả callback trong timer queue được thực hiện. Chúng đại diện cho các callback hết hạn chờ và đã sẵn sàng để thực thi.
- Các callback trong hàng đợi microtask (nếu có) được thực thi sau mỗi callback trong timer queue.
- Tất cả callback trong I/O queue được thực thi.
- Các callback trong hàng đợi microtask (nếu có) được thực thi.
- Tất cả callback trong check queue được thực thi.
- Các callback trong hàng đợi microtask (nếu có) được thực hiện sau mỗi callback trong check queue.
- Tất cả callback trong close queue được thực thi.
- Các callback trong hàng đợi microtask (nếu có) được thực thi.

Nếu có nhiều callback được xử lý vào thời điểm này, vòng lặp sẽ tiếp tục và các bước tương tự được lặp lại. Mặt khác, nếu tất cả các callback được thực thi và không còn mã nào để xử lý, event loop sẽ kết thúc.

Ví dụ minh họa:
<img src="https://media.licdn.com/dms/image/v2/D4D12AQHAa2zbhYhlWw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1686229107951?e=1731542400&amp;v=beta&amp;t=V42aq3uIHYn6IW3OqRwH5TARoVX5q-Fg1-xmWZf33B0" loading="lazy" alt="Event Loop Visualizing" id="ember39" class="reader-cover-image__img evi-image lazy-image ember-view">
