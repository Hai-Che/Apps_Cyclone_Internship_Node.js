# Task3: ExpressJS

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

```js
// Route methods
app.get("/", (req, res) => {
  res.send("GET request"); // GET method
});
app.post("/", (req, res) => {
  res.send("POST request"); // POST method
});
app.put("/", (req, res) => {
  res.send("PUT request"); // PUT method
});
app.patch("/", (req, res) => {
  res.send("PATCH request"); // PATCH method
});
app.delete("/", (req, res) => {
  res.send("DELETE request"); // DELETE method
});
app.all("/secret", (req, res, next) => {
  // Load middleware functions at a path for all HTTP request methods
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});
// Route paths
// 1. Base on string
app.get("/", (req, res) => {
  res.send("root"); // Match requests to the root route
});
app.get("/about", (req, res) => {
  res.send("about"); // Match requests to /about
});
app.get("/random.text", (req, res) => {
  res.send("random.text"); // Match requests to /random.text
});
// 2. Base on string pattern
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd"); // Match acd and abcd
});
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd"); // Match abcd, abbcd, abbbcd, and so on
});
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd"); // Match abcd, abxcd, abRANDOMcd, ab123cd, and so on
});
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e"); // Match /abe and /abcde
});
// 3. Base on regular expressions
app.get(/a/, (req, res) => {
  res.send("/a/"); // Match anything with an “a” in it.
});
app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/"); // Match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
});
// Route parameters
app.get("/users/:userId/books/:bookId", (req, res) => {
  // Request URL: http://localhost:3000/users/34/books/8989
  res.send(req.params);
  // req.params: { "userId": "34", "bookId": "8989" }
});
app.get("/flights/:from-:to", (req, res) => {
  // Request URL: http://localhost:3000/flights/LAX-SFO
  res.send(req.params);
  // req.params: { "from": "LAX", "to": "SFO" }
});
app.get("/plantae/:genus.:species", (req, res) => {
  // Request URL: http://localhost:3000/plantae/Prunus.persica
  res.send(req.params);
  // req.params: { "genus": "Prunus", "species": "persica" }
});
app.get("/user/:userId(d+)", (req, res) => {
  // Request URL: http://localhost:3000/user/42
  res.send(req.params);
  // req.params: {"userId": "42"}
});
// Route handlers
// Handle by a single callback function
app.get("/example/a", (req, res) => {
  res.send("Hello from A!");
});
// Handle by more than one callback function
app.get(
  "/example/b",
  (req, res, next) => {
    // specify the next object
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);
// Handle by an array of callback functions
const cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

const cb2 = function (req, res) {
  res.send("Hello from C!");
};

app.get("/example/c", [cb1, cb2]);
// Handle by a combination of independent functions and arrays of functions
const cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

const cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

app.get(
  "/example/d",
  [cb0, cb1],
  (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from D!");
  }
);
// app.route()
// Create chainable route handlers for a route path by using app.route()
app
  .route("/book")
  .get((req, res) => {
    res.send("Get a random book");
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  });
// express.Router
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Birds home page");
});
router.get("/about", (req, res) => {
  res.send("About birds");
});
module.exports = router;
// Load the router module in the app:
const birds = require("./birds");

// ...

app.use("/birds", birds);
```

#### Tìm hiểu Middleware trong ExpressJS ?

Middleware: là một hàm có thể thực hiện các tác vụ nào đó trên yêu cầu (request) và phản hồi (response) trước khi chúng đến với route handler. Middleware có thể được sử dụng để thực hiện kiểm tra chứng thực (authentication), phân tích thông tin (logging), xử lý lỗi, và nhiều tác vụ khác.
Middleware trong ExpressJS giúp bạn xử lý các yêu cầu HTTP trước khi chúng được gửi đến route handler cuối cùng.
Cách khai báo: Là 1 hàm với ba tham số: req, res, và next. Đối với middleware dùng để xử lý lỗi sẽ có thêm 1 tham số err.
Khi triển khai middleware cần lưu ý đến thứ tự được khai báo để đảm bảo chương trình hoạt động đúng như mong muốn

Application-level middleware

```js
// Without path, the function is executed every time the app receives a request.
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
// The function is executed for any type of HTTP request on the /user/:id path.
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});
// The function handles GET requests to the /user/:id path.
app.get("/user/:id", (req, res, next) => {
  res.send("USER");
});
// Loading a series of middleware functions at a mount point, with a mount path.
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);
// Route handlers enable you to define multiple routes for a path
app.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.send("regular");
  }
);

// handler for the /user/:id path, which sends a special response
app.get("/user/:id", (req, res, next) => {
  res.send("special");
});
// Middleware can also be declared in an array for reusability.
function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

const logStuff = [logOriginalUrl, logMethod];
app.get("/user/:id", logStuff, (req, res, next) => {
  res.send("User Info");
});
```

Error-handling middleware

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

Built-in middleware
express.static: serves static assets such as HTML files, images, and so on.
express.json: parses incoming requests with JSON payloads.
express.urlencoded: parses incoming requests with URL-encoded payloads.

Third-party middleware

```js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// load the cookie-parsing middleware
app.use(cookieParser());
```

#### Tìm hiểu Error Handling ExpressJS ?

Error Handling là quá trình xử lý các lỗi xảy ra trong ứng dụng, giúp lập trình viên kiểm soát và phản hồi khi có sự cố xảy ra. Trong ExpressJS, ta có thể xử lý lỗi bằng cách sử dụng middleware.
ExpressJS có một cách đặc biệt để định nghĩa middleware cho việc xử lý lỗi. Middleware xử lý lỗi có thể được định nghĩa bằng cách thêm 4 tham số: err, req, res, next.

Catching Errors

```js
// Errors that occur in synchronous code
app.get("/", (req, res) => {
  throw new Error("BROKEN"); // Express will catch this on its own.
});
// Errors that occur in asynchronous code
app.get("/", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});
// Catch errors occur in asynchronous code by try catch block
app.get("/", (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100);
});
```

Writing error handlers
Example:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

<!-- Ex: Viết chức năng tạo người dùng

- Input : username / password / fullName / dob / address

- Validate Input ( Middleware ) :

1. username : bắt buộc / chuỗi / ít nhất 6 kí tự / chấp nhận chữ + số ( sử dụng regex ).
2. password : bắt buộc / chuỗi / ít nhất 4 kí tự / phải có chữ + số + kí tự đặc biệt ( sử dụng regex).
3. fullName : bắt buộc / chuỗi / ít nhất 6 kí tự và dài nhất 64 kí tự / chấp nhận chữ hoa + chữ thường.
4. dob : không bắt buộc / ngày ( yyyy / mm /dd ).
5. address : không bắt buộc / chuỗi.

- Sử dụng Error Handling ExpressJS để xử lý lỗi. -->
