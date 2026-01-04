/* HILFSFUNKTIONEN */

// Kurzfunktion für document.getElementById
// Statt document.getElementById("id") → $("id")
const $ = id => document.getElementById(id);

// Schutz vor HTML-Code (verhindert XSS, z. B. bei Titeln aus der API)
const escapeHtml = s =>
  s.replace(/[&<>"']/g, m => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#039;'
  })[m]);

/* STARTSEITE – BUTTON „STARTE DIE SUCHE“ */

// Weiterleitung von der Startseite zur Suchseite
$('guestBtn')?.addEventListener('click', () => {
  window.location.href = 'search.html';
});

/* BUCHSUCHE */

$('bookSearchForm')?.addEventListener('submit', async e => {
  e.preventDefault(); // verhindert Neuladen der Seite

  // Eingaben auslesen
  const q = $('searchTerm').value.trim();
  const year = $('year').value;
  const msg = $('searchMessage');
  msg.textContent = ''; // alte Meldungen löschen

  // Pflichtfeld prüfen
  if (!q) {
    msg.textContent = "Bitte Titel oder Autor eingeben.";
    return;
  }

  // Jahres-Validierung
  if (year && year > 2025) {
    msg.textContent = "Bitte Jahr bis maximal 2025 wählen.";
    return;
  }

  // URL für Open Library
  let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`;

  // Optionale Filter anhängen
  ['genre','year','language'].forEach(id => {
    const v = $(id)?.value.trim();
    if (v) url += `&${id}=${encodeURIComponent(v)}`;
  });

  try {
    // API-Abfrage
    const res = await fetch(url);
    const data = await res.json();

    // Ergebnisse anzeigen
    renderBooks(data.docs || []);
  } catch {
    msg.textContent = "Fehler bei der Buchsuche.";
  }
});

/* ANZEIGE DER BUCHERGEBNISSE */

function renderBooks(docs) {
  const container = $('results');
  const msg = $('searchMessage');

  container.innerHTML = '';

  // Falls keine Treffer
  if (!docs.length) {
    msg.textContent = "Keine Bücher für diese Suche gefunden.";
    return;
  }

  // Maximal 50 Bücher anzeigen
  docs.slice(0, 50).forEach(d => {

    // Cover, Platzhalter
    const cover = d.cover_i
      ? `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`
      : 'https://via.placeholder.com/150x230?text=Kein+Cover';

    // Buchkarte erzeugen
    container.innerHTML += `
      <div class="book-card">

        <!-- Klickbares Cover + Titel -->
        <a href="https://openlibrary.org${d.key}" target="_blank">
          <img src="${cover}" alt="Buchcover">
          <h3>${escapeHtml(d.title || 'Kein Titel')}</h3>
        </a>

        <!-- Autor & Jahr -->
        <p>${escapeHtml(d.author_name?.join(', ') || 'Unbekannt')}</p>
        <p>Jahr: ${d.first_publish_year || 'n/a'}</p>

        <!-- Alternativer Text-Link -->
        <a class="book-link" href="https://openlibrary.org${d.key}" target="_blank">
          Zur Bibliothek
        </a>

      </div>`;
  });
}

/* LIVE-VORSCHLÄGE */

const input = $('searchTerm');
const box = $('suggestions');

input?.addEventListener('input', async () => {
  const v = input.value.trim();

  // Erst ab 2 Zeichen suchen
  if (v.length < 2) {
    box.innerHTML = '';
    return;
  }

  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(v)}&limit=8`
    );
    const data = await res.json();
    box.innerHTML = '';

    // Vorschläge anzeigen
    data.docs.slice(0, 5).forEach(b => {
      const li = document.createElement('li');
      li.textContent = `${b.title} – ${b.author_name?.[0] || 'Unbekannt'}`;

      // Klick auf Vorschlag → Titel übernehmen
      li.onclick = () => {
        input.value = b.title;
        box.innerHTML = '';
      };

      box.appendChild(li);
    });
  } catch {
    console.log("Autocomplete Fehler");
  }
});

/* GENRE-DROPDOWN */

// Feste Genre-Liste
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

/* RSCHEINUNGSJAHR-DROPDOWN */

// Dropdown mit klickbaren Jahren
const yearSelect = $('year');
if (yearSelect) {
  const currentYear = 2025;

  for (let y = currentYear; y >= 1800; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
}