# Task 7: JWT

#### Tìm Hiểu JWT ?

##### Khái niệm

JWT (JSON Web Token) là một tiêu chuẩn mã nguồn mở (RFC 7519) dùng để truyền tải thông tin an toàn, gọn nhẹ và khép kín giữa các bên tham gia dưới format JSON. Thông tin được chia sẻ trong JWT được xác thực và tin cậy thông qua chữ ký số (Digital signature). Các bên sẽ sử dụng mật mã khoá đối xứng (cùng với HMAC) hoặc dùng mật mã khoá công khai (cùng public và private key) để thực hiện ký số (signed).

##### Cấu tạo của JWT

JWT gồm 3 phần chính: Header, Payload và Signature. Chúng được phân tách bằng 1 dấu chấm.
Ví dụ:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

- Header: Bao gồm 2 thành phần kiểu token(JWT), và thuật toán mã hoá được sử dụng(HMAC hoặc RSA).
  Ví dụ về Header của JWT:
  {
  "alg": "HS256",
  "typ": "JWT"
  }
  Chúng sẽ được mã hóa và trở thành chuỗi đầu tiên trong JWT.
- Payload: Chứa các claims. Claims là tập hợp các thông tin đại diện cho một object và một số thông tin đi kèm. Claims có dạng Key - Value và có 3 kiểu claims bao gồm registered, public, và private claims.

* Registered Claims: là các thành phần được xác định trước của claims. Thành phần này mặc dù không bắt buộc, nhưng là thành phần nên có để cung cấp một số chức năng và thông tin hữu ích.
  Một số registered claims bao gồm :

  - iss (issuer): Tổ chức, đơn vị cung cấp, phát hành JWT.
  - sub (subject): Chủ thể của JWT, xác định rằng đây là người sở hữu hoặc có quyền truy cập các resource (tài nguyên).
  - aud (audience): Được hiểu là người nhận thông tin, và có thể xác thực tính hợp lệ của JWT.
  - exp (expiration time): Thời hạn của JWT, vượt quá thời gian này, JWT được coi là không hợp lệ.

* Public Claims: Public claims là các thành phần được xác định bởi người sử dụng JWT, được sử dụng rộng rãi trong JWT. Mặc dù việc sử dụng public claims không phải là bắt buộc, tuy nhiên để tránh xảy ra xung đột, public claims name được xác định theo danh sách dưới đây:

  - iss: Issuer
  - sub: Subject
  - aud: Audience
  - exp: Expiration Time
  - nbf: Not Before
  - iat: Issued At
  - jti: JWT ID
  - name: Full name
  - given_name: Given name(s) or first name(s)
  - family_name: Surname(s) or last name(s)
  - middle_name: Middle name(s)
  - nickname: Casual name
  - preferred_username: Shorthand name by which the End-User wishes to be referred to
  - profile: Profile page URL
  - picture: Profile picture URL

* Private Claims: Các bên sử dụng JWT có thể sẽ cần sử dụng đến claims không phải là Registered Claims, cũng không được định nghĩa trước như Public Claims. Đây là phần thông tin mà các bên tự thoả thuận với nhau, không có tài liệu hay tiêu chuẩn nào dành cho private claims.

* Signature: Signature là phần cuối cùng của JWT, có chức năng xác thực danh tính người gửi. Để tạo ra một signature chính xác, ta cần mã hóa phần header, phần payload, chọn cryptography (mật mã khoá) thích hợp đã được xác định ở header kèm secret key và thực hiện sign.

Cả bên gửi và bên nhận JWT đều sẽ xử dụng hàm này để xác định phần signature, nếu thông tin này của cả 2 bên khác nhau, JWT này được coi là không hợp lệ.

Lưu ý: Chỉ có người có secret key mới có thể sign được một signature phù hợp. Do đó, danh tính của bên gửi được đảm bảo nhờ có signature.

#### Ưu và nhược điểm của JWT

Ưu điểm:

- Gọn nhẹ: JWT nhỏ gọn, chi phí truyền tải thấp giúp tăng hiệu suất của ứng dụng.
- Bảo mật: JWT sử dụng các mật mã khoá để tiến hành xác thực người danh tính người dùng. Ngoài ra, cấu trúc của JWT cho phép chống giả mạo nên thông tin được đảm bảo an toàn trong quá trình trao đổi.
- Phổ thông: JWT được sử dụng dựa trên JSON, là một dạng dữ liệu phổ biến, có thể sử dụng ở hầu hết các ngôn ngữ lập trình. Ngoài ra, triển khai JWT tương đối dễ dàng và tích hợp được với nhiều thiết bị, vì JWT đã tương đối phổ biến.

Nhược điểm:

- Kích thước: Mặc dù trong tài liệu không ghi cụ thể giới hạn, nhưng do được truyền trên HTTP Header, vì thế, JWT có giới hạn tương đương với HTTP Header (khoảng 8KB).
- Rủi ro bảo mật: Khi sử dụng JWT không đúng cách, ví dụ như không kiểm tra tính hợp lệ của signature, không kiểm tra expire time, kẻ tấn công có thể lợi dụng sơ hở để truy cập vào các thông tin trái phép.

#### Mục đích sử dụng JWT

- Authentication (Xác thực): JWT được sử dụng để xác thực người dùng trước khi họ truy cập đến tài nguyên trên server.
- Authorization (Uỷ quyền): Khi người dùng đăng nhập thành công, application có thể truy cập vào các tài nguyên thay mặt người dùng đó. Các ứng dụng đăng nhập một lần (Single Sign-On SSO) sử dụng JWT thường xuyên vì tính nhỏ gọn và dễ dàng triển khai trên nhiều domain.
- Trao đổi thông tin an toàn: JWT được coi là một cách trao đổi thông tin an toàn vì thông tin đã được signed trước khi gửi đi.

Do đó, JWT được ứng dụng rộng rãi, có thể kể đến như:

- Single Sign-On (SSO): JWT có thể được sử dụng để cung cấp single sign-on cho người dùng. Điều này cho phép họ đăng nhập vào nhiều ứng dụng chỉ với một tài khoản duy nhất.
- API Authorization: JWT thường được sử dụng để phân quyền cho người dùng đến những tài nguyên cụ thể, từ những claims chứa trong JWT đó.
- User Authentication: JWT cung cấp khả năng xác thực người dùng và cấp quyền cho họ truy cập vào các tài nguyên mong muốn trong hệ thống.
- Microservices Communication: JWT còn có thể sử dụng cho việc giao tiếp giữa các service nhỏ trong hệ thống microservices.

#### Tìm hiểu cách hoạt động của access token và refresh token ?

##### Access Token

- Khái niệm: Access Token là một chuỗi ký tự ngẫu nhiên được sử dụng để xác thực và ủy quyền truy cập vào tài nguyên của người dùng trong một hệ thống. Khi người dùng đăng nhập thành công vào một ứng dụng, máy chủ sẽ tạo ra một access token và gửi nó về cho ứng dụng. Ứng dụng sau đó sẽ sử dụng access token này để gửi các yêu cầu đến máy chủ để truy cập các tài nguyên được phép.

- Đặc điểm:
  - Thời gian tồn tại ngắn: Access token thường có thời gian sống ngắn, ví dụ từ vài phút đến vài giờ. Điều này giúp tăng tính bảo mật vì nếu access token bị lộ, kẻ tấn công chỉ có thể sử dụng nó trong một khoảng thời gian ngắn.
  - Sử dụng cho các yêu cầu API: Access token được gửi kèm trong header của các yêu cầu HTTP (Authorization) để xác thực và ủy quyền truy cập.

##### Refresh Token

- Khái niệm: Refresh Token là một chuỗi ký tự ngẫu nhiên khác được sử dụng để lấy lại access token mới khi access token hiện tại hết hạn. Refresh token thường được sử dụng để giữ cho phiên đăng nhập của người dùng tiếp tục mà không cần người dùng phải đăng nhập lại.

- Đặc điểm:
  - Thời gian tồn tại dài: Refresh token thường có thời gian tồn tại dài hơn nhiều so với access token, có thể là vài ngày, vài tuần, hoặc thậm chí vài tháng.
  - Không sử dụng trực tiếp cho các yêu cầu API: Refresh token không được sử dụng để truy cập tài nguyên trực tiếp. Thay vào đó, nó được sử dụng để yêu cầu một access token mới từ máy chủ.

##### Cách thức hoạt động của access token và refresh token

- Đầu tiên, khi người dùng đăng nhập vào ứng dụng, nếu việc đăng nhập thành công thì phía server sẽ tạo ra một access token và một refresh token, sau đó gửi chúng về cho ứng dụng.
- Phía người dùng sử dụng access token cho các yêu cầu api đến server. Nếu access token hết hạn, refresh token sẽ được sử dụng để yêu cầu một access token mới từ server.
- Phía server xác thực các access token hoặc refresh token được gửi đến, thực hiện các yêu cầu nếu các token hợp lệ.
