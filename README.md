# Open Library BookFinder

## Projektbeschreibung

**Open Library BookFinder** ist eine webbasierte Suchanwendung, mit der Bücher gezielt über die **Open Library API** recherchiert werden können.  
Die Website ermöglicht es Nutzer:innen, Bücher anhand von Titel oder Autor zu finden und die Ergebnisse zusätzlich nach Genre, Erscheinungsjahr und Sprache zu filtern.

Das Projekt wurde als **Lern- und Praxisarbeit** im Rahmen der Ausbildung entwickelt und legt den Fokus auf:
- den strukturierten Einsatz einer externen REST-API,
- saubere Benutzerführung (UX),
- verständlichen, wartbaren Code
- sowie die korrekte Verarbeitung und Darstellung von externen Daten.

---

## Zweck & Nutzen der Website

Der **Hauptzweck** der Website besteht darin, eine **einfache, übersichtliche und schnelle Buchsuche** anzubieten, ohne dass sich Nutzer:innen registrieren oder anmelden müssen.

### Konkreter Nutzen:
- Schneller Zugriff auf Millionen von Büchern aus der Open Library
- Einfache Suche nach bekannten Titeln oder Autor:innen
- Unterstützung bei Recherche, Schule, Ausbildung oder privatem Interesse
- Nutzung einer offenen, frei zugänglichen Datenquelle
- Visuelle Unterstützung durch Buchcover
- Direkte Weiterleitung zur offiziellen Buchseite auf openlibrary.org

Die Anwendung eignet sich besonders für:
- Lernende
- Studierende
- Lehrpersonen
- Leser:innen
- Personen, die Bücher recherchieren oder entdecken möchten

---

## Funktionsumfang der Website

### Startseite
- Reduzierte, klare Einstiegsseite
- Ein Button **„Starte die Suche“**, der direkt zur Buchsuche führt
- Keine Benutzerkonten → einfache Veröffentlichung & Nutzung

### Buchsuche
Die Suchseite bietet folgende Funktionen:

- **Pflichtfeld:**
  - Suche nach *Titel oder Autor*

- **Optionale Filter:**
  - Genre (Dropdown)
  - Erscheinungsjahr (Dropdown, bis max. 2025)
  - Sprache (z. B. `eng`, `de`, `fr`)

- **Autocomplete-Funktion:**
  - Ab 3 eingegebenen Zeichen
  - Bis zu 8 Vorschläge aus der Open Library API
  - Erleichtert und beschleunigt die Suche

### Suchergebnisse
- Darstellung als übersichtliches Grid
- Pro Buch:
  - Coverbild
  - Titel
  - Autor(en)
  - Erscheinungsjahr
  - Link zur Buchseite bei Open Library
- Klick auf **Cover oder Link** öffnet die externe Buchseite
- Hover-Effekt auf Cover zur besseren Nutzerführung
- Fehlermeldungen direkt im Formular, falls:
  - keine Eingabe erfolgt
  - keine Treffer gefunden werden
  - ungültige Jahresangaben gemacht werden

---

## Verwendung der Open Library API

### Warum Open Library?
Die **Open Library** ist ein offenes, gemeinnütziges Projekt mit dem Ziel, eine Webseite für jedes jemals veröffentlichte Buch bereitzustellen.  
Die API ist frei zugänglich und eignet sich ideal für Lern- und Bildungsprojekte.

### Eingesetzte API-Endpunkte

#### 1. Buchsuche
```text
https://openlibrary.org/search.json?q=SUCHBEGRIFF

#### 2. Buchcover
```text
https://covers.openlibrary.org/b/id/COVER_ID-L.jpg