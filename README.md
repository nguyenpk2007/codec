# Modern C++ Learning Hub 🚀

Trang web tương tác toàn diện hướng dẫn kiến thức **C++ Hiện đại (Modern C++ chuẩn C++11 / C++17 / C++20 / C++23)** và luyện tập cú pháp thực hành.

---

## 🌟 Tính năng nổi bật của Website

1. **Lộ trình bài học chuẩn mực thời điểm hiện tại:**
   - **Nhập môn C++ Chuẩn:** Cấu trúc chương trình hiện đại (`int main()`, `#include <iostream>`, thư viện `<print>` với `std::println` trong C++23).
   - **Biến & Kiểu dữ liệu an toàn:** Suy luận kiểu `auto`, Uniform Initialization `{}` chống lỗi thu hẹp kiểu (narrowing), `std::string_view` tối ưu bộ nhớ không cần cấp phát, tính toán compile-time với `constexpr`.
   - **Cấu trúc rẽ nhánh & Vòng lặp cải tiến:** `if` kèm khởi tạo biến `if (init; condition)` (C++17), Range-based `for` loop (`const auto& x : container`) loại bỏ hoàn toàn lỗi truy cập ngoài mảng.
   - **Hàm & Lambda Expression:** Tham chiếu hằng `const T&`, Lambda function `[capture](params) -> return_type` ứng dụng trong sắp xếp và xử lý dữ liệu.
   - **Quản lý bộ nhớ thông minh (Smart Pointers):** Xóa bỏ lỗi rò rỉ bộ nhớ (Memory Leak) với `std::unique_ptr` và `std::make_unique` (nói không với `new`/`delete` thủ công).
   - **Thư viện chuẩn STL & Ranges (C++20):** `std::vector`, pipeline functional với `std::ranges` (`| std::views::filter | std::views::transform`).

2. **Khu vực luyện tập cú pháp tương tác (Syntax Practice):**
   - **Điền khuyết trực tiếp (Fill-in code holes):** Nhập trực tiếp từ khóa, toán tử vào mã nguồn, bấm kiểm tra kết quả ngay lập tức với giải thích chi tiết.
   - **Trắc nghiệm tư duy C++ Hiện đại:** Các câu hỏi phân tích sự khác nhau giữa cách code C++98 cũ và chuẩn mới.
   - **Trình mô phỏng thực thi (Playground Simulator):** Soạn thảo mã C++ và xem kết quả chạy mô phỏng trực tiếp trên Console Terminal.
   - **Bảng tra cứu nhanh (Cheat Sheet):** Bảng so sánh 2 cột trực quan: Cú pháp lỗi thời (C++98) vs Cú pháp chuẩn hiện đại.

3. **Giao diện & Trải nghiệm (UI/UX):**
   - Chế độ **Dark Mode / Light Mode** tùy chọn.
   - Theo dõi tiến độ học tập (Progress Bar) tự động lưu vào trình duyệt (`localStorage`).
   - Tìm kiếm nhanh bài học theo từ khóa.
   - Nút sao chép mã nguồn 1-click.

---

## 🚀 Cách mở và sử dụng

### Cách 1: Mở trực tiếp bằng trình duyệt (Nhanh nhất)
1. Truy cập thư mục:
   ```
   C:\Users\ADMIN\.gemini\antigravity\scratch\cpp-learn-hub\
   ```
2. Nhấp đúp chuột vào tệp `index.html` để mở ngay trên trình duyệt (Chrome, Edge, Firefox,...).

### Cách 2: Chạy qua Python Local Server (Nếu muốn)
Mở PowerShell tại thư mục này và gõ:
```powershell
python -m http.server 8080
```
Sau đó truy cập: `http://localhost:8080` trên trình duyệt.
