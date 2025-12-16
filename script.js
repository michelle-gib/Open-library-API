const $ = id => document.getElementById(id);
const escapeHtml = s => s.replace(/[&<>"']/g, m =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m]
);

/* =========================
  Startbutton
========================= */
$('guestBtn')?.addEventListener('click', () => {
  window.location.href = 'search.html';
});

/* =========================
  Buchsuche
========================= */
$('bookSearchForm')?.addEventListener('submit', async e => {
  e.preventDefault();

  const q = $('searchTerm').value.trim();
  const year = $('year').value;
  const msg = $('searchMessage');
  msg.textContent = '';

  if (!q) {
    msg.textContent = "Bitte Titel oder Autor eingeben.";
    return;
  }

  if (year && year > 2025) {
    msg.textContent = "Bitte Jahr bis maximal 2025 wehlen.";
    return;
  }

  let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`;
  ['genre','year','language'].forEach(id => {
    const v = $(id)?.value.trim();
    if (v) url += `&${id}=${encodeURIComponent(v)}`;
  });

  try {
    const res = await fetch(url);
    const data = await res.json();
    renderBooks(data.docs || []);
  } catch {
    msg.textContent = "Fehler bei der Buchsuche.";
  }
});

/* =========================
  Anzeige
========================= */
function renderBooks(docs){
  const container = $('results');
  const msg = $('searchMessage');

  container.innerHTML = '';

  if (!docs.length) {
    msg.textContent = "Keine Bücher für diese Suche gefunden.";
    return;
  }

  docs.slice(0,24).forEach(d => {
    const cover = d.cover_i
      ? `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`
      : 'https://via.placeholder.com/150x230?text=Kein+Cover';

    container.innerHTML += `
      <div class="book-card">
        <img src="${cover}">
        <h3>${escapeHtml(d.title || 'Kein Titel')}</h3>
        <p>${escapeHtml(d.author_name?.join(', ') || 'Unbekannt')}</p>
        <p>Jahr: ${d.first_publish_year || 'n/a'}</p>
        <a class="book-link" href="https://openlibrary.org${d.key}" target="_blank">
          Zur Bibliothek
        </a>
      </div>`;
  });
}

/* =========================
  Autocomplete
========================= */
const input = $('searchTerm');
const box = $('suggestions');

input?.addEventListener('input', async () => {
  const v = input.value.trim();
  if (v.length < 3) return box.innerHTML = '';

  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${v}&limit=8`);
    const data = await res.json();
    box.innerHTML = '';

    data.docs.slice(0,8).forEach(b => {
      const li = document.createElement('li');
      li.textContent = `${b.title} – ${b.author_name?.[0] || 'Unbekannt'}`;
      li.onclick = () => { input.value = b.title; box.innerHTML = ''; };
      box.appendChild(li);
    });
  } catch {}
});

/* =========================
  Genre Dropdown
========================= */
const genres = [
  "Fantasy","Science Fiction","Romance","Thriller","Horror",
  "History","Biography","Mystery","Poetry"
];

const genreSelect = $('genre');
genres.forEach(g => {
  const opt = document.createElement('option');
  opt.value = g;
  opt.textContent = g;
  genreSelect.appendChild(opt);
});

// =========================
// Erscheinungsjahr Dropdown
// =========================
const yearSelect = $('year');
if (yearSelect) {
  const currentYear = 2025;
  for (let y = currentYear; y >= 1600; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
}