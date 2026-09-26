/**
 * Database kiến thức C++ Hiện đại và các bài tập luyện tập cú pháp
 */
const CPP_DATABASE = {
  categories: [
    {
      id: "basics",
      title: "1. Nhập môn C++ Hiện đại",
      description: "Cấu trúc chương trình chuẩn, xuất nhập dữ liệu hiện đại (std::cout vs std::print trong C++23)",
      icon: "rocket",
      lessons: [
        {
          id: "intro-structure",
          title: "Cấu trúc một chương trình C++ chuẩn",
          difficulty: "Cơ bản",
          standard: "C++20 / C++23",
          summary: "Tìm hiểu cấu trúc tối giản, hàm main(), chỉ thị tiền xử lý #include và namespace.",
          explanation: `
<p>Một chương trình C++ hiện đại luôn bắt đầu từ hàm <code>main()</code>. Điểm khác biệt lớn nhất của C++ thời điểm hiện tại so với thời C++98/03 là mã nguồn ngắn gọn hơn, an toàn hơn về kiểu dữ liệu và hỗ trợ các tính năng mới như <code>std::print</code> (từ C++23) bên cạnh <code>std::cout</code> truyền thống.</p>

<div class="tip-box">
  <strong>💡 Lưu ý quan trọng:</strong> Hiện nay trên giảng đường nhiều nơi vẫn dạy <code>#include &lt;iostream.h&gt;</code> hoặc <code>void main()</code>. Cả hai cách này <strong>đã lỗi thời và vi phạm chuẩn C++</strong>. Chuẩn luôn là <code>&lt;iostream&gt;</code> (không có đuôi .h) và <code>int main()</code>.
</div>

<h4>1.1. Cấu trúc chương trình kinh điển (C++11 đến C++20)</h4>
<p>Sử dụng dòng xuất nhập tiêu chuẩn từ thư viện <code>&lt;iostream&gt;</code>:</p>
`,
          codeExample: `#include <iostream>

// Hàm main là điểm bắt đầu của mọi chương trình C++
int main() {
    // std::cout dùng để in dữ liệu ra màn hình console
    // std::endl dùng để xuống dòng và xả bộ đệm (flush buffer)
    std::cout << "Xin chao! Day la C++ hien dai!" << std::endl;
    
    // C++ tu dong hieu return 0 neu khong ghi ro
    return 0;
}`,
          modernVsOld: {
            oldStyle: `// Phong cách cũ (C++98):
#include <iostream.h> // Lỗi thời!
void main() {         // Không chuẩn!
    printf("Hello\\n");
}`,
            modernStyle: `// Phong cách C++23 mới nhất:
#include <print> // Thư viện mới trong C++23

int main() {
    // Không cần dùng toán tử << cồng kềnh, định dạng trực quan!
    std::println("Xin chao {}! Ban dang hoc C++ {}", "Ban", 23);
    return 0;
}`
          },
          keyPoints: [
            "Mọi chương trình chuẩn bắt buộc dùng 'int main()', không dùng 'void main()'.",
            "'#include <iostream>' là thư viện nhập xuất cơ bản.",
            "Chuẩn C++23 đã thêm thư viện '<print>' với cú pháp định dạng siêu tốc và dễ đọc tương tự Python/Rust.",
            "Nên hạn chế lạm dụng 'using namespace std;' trong các dự án thực tế để tránh xung đột tên."
          ]
        },
        {
          id: "input-output",
          title: "Xuất nhập dữ liệu an toàn",
          difficulty: "Cơ bản",
          standard: "C++17 / C++20",
          summary: "Nhập dữ liệu với std::cin, std::getline và xử lý trôi lệnh thường gặp.",
          explanation: `
<p>Nhập xuất dữ liệu là thao tác cơ bản nhất. Trong C++, <code>std::cin</code> được dùng để nhập các kiểu dữ liệu cơ bản, trong khi <code>std::getline</code> dùng để đọc cả dòng văn bản có chứa khoảng trắng.</p>
<h4>Hiện tượng trôi dòng (Buffer Trashing) và cách khắc phục:</h4>
<p>Khi bạn nhập số qua <code>std::cin >> age;</code> rồi nhấn Enter, ký tự xuống dòng <code>'\\n'</code> vẫn nằm trong bộ đệm. Nếu gọi tiếp <code>std::getline</code>, nó sẽ nuốt luôn ký tự xuống dòng này dẫn đến bỏ qua lượt nhập họ tên.</p>
`,
          codeExample: `#include <iostream>
#include <string>
#include <limits>

int main() {
    int tuoi;
    std::cout << "Nhap tuoi cua ban: ";
    std::cin >> tuoi;

    // Xóa ký tự newline '\\n' còn tồn đọng trong bộ đệm:
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');

    std::string hoTen;
    std::cout << "Nhap ho va ten: ";
    std::getline(std::cin, hoTen);

    std::cout << "\\n--- THONG TIN ---\\n";
    std::cout << "Xin chao: " << hoTen << ", Tuoi: " << tuoi << "\\n";

    return 0;
}`,
          keyPoints: [
            "Dùng 'std::cin >> x' cho số hoặc chuỗi không chứa dấu cách.",
            "Dùng 'std::getline(std::cin, str)' để đọc chuỗi có dấu cách.",
            "Dùng 'std::cin.ignore()' sau khi dùng 'cin >>' để tránh lỗi trôi dòng."
          ]
        }
      ]
    },
    {
      id: "variables-types",
      title: "2. Biến & Kiểu dữ liệu Hiện đại",
      description: "Suy luận kiểu với auto, Uniform Initialization {}, constexpr và std::string_view",
      icon: "box",
      lessons: [
        {
          id: "auto-and-init",
          title: "Suy luận kiểu (auto) & Khởi tạo đồng nhất {}",
          difficulty: "Cơ bản",
          standard: "C++11 / C++17",
          summary: "Tự động suy luận kiểu dữ liệu với từ khóa auto và tránh lỗi thu hẹp kiểu bằng Uniform Initialization.",
          explanation: `
<p>Trong C++ hiện đại, bạn không cần phải tự tay gõ những kiểu dữ liệu dài dòng như <code>std::vector&lt;int&gt;::const_iterator</code>. Từ khóa <code>auto</code> cho phép trình biên dịch tự suy luận kiểu tại thời điểm biên dịch (Compile-time) mà không làm suy giảm hiệu năng!</p>

<h4>Uniform Initialization (Khởi tạo bằng dấu ngoặc nhọn {})</h4>
<p>Khởi tạo dạng <code>int x{10};</code> ra đời từ C++11 nhằm giải quyết vấn đề khởi tạo mơ hồ (Most Vexing Parse) và ngăn chặn lỗi mất dữ liệu ngầm (narrowing conversion).</p>
`,
          codeExample: `#include <iostream>
#include <string>

int main() {
    // 1. Uniform Initialization {}
    int a{42};            // An toan
    double pi{3.14159};

    // int loi{3.14};    // LỖI BIÊN DỊCH: Ngăn chặn tự ý ép kiểu thu hẹp!

    // 2. Suy luận kiểu auto
    auto soLuong = 100;           // Trình biên dịch hiểu là int
    auto diem = 9.5;              // Trình biên dịch hiểu là double
    auto thongBao = "Hello C++";  // Trình biên dịch hiểu là const char*
    using namespace std::string_literals;
    auto s = "Hello C++"s;        // Trình biên dịch hiểu là std::string (C++14)

    std::cout << "Gia tri: " << a << ", pi: " << pi << "\\n";
    std::cout << "So luong: " << soLuong << ", Diem: " << diem << "\\n";

    return 0;
}`,
          modernVsOld: {
            oldStyle: `int x = 10;
int y = 3.99; // Cảnh báo hoặc âm thầm mất dữ liệu thành 3!`,
            modernStyle: `int x{10};
// int y{3.99}; // Trình biên dịch báo lỗi ngay: Không được phép narrowing!`
          },
          keyPoints: [
            "Ưu tiên dùng Uniform Initialization '{}' khi khởi tạo biến.",
            "'auto' giúp mã nguồn dễ đọc hơn, đặc biệt khi làm việc với STL và vòng lặp.",
            "'auto' xác định kiểu ở thời điểm biên dịch (compile-time), tốc độ thực thi tương đương 100% so với ghi kiểu thủ công."
          ]
        },
        {
          id: "string-view-constexpr",
          title: "std::string_view & constexpr trong C++",
          difficulty: "Trung bình",
          standard: "C++17 / C++20",
          summary: "Tối ưu hóa chuỗi không cần cấp phát bộ nhớ với string_view và tính toán trước lúc dịch với constexpr.",
          explanation: `
<p>Truyền <code>std::string</code> theo tham trị sẽ làm sao chép chuỗi và cấp phát động trên Heap, gây tốn tài nguyên. Trong C++17, <code>std::string_view</code> ra đời như một "cửa sổ quan sát" chuỗi mà không tạo ra bất kỳ bản sao nào.</p>
<p>Từ khóa <code>constexpr</code> (và <code>consteval</code> trong C++20) cho phép thực thi phép tính ngay khi biên dịch, biến chương trình chạy nhanh hơn ở runtime.</p>
`,
          codeExample: `#include <iostream>
#include <string_view>

// std::string_view: Không sao chép bộ nhớ chuỗi!
void inLoiChao(std::string_view name) {
    std::cout << "Xin chao, " << name << "!\\n";
}

// Hàm tính toán ngay khi biên dịch (Compile-time evaluation)
constexpr int tinhBinhPhuong(int n) {
    return n * n;
}

int main() {
    inLoiChao("Lap trinh vien"); // Truyền chuỗi string literal -> 0 chi phí cấp phát!

    constexpr int ketQua = tinhBinhPhuong(12); // Máy tính sẵn: 144
    std::cout << "12^2 = " << ketQua << "\\n";

    return 0;
}`,
          keyPoints: [
            "Dùng 'std::string_view' làm tham số hàm chỉ đọc chuỗi để tối ưu hiệu năng vượt trội.",
            "'constexpr' yêu cầu trình biên dịch tính toán trước nếu có thể.",
            "Không lưu trữ 'std::string_view' khi chuỗi gốc bị hủy (tránh dangling view)."
          ]
        }
      ]
    },
    {
      id: "control-flow",
      title: "3. Cấu trúc điều khiển & Vòng lặp mới",
      description: "Lệnh if có khởi tạo biến, switch an toàn, vòng lặp Range-based for loop",
      icon: "git-branch",
      lessons: [
        {
          id: "range-based-for",
          title: "Vòng lặp Range-based for loop",
          difficulty: "Cơ bản",
          standard: "C++11 / C++20",
          summary: "Cách duyệt mảng và danh sách hiện đại, sạch sẽ và hạn chế lỗi tràn mảng (out of bounds).",
          explanation: `
<p>Thay vì viết <code>for (int i = 0; i &lt; n; i++)</code> dễ dẫn đến lỗi vượt chỉ số, C++11 giới thiệu vòng lặp <strong>Range-based for</strong>.</p>
<h4>Ba cách viết phổ biến:</h4>
<ul>
  <li><code>for (auto x : container)</code>: Sao chép từng phần tử (phù hợp với kiểu số nguyên, số thực nhỏ).</li>
  <li><code>for (const auto& x : container)</code>: <strong>Khuyên dùng nhất!</strong> Đọc phần tử qua tham chiếu hằng, không tốn chi phí sao chép.</li>
  <li><code>for (auto& x : container)</code>: Cho phép chỉnh sửa trực tiếp giá trị của phần tử trong mảng.</li>
</ul>
`,
          codeExample: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> danhSach = {10, 20, 30, 40, 50};

    // 1. Duyệt và sửa đổi giá trị (dùng auto&)
    for (auto& x : danhSach) {
        x *= 2; // Nhân đôi giá trị mỗi phần tử
    }

    // 2. Duyệt chỉ đọc (dùng const auto& - Tối ưu nhất)
    std::cout << "Cac phan tu sau khi gap doi: ";
    for (const auto& x : danhSach) {
        std::cout << x << " ";
    }
    std::cout << "\\n";

    return 0;
}`,
          modernVsOld: {
            oldStyle: `// Phong cách cũ C++98:
for (size_t i = 0; i < danhSach.size(); ++i) {
    std::cout << danhSach[i] << " ";
}`,
            modernStyle: `// Phong cách C++ hiện đại:
for (const auto& item : danhSach) {
    std::cout << item << " ";
}`
          },
          keyPoints: [
            "Ưu tiên sử dụng 'const auto&' khi chỉ cần đọc danh sách.",
            "Dùng 'auto&' khi cần sửa đổi trực tiếp phần tử.",
            "Tránh lỗi truy cập ngoài biên mảng 'index out of range'."
          ]
        },
        {
          id: "if-with-init",
          title: "Lệnh if và switch kèm khởi tạo biến (C++17)",
          difficulty: "Trung bình",
          standard: "C++17",
          summary: "Giới hạn phạm vi biến (scope) ngay trong câu lệnh điều kiện if(init; condition).",
          explanation: `
<p>Từ C++17, bạn có thể tạo và gán giá trị cho một biến ngay bên trong câu lệnh <code>if</code> hoặc <code>switch</code>. Biến này chỉ tồn tại trong phạm vi khối <code>if-else</code> đó, tránh làm bẩn phạm vi bên ngoài.</p>
`,
          codeExample: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> diemThi = {
        {"An", 9},
        {"Binh", 8},
        {"Chi", 10}
    };

    // Khởi tạo biến 'it' ngay trong lệnh if:
    if (auto it = diemThi.find("Binh"); it != diemThi.end()) {
        std::cout << "Tim thay Binh! Diem: " << it->second << "\\n";
    } else {
        std::cout << "Khong tim thay hoc sinh nay.\\n";
    }
    // Biến 'it' biến mất ở đây, không còn dùng được nữa -> Rất sạch sẽ!

    return 0;
}`,
          keyPoints: [
            "Cú pháp: 'if (khởi_tạo; điều_kiện) { ... }'.",
            "Giúp mã nguồn an toàn hơn vì biến cục bộ tự hủy sau khi khối if kết thúc.",
            "Đặc biệt hữu dụng khi kiểm tra kết quả tìm kiếm trong mảng hoặc map."
          ]
        }
      ]
    },
    {
      id: "functions-lambdas",
      title: "4. Hàm & Biểu thức Lambda",
      description: "Truyền tham chiếu, giá trị mặc định, hàm ẩn danh Lambda [capture](params)",
      icon: "code",
      lessons: [
        {
          id: "pass-by-ref",
          title: "Truyền tham chiếu hằng (const Reference)",
          difficulty: "Cơ bản",
          standard: "C++11/C++17",
          summary: "Tối ưu hóa tốc độ gọi hàm bằng cách tránh sao chép các đối tượng lớn.",
          explanation: `
<p>Khi truyền một đối tượng lớn như <code>std::string</code> hay <code>std::vector</code> vào hàm, nếu truyền thường (Pass-by-value) thì C++ sẽ tạo một bản sao hoàn chỉnh, gây chậm chương trình.</p>
<p>Giải pháp chuẩn của C++ hiện đại là truyền <strong>tham chiếu hằng (const T&)</strong>. Dấu <code>&</code> giúp tránh sao chép, còn từ khóa <code>const</code> đảm bảo hàm không thể vô tình sửa đổi dữ liệu gốc.</p>
`,
          codeExample: `#include <iostream>
#include <vector>
#include <string>

// const std::string&: Nhanh chóng, an toàn, không sao chép chuỗi
void chaoMung(const std::string& ten) {
    std::cout << "Xin chao mung ban: " << ten << "\\n";
    // ten = "Loi"; // LỖI BIÊN DỊCH: const ngăn chặn sửa đổi
}

// std::vector<int>&: Có thể thay đổi danh sách gốc
void themPhanTu(std::vector<int>& ds, int giaTri) {
    ds.push_back(giaTri);
}

int main() {
    std::string ten = "Nguyen Van A";
    chaoMung(ten);

    std::vector<int> numbers = {1, 2, 3};
    themPhanTu(numbers, 99);

    std::cout << "Kich thuoc vector: " << numbers.size() << "\\n"; // In ra 4
    return 0;
}`,
          keyPoints: [
            "Với các kiểu cơ bản (int, double, char, bool): Truyền trực tiếp theo giá trị (Pass-by-value).",
            "Với kiểu đối tượng phức tạp (std::string, vector, class): Ưu tiên truyền 'const T&'.",
            "Chỉ dùng 'T&' (không có const) khi mục đích của hàm là làm thay đổi biến truyền vào."
          ]
        },
        {
          id: "lambda-expressions",
          title: "Biểu thức Lambda (Hàm ẩn danh)",
          difficulty: "Trung bình",
          standard: "C++11 / C++14 / C++20",
          summary: "Tạo hàm nhanh tại chỗ với cú pháp [capture](params) -> return_type { body }.",
          explanation: `
<p><strong>Lambda</strong> là một trong những tính năng mạnh mẽ nhất của C++ hiện đại. Nó cho phép bạn định nghĩa một hàm ẩn danh ngay tại vị trí cần dùng, rất thuận tiện khi kết hợp với các thuật toán của thư viện chuẩn (STL algorithms).</p>

<h4>Cú pháp Lambda:</h4>
<pre><code>[danh_sách_bắt](danh_sách_tham_số) -> kiểu_trả_về {
    // Thân hàm
};</code></pre>
<ul>
  <li><code>[]</code>: Không bắt biến nào từ phạm vi ngoài.</li>
  <li><code>[&]</code>: Bắt tất cả biến bên ngoài theo tham chiếu.</li>
  <li><code>[=]</code>: Bắt tất cả biến bên ngoài theo bản sao giá trị.</li>
  <li><code>[x, &y]</code>: Bắt x theo giá trị, y theo tham chiếu.</li>
</ul>
`,
          codeExample: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9, 4};

    // Lambda sắp xếp giảm dần
    std::sort(nums.begin(), nums.end(), [](int a, int b) {
        return a > b;
    });

    int heSo = 10;
    // Lambda bắt biến 'heSo' từ bên ngoài bằng [heSo]
    auto nhanHeSo = [heSo](int x) {
        return x * heSo;
    };

    std::cout << "3 * 10 = " << nhanHeSo(3) << "\\n";

    std::cout << "Mang giam dan: ";
    for (int n : nums) std::cout << n << " ";
    std::cout << "\\n";

    return 0;
}`,
          keyPoints: [
            "Lambda cực kỳ phổ biến trong các thuật toán như 'std::sort', 'std::find_if', 'std::for_each'.",
            "Cẩn thận khi dùng '[&]' trong các tác vụ bất đồng bộ hoặc lưu trữ dài hạn để tránh tham chiếu đến biến rác (dangling reference).",
            "C++14 trở đi hỗ trợ Generic Lambda: '[](auto a, auto b) { return a + b; }'."
          ]
        }
      ]
    },
    {
      id: "smart-pointers",
      title: "5. Quản lý bộ nhớ thông minh (Smart Pointers)",
      description: "Xóa sổ lỗi rò rỉ bộ nhớ (Memory Leak) với std::unique_ptr và std::shared_ptr",
      icon: "shield",
      lessons: [
        {
          id: "unique-pointer",
          title: "std::unique_ptr & std::make_unique",
          difficulty: "Nâng cao cơ bản",
          standard: "C++11 / C++14",
          summary: "Sở hữu độc quyền con trỏ và tự động giải phóng bộ nhớ (RAII), không bao giờ lo quên delete.",
          explanation: `
<p>Trước C++11, lập trình viên C++ thường xuyên gặp lỗi <strong>Memory Leak</strong> (rò rỉ bộ nhớ) do dùng <code>new</code> nhưng quên <code>delete</code>. Trong C++ hiện đại, nguyên tắc vàng là:</p>
<div class="tip-box">
  <strong>🔥 Nguyên tắc C++ Hiện đại:</strong> Không bao giờ tự tay gọi <code>new</code> và <code>delete</code>. Hãy sử dụng Smart Pointers!
</div>
<p><code>std::unique_ptr</code> là con trỏ thông minh sở hữu <strong>độc quyền</strong> vùng nhớ. Khi con trỏ này rời khỏi phạm vi (scope), bộ nhớ sẽ <strong>tự động được giải phóng 100%</strong>.</p>
`,
          codeExample: `#include <iostream>
#include <memory> // Thư viện chứa Smart Pointers

class NguoiDung {
public:
    NguoiDung() { std::cout << "-> Khoi tao Nguoi Dung!\\n"; }
    ~NguoiDung() { std::cout << "<- Giai phong Nguoi Dung tu dong!\\n"; }
    void xinChao() const { std::cout << "Xin chao tu Smart Pointer!\\n"; }
};

int main() {
    std::cout << "--- Bat dau khoi block ---\\n";
    {
        // Khởi tạo con trỏ an toàn với std::make_unique (từ C++14)
        auto user = std::make_unique<NguoiDung>();
        user->xinChao();
        
        // Không thể sao chép unique_ptr:
        // auto user2 = user; // LỖI BIÊN DỊCH!
    } 
    // Hết khối block {}, 'user' tự động được hủy mà KHÔNG CẦN delete!
    std::cout << "--- Da ket thuc block ---\\n";

    return 0;
}`,
          modernVsOld: {
            oldStyle: `// Phong cách C++ cổ xưa (Dễ lỗi rò rỉ bộ nhớ):
NguoiDung* u = new NguoiDung();
u->xinChao();
delete u; // Quên dòng này là rò rỉ RAM!`,
            modernStyle: `// C++ Hiện đại:
auto u = std::make_unique<NguoiDung>();
u->xinChao();
// Tự động thu hồi RAM khi kết thúc hàm!`
          },
          keyPoints: [
            "Bao gồm thư viện '<memory>'.",
            "Ưu tiên dùng 'std::make_unique<T>()' để tạo con trỏ.",
            "Không thể copy 'unique_ptr', nhưng có thể chuyển quyền sở hữu bằng 'std::move()'."
          ]
        }
      ]
    },
    {
      id: "stl-containers",
      title: "6. Thư viện chuẩn STL cơ bản & Hiện đại",
      description: "Sử dụng mảng động std::vector, bảng băm std::unordered_map và std::ranges (C++20)",
      icon: "layers",
      lessons: [
        {
          id: "vector-usage",
          title: "std::vector và các thao tác an toàn",
          difficulty: "Cơ bản",
          standard: "C++11 / C++20",
          summary: "Mảng động mạnh mẽ nhất trong C++, tự động co giãn kích thước.",
          explanation: `
<p>Thay vì sử dụng mảng tĩnh kiểu C như <code>int arr[100];</code> với kích thước cố định, <code>std::vector</code> là lựa chọn mặc định hàng đầu trong C++. Nó tự động phân bổ và giải phóng bộ nhớ khi cần thiết.</p>
<h4>Các phương thức quan trọng:</h4>
<ul>
  <li><code>.push_back(val)</code> hoặc <code>.emplace_back(val)</code>: Thêm phần tử vào cuối.</li>
  <li><code>.size()</code>: Lấy số lượng phần tử.</li>
  <li><code>.empty()</code>: Kiểm tra vector có rỗng không.</li>
  <li><code>.at(index)</code>: Truy cập có kiểm tra biên (ném ngoại lệ nếu vượt mảng).</li>
</ul>
`,
          codeExample: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // Khởi tạo vector với danh sách giá trị
    std::vector<int> diemSo = {7, 8, 9, 6, 10};

    // Thêm phần tử mới
    diemSo.push_back(8);

    // Truy cập an toàn với at()
    std::cout << "Diem dau tien: " << diemSo.at(0) << "\\n";

    // Sắp xếp tăng dần với thuật toán STL
    std::sort(diemSo.begin(), diemSo.end());

    std::cout << "Danh sach diem sau khi sap xep: ";
    for (const auto& diem : diemSo) {
        std::cout << diem << " ";
    }
    std::cout << "\\n";

    return 0;
}`,
          keyPoints: [
            "Ưu tiên 'std::vector' thay cho mảng thô mảng tĩnh C-style.",
            "Dùng 'emplace_back()' khi thêm đối tượng phức tạp để tối ưu hiệu năng.",
            "Dùng 'empty()' thay vì so sánh 'size() == 0'."
          ]
        },
        {
          id: "ranges-cpp20",
          title: "Ranges trong C++20 (Cú pháp đường ống pipe |)",
          difficulty: "Nâng cao cơ bản",
          standard: "C++20",
          summary: "Xử lý dữ liệu kiểu functional cực kỳ thanh lịch tương tự LINQ trong C# hay Streams trong Java.",
          explanation: `
<p>C++20 mang đến thư viện <strong>std::ranges</strong> và các <strong>Views</strong>. Bạn có thể kết hợp các thao tác lọc (filter), biến đổi (transform) dữ liệu bằng toán tử đường ống <code>|</code> mà không cần tạo các mảng phụ trung gian.</p>
`,
          codeExample: `#include <iostream>
#include <vector>
#include <ranges> // Tính năng C++20

int main() {
    std::vector<int> soNguyen = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Lọc số chẵn và nhân đôi giá trị bằng cú pháp Pipe |
    auto ketQua = soNguyen 
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * 2; });

    std::cout << "Cac so chan sau khi nhan doi: ";
    for (int n : ketQua) {
        std::cout << n << " "; // In ra: 4 8 12 16 20
    }
    std::cout << "\\n";

    return 0;
}`,
          keyPoints: [
            "C++20 Ranges không tạo bản sao mảng phụ, tiết kiệm RAM tối đa.",
            "Cú pháp đường ống '|' giúp code logic dễ đọc từ trái qua phải.",
            "Yêu cầu trình biên dịch hỗ trợ C++20 trở lên (GCC 10+, Clang 13+, MSVC 2019 16.10+)."
          ]
        }
      ]
    }
  ],

  // BÀI TẬP LUYỆN TẬP CÚ PHÁP TƯƠNG TÁC
  syntaxExercises: [
    {
      id: "ex-1",
      title: "Bài tập 1: Khởi tạo biến Uniform & Suy luận kiểu auto",
      category: "variables-types",
      difficulty: "Dễ",
      description: "Điền từ khóa hoặc ký hiệu thích hợp vào các ô trống để biến 'tuoi' được khởi tạo bằng Uniform Initialization và biến 'diem' tự động suy luận kiểu.",
      template: `// Khoi tao bien 'tuoi' co gia tri 20 bang Uniform Initialization (dau ngoac nhon)
int tuoi___HOLE_1___20___HOLE_2___;

// Su dung tu khoa tu dong suy luan kieu cho bien 'diem'
___HOLE_3___ diem = 9.75;`,
      holes: [
        { id: "HOLE_1", placeholder: "kí tự", expected: "{" },
        { id: "HOLE_2", placeholder: "kí tự", expected: "}" },
        { id: "HOLE_3", placeholder: "từ khóa", expected: "auto" }
      ],
      explanation: "Trong C++11 trở lên, Uniform Initialization sử dụng dấu ngoặc nhọn `{}` để ngăn chặn lỗi thu hẹp kiểu (narrowing), còn `auto` cho phép trình biên dịch tự suy ra kiểu `double` cho biến `diem`."
    },
    {
      id: "ex-2",
      title: "Bài tập 2: Vòng lặp Range-based for tối ưu",
      category: "control-flow",
      difficulty: "Trung bình",
      description: "Điền các từ khóa còn thiếu để tạo vòng lặp duyệt mảng chuỗi an toàn, tối ưu hiệu năng không sao chép và không chỉnh sửa phần tử.",
      template: `std::vector<std::string> dsTen = {"Lan", "Nam", "Tuan"};

for (___HOLE_1___ auto___HOLE_2___ ten : dsTen) {
    std::cout << ten << "\\n";
}`,
      holes: [
        { id: "HOLE_1", placeholder: "từ khóa hằng", expected: "const" },
        { id: "HOLE_2", placeholder: "toán tử tham chiếu", expected: "&" }
      ],
      explanation: "Sử dụng `const auto&` là chuẩn mực khi duyệt các đối tượng phức tạp như chuỗi `std::string` để tránh việc tạo bản sao (copy) gây tốn RAM và giảm hiệu năng."
    },
    {
      id: "ex-3",
      title: "Bài tập 3: Cú pháp hàm ẩn danh Lambda",
      category: "functions-lambdas",
      difficulty: "Trung bình",
      description: "Hoàn thiện cú pháp biểu thức Lambda cộng hai số nguyên và trả về kết quả.",
      template: `auto congHaiSo = ___HOLE_1___(int a, int b) {
    return a + b;
};

int ketQua = congHaiSo(15, 25);`,
      holes: [
        { id: "HOLE_1", placeholder: "cặp dấu capture", expected: "[]" }
      ],
      explanation: "Biểu thức Lambda luôn bắt đầu bằng cặp dấu ngoặc vuông capture clause `[]`. Nếu không cần bắt biến nào từ môi trường ngoài, ta để trống `[]`."
    },
    {
      id: "ex-4",
      title: "Bài tập 4: Tạo con trỏ thông minh std::unique_ptr",
      category: "smart-pointers",
      difficulty: "Khá",
      description: "Điền tên hàm helper chuẩn C++14 để khởi tạo một `std::unique_ptr<int>` an toàn không dùng từ khóa new.",
      template: `#include <memory>

int main() {
    // Tao unique_ptr quan ly so nguyen 100 an toan
    auto ptr = std::___HOLE_1___<int>(100);
    
    std::cout << *ptr << "\\n";
    return 0;
}`,
      holes: [
        { id: "HOLE_1", placeholder: "hàm khởi tạo", expected: "make_unique" }
      ],
      explanation: "`std::make_unique<T>(args)` ra đời từ C++14 là phương thức tiêu chuẩn được khuyến nghị để tạo `std::unique_ptr`, an toàn với ngoại lệ (exception-safe) và ngắn gọn."
    },
    {
      id: "ex-5",
      title: "Bài tập 5: Câu lệnh if có khởi tạo biến (C++17)",
      category: "control-flow",
      difficulty: "Trung bình",
      description: "Điền dấu phân cách cú pháp thích hợp giữa phần khởi tạo biến và điều kiện trong lệnh if của C++17.",
      template: `// Khoi tao bien 'x' va kiem tra dieu kien trong cung 1 lenh if
if (int x = layGiaTri()___HOLE_1___ x > 0) {
    std::cout << "Gia tri duong: " << x << "\\n";
}`,
      holes: [
        { id: "HOLE_1", placeholder: "dấu phân cách", expected: ";" }
      ],
      explanation: "Cú pháp C++17 là `if (khởi_tạo; điều_kiện)`. Dấu chấm phẩy `;` được dùng để phân cách phần khởi tạo biến với điều kiện boolean."
    }
  ],

  // BÀI TRẮC NGHIỆM TƯ DUY CÚ PHÁP
  quizzes: [
    {
      id: "quiz-1",
      question: "Trong chuẩn C++ hiện đại, cách viết nào dưới đây để khai báo hàm main() là ĐÚNG chuẩn?",
      options: [
        "void main() { ... }",
        "int main() { ... }",
        "main() { ... }",
        "float main() { ... }"
      ],
      correctIndex: 1,
      explanation: "Theo chuẩn C++ (tất cả các phiên bản từ C++98 đến C++23), hàm main() bắt buộc phải có kiểu trả về là int. Các cách khai báo khác như void main() là phi tiêu chuẩn."
    },
    {
      id: "quiz-2",
      question: "Lợi ích nổi bật nhất của Uniform Initialization với dấu ngoặc nhọn '{}' (ví dụ: int a{10};) là gì?",
      options: [
        "Tự động ép kiểu dữ liệu từ float sang int không báo lỗi",
        "Tăng tốc độ chạy chương trình lên gấp 10 lần",
        "Ngăn chặn lỗi thu hẹp kiểu dữ liệu (Narrowing conversion) ngay lúc biên dịch",
        "Cho phép lưu trữ số lớn vô hạn"
      ],
      correctIndex: 2,
      explanation: "Khi bạn viết 'int x{3.14};', trình biên dịch sẽ chặn lại và báo lỗi ngay lập tức vì 3.14 là double, tránh việc vô tình làm mất phần thập phân."
    },
    {
      id: "quiz-3",
      question: "Khi truyền một đối tượng std::string lớn vào một hàm chỉ để ĐỌC nội dung mà không sửa đổi, cách nào tối ưu nhất?",
      options: [
        "void inChuoi(std::string s)",
        "void inChuoi(std::string* s)",
        "void inChuoi(const std::string& s) hoặc void inChuoi(std::string_view s)",
        "void inChuoi(auto& s)"
      ],
      correctIndex: 2,
      explanation: "Sử dụng 'const std::string&' (hoặc 'std::string_view' từ C++17) giúp tham chiếu trực tiếp đến vùng nhớ của chuỗi mà không tạo ra bản sao, vừa nhanh vừa bảo vệ dữ liệu không bị thay đổi."
    },
    {
      id: "quiz-4",
      question: "Tại sao trong C++ hiện đại, lập trình viên được khuyến cáo KHÔNG nên dùng 'new' và 'delete' thủ công?",
      options: [
        "Vì từ khóa new và delete đã bị xóa bỏ hoàn toàn khỏi C++",
        "Vì dễ gây rò rỉ bộ nhớ (Memory Leak) và nên thay thế bằng Smart Pointers (std::unique_ptr, std::shared_ptr)",
        "Vì new và delete làm máy tính bị treo",
        "Vì smart pointer chạy chậm hơn 100 lần"
      ],
      correctIndex: 1,
      explanation: "Việc quản lý thủ công con trỏ thô rất dễ dẫn đến lỗi quên delete hoặc giải phóng 2 lần (double free). Smart Pointers áp dụng thành công mô hình RAII giúp tự động giải phóng vùng nhớ an toàn."
    },
    {
      id: "quiz-5",
      question: "Ký hiệu capture clause '[&]' trong biểu thức Lambda có ý nghĩa gì?",
      options: [
        "Bắt tất cả các biến bên ngoài theo kiểu giá trị (copy)",
        "Không cho phép truy cập bất kỳ biến bên ngoài nào",
        "Bắt tất cả các biến bên ngoài theo kiểu tham chiếu (reference)",
        "Tạo một con trỏ thô đến hàm"
      ],
      correctIndex: 2,
      explanation: "'[&]' cho phép hàm lambda truy cập và sửa đổi trực tiếp các biến trong phạm vi bao bọc nó thông qua cơ chế tham chiếu."
    }
  ],

  // BẢNG TRA CỨU CÚ PHÁP NHANH (CHEAT SHEET)
  cheatSheet: [
    {
      category: "Khai báo & Khởi tạo",
      oldSyntax: "int a = 5;\nfloat b = 3.2f;",
      modernSyntax: "int a{5};\nauto b{3.2f};",
      notes: "C++11: Đồng nhất cú pháp, an toàn kiểu với Uniform Init."
    },
    {
      category: "Duyệt danh sách / mảng",
      oldSyntax: "for (int i = 0; i < n; i++) {\n    cout << arr[i];\n}",
      modernSyntax: "for (const auto& item : arr) {\n    std::cout << item;\n}",
      notes: "C++11 Range-based for: Sạch sẽ, không sợ out-of-range."
    },
    {
      category: "Con trỏ & Bộ nhớ động",
      oldSyntax: "MyClass* p = new MyClass();\n// ...\ndelete p;",
      modernSyntax: "auto p = std::make_unique<MyClass>();\n// Tự thu hồi khi hết scope",
      notes: "C++14 std::make_unique: Không bao giờ lo memory leak."
    },
    {
      category: "Hàm ẩn danh (Lambda)",
      oldSyntax: "bool cmp(int a, int b) { return a > b; }\nsort(v.begin(), v.end(), cmp);",
      modernSyntax: "std::sort(v.begin(), v.end(),\n    [](int a, int b) { return a > b; });",
      notes: "C++11 Lambda: Định nghĩa hàm tại chỗ gọn gàng."
    },
    {
      category: "In chuỗi định dạng",
      oldSyntax: "printf(\"Ten: %s, Tuoi: %d\\n\", ten, tuoi);\nstd::cout << \"Ten: \" << ten << \"...\";",
      modernSyntax: "std::println(\"Ten: {}, Tuoi: {}\", ten, tuoi);",
      notes: "C++23 std::print / std::println: Nhanh hơn printf, an toàn kiểu."
    },
    {
      category: "Lọc mảng dữ liệu",
      oldSyntax: "vector<int> out;\nfor(int x: in) if(x%2==0) out.push_back(x);",
      modernSyntax: "auto out = in | std::views::filter([](int x){ return x % 2 == 0; });",
      notes: "C++20 Ranges: Cú pháp đường ống functional thanh lịch."
    }
  ]
};
