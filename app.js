const cards = [{"label": "Quizzes", "value": "32", "delta": "+5"}, {"label": "Avg score", "value": "84%", "delta": "+6%"}, {"label": "Attempts", "value": "9.4K", "delta": "+28%"}, {"label": "Completion", "value": "71%", "delta": "+9%"}];
const rows = [{"title": "JavaScript fundamentals", "status": "Popular", "detail": "Most attempted quiz this month."}, {"title": "CSS layout", "status": "Improving", "detail": "Flexbox questions show strong progress."}, {"title": "Node APIs", "status": "Review", "detail": "Authentication questions need more practice."}, {"title": "React state", "status": "Advanced", "detail": "Scenario questions added for deeper review."}];
const insights = ["Short quizzes improve daily completion.", "Review mode targets weakest topics.", "Score trends show steady improvement after two attempts."];
const storageKey = 'vizvasanlya-quiz-app-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
