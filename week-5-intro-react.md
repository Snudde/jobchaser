# Vecka 5 – React-grunder

## User stories

- Som användare vill jag kunna se en lista av jobb.
- Som användare vill jag se tydlig information om varje jobb (titel, företag, ort, typ av tjänst etc.).

## Teknikfokus

- Intro till React
- JSX
- Komponenter
- Props
- Listor

## Uppgift

1. Skapa ett nytt React-projekt (Typescript) för JobChaser med Vite.
2. Lägg till en statisk lista med jobb. Använd arrayen med objektdata i `data.ts`. SVG-ikoner finns under `/assets`
3. Skapa komponenter:
   - `JobList` som tar emot en lista av jobb via props och renderar dem.
   - `JobItem` som visar information om ett jobb.
4. Rendera listan av jobb i UI:
   - Använd `map` för att skapa en lista med `JobItem`-komponenter.
   - Använd semantiska HTML-element. För styling använder antingen global CSS (vanlig), CSS moduler eller Tailwind CSS
5. Implementera konditionell rendering:
   - Om listan är tom ska texten "Inga jobb" visas.

## Teori / reflektionsfrågor

Besvara kortfattat i denna fil eller i en separat `theory-week-5.md`:

- Hur och varför uppstod React?
  React skapades av Jordan Walke på Facebook (nu Meta) och släpptes som open source 2013. Det uppstod för att lösa problem med att bygga stora, komplexa användargränssnitt som ständigt förändras.

- Vad är JSX?
  JSX (JavaScript XML) är en syntaxutökning för JavaScript som låter dig skriva HTML-liknande kod direkt i din JavaScript:

- Vad är en komponent i React?
  En komponent är en återanvändbar byggsten för UI. Det är som en JavaScript-funktion som returnerar vad som ska visas på skärmen:

- Vad är props och hur används de?
  Props (properties) är data som skickas från en föräldrakomponent till en barnkomponent - som funktionsargument.

- Vad menas med "one-way data flow" i React?
  Data flödar alltid nedåt i komponentträdet - från förälder till barn via props.

- Vad är ett komponentträd? Rita ett och hur datan går genom komponenterna.

- Hur kan man använda konditionell rendering i React?
  Flera sätt att visa/dölja innehåll baserat på villkor: if-statements, ternary, Logical AND

- Vad menas med en återanvändbar komponent?
  En komponent som är flexibel nog att användas på flera ställen med olika data.

- Vad är React Fragment (</>)?
  Fragment låter dig gruppera element utan att lägga till extra DOM-noder.
