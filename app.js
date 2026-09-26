/**
 * Modern C++ Learning Hub - Interactive Application Logic
 */

// State Management
const state = {
  currentTab: 'lessons',
  currentLessonId: 'intro-structure',
  completedLessons: new Set(),
  theme: localStorage.getItem('cpp_hub_theme') || 'dark',
  searchQuery: ''
};

// Khởi tạo ứng dụng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadSavedProgress();
  renderSidebar();
  renderCurrentLesson();
  renderSyntaxExercises();
  renderQuizzes();
  renderCheatSheet();
  initPlayground();
  setupEventListeners();
  updateProgressUI();
});

// Quản lý Giao diện Sáng / Tối (Theme Toggle)
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = state.theme === 'dark' ? '☀️' : '🌙';
    themeBtn.title = state.theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('cpp_hub_theme', state.theme);
  initTheme();
}

// Lưu và tải tiến độ học tập (Progress Tracking)
function loadSavedProgress() {
  try {
    const saved = localStorage.getItem('cpp_hub_completed');
    if (saved) {
      state.completedLessons = new Set(JSON.parse(saved));
    }
  } catch (e) {
    console.error("Không thể đọc tiến độ từ localStorage", e);
  }
}

function saveProgress() {
  try {
    localStorage.setItem('cpp_hub_completed', JSON.stringify([...state.completedLessons]));
    updateProgressUI();
    renderSidebar();
  } catch (e) {
    console.error("Không thể lưu tiến độ", e);
  }
}

function toggleLessonComplete(lessonId) {
  if (state.completedLessons.has(lessonId)) {
    state.completedLessons.delete(lessonId);
  } else {
    state.completedLessons.add(lessonId);
  }
  saveProgress();
  renderCurrentLesson();
}

function updateProgressUI() {
  let totalLessons = 0;
  CPP_DATABASE.categories.forEach(cat => totalLessons += cat.lessons.length);
  const completedCount = state.completedLessons.size;
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const bar = document.getElementById('progressBarFill');
  const countText = document.getElementById('progressCountText');
  const percentText = document.getElementById('progressPercentText');

  if (bar) bar.style.width = `${percent}%`;
  if (countText) countText.textContent = `${completedCount}/${totalLessons} bài học`;
  if (percentText) percentText.textContent = `${percent}%`;
}

// ==========================================
// RENDER SIDEBAR & NAVIGATION
// ==========================================
function renderSidebar() {
  const container = document.getElementById('sidebarCategories');
  if (!container) return;

  const query = state.searchQuery.toLowerCase().trim();
  let html = '';

  CPP_DATABASE.categories.forEach(category => {
    // Lọc theo tìm kiếm nếu có
    const filteredLessons = category.lessons.filter(l => 
      !query || 
      l.title.toLowerCase().includes(query) || 
      l.summary.toLowerCase().includes(query) ||
      l.standard.toLowerCase().includes(query)
    );

    if (filteredLessons.length === 0 && query) return;

    html += `
      <div class="category-group">
        <div class="category-header">${category.title}</div>
        <ul class="lesson-list">
    `;

    filteredLessons.forEach(lesson => {
      const isActive = lesson.id === state.currentLessonId;
      const isDone = state.completedLessons.has(lesson.id);

      html += `
        <li>
          <button class="lesson-nav-btn ${isActive ? 'active' : ''}" onclick="switchLesson('${lesson.id}')">
            <span>${lesson.title}</span>
            <span class="lesson-check-icon ${isDone ? 'completed' : ''}">${isDone ? '✓' : ''}</span>
          </button>
        </li>
      `;
    });

    html += `
        </ul>
      </div>
    `;
  });

  if (html === '' && query) {
    html = `<p style="color: var(--text-muted); font-size: 0.88rem; padding: 0.5rem;">Không tìm thấy bài học nào phù hợp với từ khóa "${query}".</p>`;
  }

  container.innerHTML = html;
}

function switchLesson(lessonId) {
  state.currentLessonId = lessonId;
  switchTab('lessons');
  renderSidebar();
  renderCurrentLesson();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// RENDER LESSON DETAIL
// ==========================================
function findCurrentLesson() {
  for (const cat of CPP_DATABASE.categories) {
    for (const l of cat.lessons) {
      if (l.id === state.currentLessonId) {
        return { lesson: l, category: cat };
      }
    }
  }
  return { lesson: CPP_DATABASE.categories[0].lessons[0], category: CPP_DATABASE.categories[0] };
}

function renderCurrentLesson() {
  const container = document.getElementById('lessonViewContainer');
  if (!container) return;

  const { lesson, category } = findCurrentLesson();
  const isDone = state.completedLessons.has(lesson.id);

  // Tìm bài trước / bài sau
  const allLessons = [];
  CPP_DATABASE.categories.forEach(c => c.lessons.forEach(l => allLessons.push(l)));
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  let comparisonHtml = '';
  if (lesson.modernVsOld) {
    comparisonHtml = `
      <div class="comparison-grid">
        <div class="comp-card comp-old">
          <div class="comp-header">⚠️ Cú pháp Cũ / Lỗi thời (C++98)</div>
          <pre><code>${escapeHtml(lesson.modernVsOld.oldStyle)}</code></pre>
        </div>
        <div class="comp-card comp-modern">
          <div class="comp-header">✨ Cú pháp Hiện đại Chuẩn (Modern C++)</div>
          <pre><code>${escapeHtml(lesson.modernVsOld.modernStyle)}</code></pre>
        </div>
      </div>
    `;
  }

  const keyPointsHtml = lesson.keyPoints ? `
    <div class="key-points-card">
      <div class="key-points-title">💡 Điểm cốt lõi cần ghi nhớ</div>
      <ul class="key-points-list">
        ${lesson.keyPoints.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="lesson-card">
      <div class="lesson-header-top">
        <span class="badge badge-standard">${lesson.standard}</span>
        <span class="badge badge-difficulty">${lesson.difficulty}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${category.title}</span>
      </div>

      <h1 class="lesson-title">${lesson.title}</h1>
      <p class="lesson-summary">${lesson.summary}</p>

      <div class="lesson-body">
        ${lesson.explanation}

        <h4>Mã nguồn minh họa thực tế:</h4>
        <div class="code-wrapper">
          <div class="code-header">
            <span>C++ Source Code</span>
            <button class="btn-copy" onclick="copyCode(this)">📋 Sao chép</button>
          </div>
          <pre><code class="language-cpp">${escapeHtml(lesson.codeExample)}</code></pre>
        </div>

        ${comparisonHtml}
        ${keyPointsHtml}
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-nav-action" ${!prevLesson ? 'disabled' : ''} onclick="${prevLesson ? `switchLesson('${prevLesson.id}')` : ''}">
          ← Bài trước
        </button>

        <button class="btn-nav-action btn-mark-done" onclick="toggleLessonComplete('${lesson.id}')">
          ${isDone ? '✓ Đã hoàn thành (Bấm để hủy)' : 'Đánh dấu đã hiểu bài này'}
        </button>

        <button class="btn-nav-action" ${!nextLesson ? 'disabled' : ''} onclick="${nextLesson ? `switchLesson('${nextLesson.id}')` : ''}">
          Bài tiếp theo →
        </button>
      </div>
    </div>
  `;

  // Cập nhật Highlight nếu Prism có sẵn
  if (window.Prism) {
    Prism.highlightAllUnder(container);
  }
}

// ==========================================
// RENDER SYNTAX PRACTICE (BÀI TẬP ĐIỀN CÚ PHÁP)
// ==========================================
function renderSyntaxExercises() {
  const container = document.getElementById('practiceListContainer');
  if (!container) return;

  let html = '';
  CPP_DATABASE.syntaxExercises.forEach((ex, idx) => {
    // Thay thế ___HOLE_X___ bằng các thẻ input
    let renderedCode = escapeHtml(ex.template);
    ex.holes.forEach(hole => {
      const inputHtml = `<input type="text" class="hole-input" data-exercise="${ex.id}" data-hole="${hole.id}" placeholder="${hole.placeholder}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">`;
      renderedCode = renderedCode.replace(`___${hole.id}___`, inputHtml);
    });

    html += `
      <div class="practice-card" id="card-${ex.id}">
        <div class="practice-title-bar">
          <h3>${ex.title}</h3>
          <span class="badge badge-difficulty">${ex.difficulty}</span>
        </div>
        <p class="practice-desc">${ex.description}</p>
        
        <div class="hole-code-box">${renderedCode}</div>

        <div class="practice-actions">
          <button class="btn-primary" onclick="checkExercise('${ex.id}')">Kiểm tra kết quả</button>
          <button class="btn-secondary" onclick="toggleExerciseHint('${ex.id}')">Xem giải thích & đáp án</button>
        </div>

        <div class="practice-feedback" id="feedback-${ex.id}"></div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function checkExercise(exId) {
  const exercise = CPP_DATABASE.syntaxExercises.find(e => e.id === exId);
  if (!exercise) return;

  let allCorrect = true;
  const feedbackEl = document.getElementById(`feedback-${exId}`);

  exercise.holes.forEach(hole => {
    const input = document.querySelector(`.hole-input[data-exercise="${exId}"][data-hole="${hole.id}"]`);
    if (!input) return;

    const userVal = input.value.trim();
    const expectedVal = hole.expected.trim();

    if (userVal === expectedVal) {
      input.classList.remove('incorrect');
      input.classList.add('correct');
    } else {
      input.classList.remove('correct');
      input.classList.add('incorrect');
      allCorrect = false;
    }
  });

  if (feedbackEl) {
    feedbackEl.className = `practice-feedback show ${allCorrect ? 'success' : 'error'}`;
    if (allCorrect) {
      feedbackEl.innerHTML = `<strong>🎉 Chính xác tuyệt vời!</strong> ${exercise.explanation}`;
    } else {
      feedbackEl.innerHTML = `<strong>⚠️ Có vị trí chưa chính xác.</strong> Hãy kiểm tra kỹ lại cú pháp hoặc bấm 'Xem giải thích & đáp án' để tham khảo.`;
    }
  }
}

function toggleExerciseHint(exId) {
  const exercise = CPP_DATABASE.syntaxExercises.find(e => e.id === exId);
  const feedbackEl = document.getElementById(`feedback-${exId}`);
  if (!exercise || !feedbackEl) return;

  const answers = exercise.holes.map(h => `<code>${escapeHtml(h.expected)}</code>`).join(' , ');
  feedbackEl.className = 'practice-feedback show success';
  feedbackEl.innerHTML = `
    <strong>🔑 Đáp án:</strong> ${answers}<br>
    <strong>💡 Giải thích:</strong> ${exercise.explanation}
  `;

  // Tự động điền đáp án vào các ô input
  exercise.holes.forEach(hole => {
    const input = document.querySelector(`.hole-input[data-exercise="${exId}"][data-hole="${hole.id}"]`);
    if (input) {
      input.value = hole.expected;
      input.classList.add('correct');
      input.classList.remove('incorrect');
    }
  });
}

// ==========================================
// RENDER QUIZZES (TRẮC NGHIỆM)
// ==========================================
function renderQuizzes() {
  const container = document.getElementById('quizListContainer');
  if (!container) return;

  let html = '';
  CPP_DATABASE.quizzes.forEach((q, idx) => {
    html += `
      <div class="quiz-card" id="quiz-card-${q.id}">
        <div class="quiz-question">Câu ${idx + 1}: ${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, optIdx) => `
            <label class="quiz-option-label" id="label-${q.id}-${optIdx}">
              <input type="radio" name="quiz-${q.id}" value="${optIdx}" onchange="checkQuizAnswer('${q.id}', ${optIdx})">
              <span>${escapeHtml(opt)}</span>
            </label>
          `).join('')}
        </div>
        <div class="practice-feedback" id="quiz-feedback-${q.id}"></div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function checkQuizAnswer(quizId, selectedIdx) {
  const quiz = CPP_DATABASE.quizzes.find(q => q.id === quizId);
  const feedback = document.getElementById(`quiz-feedback-${quizId}`);
  if (!quiz || !feedback) return;

  // Xóa style cũ
  quiz.options.forEach((_, idx) => {
    const label = document.getElementById(`label-${quizId}-${idx}`);
    if (label) {
      label.classList.remove('correct', 'wrong');
    }
  });

  const selectedLabel = document.getElementById(`label-${quizId}-${selectedIdx}`);
  const isCorrect = selectedIdx === quiz.correctIndex;

  if (isCorrect) {
    if (selectedLabel) selectedLabel.classList.add('correct');
    feedback.className = 'practice-feedback show success';
    feedback.innerHTML = `<strong>✓ Đúng rồi!</strong> ${quiz.explanation}`;
  } else {
    if (selectedLabel) selectedLabel.classList.add('wrong');
    const correctLabel = document.getElementById(`label-${quizId}-${quiz.correctIndex}`);
    if (correctLabel) correctLabel.classList.add('correct');

    feedback.className = 'practice-feedback show error';
    feedback.innerHTML = `<strong>✗ Chưa đúng!</strong> ${quiz.explanation}`;
  }
}

// ==========================================
// RENDER CHEAT SHEET
// ==========================================
function renderCheatSheet() {
  const container = document.getElementById('cheatsheetBody');
  if (!container) return;

  let html = '';
  CPP_DATABASE.cheatSheet.forEach(item => {
    html += `
      <tr>
        <td style="font-weight: 600; color: var(--accent-primary);">${item.category}</td>
        <td><code class="code-badge-old">${escapeHtml(item.oldSyntax)}</code></td>
        <td><code class="code-badge-modern">${escapeHtml(item.modernSyntax)}</code></td>
        <td style="font-size: 0.88rem; color: var(--text-secondary);">${item.notes}</td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

// ==========================================
// PLAYGROUND SIMULATOR
// ==========================================
const PLAYGROUND_SNIPPETS = {
  hello: {
    code: `#include <iostream>
#include <string>

int main() {
    std::string ten = "Hoc Vien C++";
    int namHienTai = 2026;

    std::cout << "Xin chao " << ten << "!\\n";
    std::cout << "Chao mung ban den voi the gioi Modern C++ (" << namHienTai << ").\\n";
    return 0;
}`,
    output: `Xin chao Hoc Vien C++!
Chao mung ban den voi the gioi Modern C++ (2026).
[Process exited with status 0 (Success)]`
  },
  ranges: {
    code: `#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Loc so chan va binh phuong bang C++20 Ranges pipeline |
    auto result = numbers 
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; });

    std::cout << "Ket qua loc so chan va binh phuong: ";
    for (int n : result) {
        std::cout << n << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
    output: `Ket qua loc so chan va binh phuong: 4 16 36 64 100 
[Process exited with status 0 (Success)]`
  },
  smartptr: {
    code: `#include <iostream>
#include <memory>

class SensorData {
public:
    SensorData() { std::cout << "[Khoi tao] Sensor ket noi thanh cong.\\n"; }
    ~SensorData() { std::cout << "[Huy] Sensor tu dong ngat ket noi & giai phong RAM!\\n"; }
    void readData() { std::cout << "Nhiet do hien tai: 28.5 do C\\n"; }
};

int main() {
    {
        std::cout << "--- Bat dau pham vi (scope) ---\\n";
        auto sensor = std::make_unique<SensorData>();
        sensor->readData();
        std::cout << "--- Chuan bi thoat scope ---\\n";
    }
    std::cout << "--- Da ra ngoai scope hoan toan ---\\n";
    return 0;
}`,
    output: `--- Bat dau pham vi (scope) ---
[Khoi tao] Sensor ket noi thanh cong.
Nhiet do hien tai: 28.5 do C
--- Chuan bi thoat scope ---
[Huy] Sensor tu dong ngat ket noi & giai phong RAM!
--- Da ra ngoai scope hoan toan ---
[Process exited with status 0 (Success)]`
  }
};

function initPlayground() {
  const select = document.getElementById('playgroundPreset');
  const textarea = document.getElementById('playgroundCode');
  const terminal = document.getElementById('playgroundTerminal');
  if (!select || !textarea || !terminal) return;

  textarea.value = PLAYGROUND_SNIPPETS.hello.code;
  terminal.textContent = "// Bấm 'Chạy mã (Run)' để mô phỏng kết quả biên dịch và thực thi...";

  select.addEventListener('change', (e) => {
    const key = e.target.value;
    if (PLAYGROUND_SNIPPETS[key]) {
      textarea.value = PLAYGROUND_SNIPPETS[key].code;
      terminal.textContent = "// Đã tải mẫu mã mới. Bấm 'Chạy mã' để xem kết quả.";
    }
  });
}

function runPlaygroundSimulator() {
  const select = document.getElementById('playgroundPreset');
  const terminal = document.getElementById('playgroundTerminal');
  if (!terminal) return;

  terminal.textContent = "Compiling with g++ -std=c++23 -O2 -Wall...\n";
  setTimeout(() => {
    const key = select ? select.value : 'hello';
    const output = (PLAYGROUND_SNIPPETS[key] && PLAYGROUND_SNIPPETS[key].output) 
      ? PLAYGROUND_SNIPPETS[key].output 
      : "[Process exited with status 0 (Simulated Execution Complete)]";
    terminal.textContent = `$ g++ -std=c++23 main.cpp -o main && ./main\n\n${output}`;
  }, 450);
}

// ==========================================
// TAB SWITCHING
// ==========================================
function switchTab(tabId) {
  state.currentTab = tabId;

  // Cập nhật nút tab
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Cập nhật pane
  document.querySelectorAll('.content-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const activePane = document.getElementById(`pane-${tabId}`);
  if (activePane) activePane.classList.add('active');

  // Điều chỉnh sidebar hiển thị theo tab
  const sidebar = document.querySelector('.app-sidebar');
  if (sidebar) {
    sidebar.style.display = (tabId === 'lessons') ? 'flex' : 'none';
  }
}

// ==========================================
// UTILITIES & EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // Theme button
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Tab buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderSidebar();
    });
  }
}

function copyCode(btn) {
  const codeBox = btn.closest('.code-wrapper')?.querySelector('code');
  if (codeBox) {
    navigator.clipboard.writeText(codeBox.textContent).then(() => {
      const originalText = btn.textContent;
      btn.textContent = '✓ Đã sao chép!';
      setTimeout(() => btn.textContent = originalText, 2000);
    });
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
