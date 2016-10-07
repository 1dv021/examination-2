# <i class="fa fa-graduation-cap"></i> 2 - Massor att göra
<ul class="fa-ul fa-border exercise-info">
  <li><i class="fa-li fa fa-star-o"></i>Examinationsuppgift 2</li>
  <li><i class="fa-li fa fa-github"></i><a href="https://github.com/1dv021/examination-2.git">https://github.com/1dv021/examination-2.git</a></li>
</ul>

><i class="fa fa-warning"></i> __VIKTIGT!__ Innan du börjar arbeta med examinationsuppgiften är det viktigt att du lägger till examinationsuppgiftens repo till ditt repo för examinationsuppgiften. Se handledningen [Praktisk examinationsuppgift](https://coursepress.gitbooks.io/1dv021/content/examinationsuppgifter/om/praktisk-examinationsuppgift/) för mer information.

***
### <i class="fa fa-warning"></i> OBS! OBS! OBS!
- Detta är en **obligatorisk** och **examinerande** uppgift som **du ska lösa helt på egen hand**.
- Du måste göra **regelbundna "commits" och "pushes"** av koden till ditt repo för uppgiften för att kursledningen ska kunna följa ditt arbetet med uppgiften.
- Du ska kunna förklara alla konstruktioner och satser som din lösning av uppgiften innehåller.
***
## <i class="fa fa-flag-o"></i> Introduktion
I denna examinationsuppgift ska du slutföra ett knappt påbörjat projekt vars syfte att skapa förutsättningar att hjälpa dig komma ihåg saker, du ska mer konkret skriva kod för "att-göra"-listor.

## <i class="fa fa-flag-o"></i> Uppgift
Din uppgift är att implementera typerna `ToDoItem`och `ToDoList` enligt ställda krav.

><i class="fa fa-warning"></i> __OBS!__ Tänk igenom hur typerna hanterar medlemmar (egenskaper och metoder) för att undvika att objekts tillstånd förändras på ett icke önskvärt sätt (d.v.s. undvik t.ex. _"privacy leakish"_ beteenden).

### Typen ToDoItem

#### Konstruktor

Vid instansiering av objekt av typen `ToDoItem`ska det vara möjligt att skicka med en sträng som beskriver uppgiften, ett `Date`-objekt innehållande förfallodatumet samt eventuellt ett `Date`-objekt innehållande genomförandedatumet.

#### Egenskaper

| Egenskap | Typ | Beskrivning | Krav
| --- | --- | --- | --- |
| `text` | `string` | Sätter/ger texten på uppgiften. | 1 till 50 tecken. |
| `dueDate` | `Date` | Sätter/ger förfallodatumet för uppgiften. | `Date`-objekt med giltigt datum. |
| `finishedDate` | `Date`, `undefined` | Sätter/ger genomförandedatumet för uppgiften. | `Date`-objekt med giltigt datum eller `undefined`.   |
| `isDone` | `boolean` | Ger ett värde som indikerar om uppgiften är genomförd. | _"read-only"_ |
| `isOverdue` | `boolean` | Ger ett värde som indikerar om uppgiften är/blev försenad. | _"read-only"_ |

Samtliga egenskaper ska implementeras med hjälp av _"getters"_ och, vid behov, _"setters"_. Det ska bara gå att tilldela egenskaperna värden som är av respektive egenskaps angivna typ(er). Vid försök att tilldela en egenskap ett värde som inte är av angiven typ ska ett undantag av typen `TypeError` kastas. Uppfylls inte andra ställda krav ska ett undantag av typen `Error` kastas.

#### Metoder

| Egenskap | Returtyp | Beskrivning | Krav |
| --- | --- | --- | --- |
| `clone()` | `ToDoItem` | Skapar ett nytt objekt som är en kopia av aktuell instans. | Måste returnera en exakt kopia utan några som helst kopplingar till originalet. |
| `toJson()` | `string` | Konverterar aktuell instans till en JSON-sträng. | Uppgifts text, förfallodatum och i förekommande fall genomförandedatum. |
| `toString()` | `string` | Returnerar en sträng representerande aktuell instans. | Uppgift som är försenad ska inledas med `'* '`, annars med `'  '`, innan namnet på uppgiften och därpå följande datum separerade med mellanslag.|

Samtliga metoder ska vara kopplade till typens prototyp.

#### Exempel

```
// uppgift som inte genomförd och inte försenad
let toDoItem = new ToDoItem('köpa julklappar', new Date(2032, 11, 24));
console.log(toDoItem.toString()); // OUTPUT: '  köpa julklappar 2032-12-24'

// uppgift som är genomförd i tid
toDoItem.finishedDate = new Date(2032, 11, 20);
console.log(toDoItem.toString()); // OUTPUT: '  köpa julklappar 2032-12-24 2032-12-20'

// uppgift som är genomförd men försent
toDoItem.finishedDate = new Date(2032, 11, 25);
console.log(toDoItem.toString()); // OUTPUT: '* köpa julklappar 2032-12-24 2032-12-25'

// uppgift som inte är genomförd och som är försenad
toDoItem = new ToDoItem('åka till OS i Brasilien', new Date(2016, 7, 21));
console.log(toDoItem.toString()); // OUTPUT: '* åka till OS i Brasilien 2016-08-21'
```
><i class="fa fa-warning"></i> __OBS!__ Datumformatet kan variera beroende på hur din dator är konfigurerad.

### Typen ToDoList

#### Konstruktor

Vid instansiering av objekt av typen `ToDoList`ska det vara möjligt att skicka med en sträng med listans namn, en sträng med listans färg (standardvärde `'yellow'`), en array innehållande referenser till `ToDoItem`-objekt (standardvärde `[]`).

#### Egenskaper

| Egenskap | Typ | Beskrivning | Krav
| --- | --- | --- | --- |
| `name` | `string` | Sätter/ger namnet på listan. | 1 till 30 tecken. |
| `color` | `string` | Sätter/ger färgen på listan. | 1 till 20 tecken. |
| `toDoItems` | `ToDoItem[]` | Sätter/ger en array innehållande referenser till `ToDoItem`-objekt. | Måste vara en array, tom eller enbart innehållande  referenser till `ToDoItem`-objekt. Ska vara sorterad i på förfallodatum i stigande ordning. |
| `hasOverdue` | `boolean` | Ger ett värde som indikerar om listan innehåller en, eller flera, uppgifter som är/blev försenad(e). | _"read-only"_ |

Samtliga egenskaper ska implementeras med hjälp av _"getters"_ och, vid behov, _"setters"_. Det ska bara gå att tilldela egenskaperna värden som är av respektive egenskaps angivna typ(er). Vid försök att tilldela en egenskap ett värde som inte är av angiven typ ska ett undantag av typen `TypeError` kastas. Uppfylls inte andra ställda krav ska ett undantag av typen `Error` kastas.

#### Metoder

| Egenskap | Returtyp | Beskrivning | Krav |
| --- | --- | --- | --- |
| `add(toDoItem)` |  | Lägger till en ny uppgift till listan. | Uppgifterna måste vara sorterad på förfallodatum efter att den nya uppgiften lagts till. |
| `removeFinished()` |  | Tar bort alla uppgifter som är genomförda. |  |
| `clone()` | `ToDoList` | Skapar ett nytt objekt som är en kopia av aktuell instans. | Måste returnera en exakt kopia utan några som helst kopplingar till originalet. |
| `toJson()` | `string` | Konverterar aktuell instans till en JSON-sträng. | Uppgifts namn, färg och i förekommande fall uppgifter. |
| `toString()` | `string` | Returnerar en sträng representerande aktuell instans. | Listans namn, som ska inleda listan, ska avslutas med `' *'` om den innehåller uppgift som är försenad. Varje uppgift i listan ska sedan presenteras på enskilda rader.|

Samtliga metoder ska vara kopplade till typens prototyp.

#### Exempel

```
let toDoItems = [
  new ToDoItem('köpa julklappar', new Date(2032, 11, 24)),
  new ToDoItem('åka till OS i Stockholm', new Date(2026, 7, 3))
];

// lista utan förseningar
let list = new ToDoList('Viktigt!', 'yellow', toDoItems);
console.log(list.toString());
// OUTPUT:
// Viktigt!
//   åka till OS i Stockholm 2026-08-03
//   köpa julklappar 2032-12-24

// lista med försenad uppgift
list.add(new ToDoItem('nyårsfest', new Date(2015, 11, 31), new Date(2016, 2, 2)));
console.log(list.toString());
// OUTPUT:
// Viktigt! *
// * nyårsfest 2015-12-31 2016-03-02
//   åka till OS i Stockholm 2026-08-03
//   köpa julklappar 2032-12-24
```
><i class="fa fa-warning"></i> __OBS!__ Datumformatet kan variera beroende på hur din dator är konfigurerad.

## <i class="fa fa-lightbulb-o"></i> Tips
Genom att köra testerna som kommer med examinationsuppgiften kan du undersöka om koden du skrivit löst uppgiften (i alla fall enligt testerna, __som inte är heltäckande...__).

- [JSON.strinify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) och [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) kommer till användning i samband med konvertering till respektive tolkning av JSON-strängar.
- [Date.toLocalDateString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)  kan vara lämplig att använda för att få en textbeskrivning, som är beroende på din dators landsinställningar, av datumdelen av ett `Date`-objekt.
- [Array.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) kan användas då du vill ta bort ett element ur en array.
