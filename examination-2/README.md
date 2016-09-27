## HTML to Jade

***
###OBS! OBS! OBS!
- Detta är en **obligatorisk** och **examinerande** uppgift som **du ska lösa helt på egen hand**.
- Du måste göra **regelbundna "commits" och "pushes"** av koden till ditt repositorium för uppgiften för att kursledningen ska kunna följa ditt arbetet med uppgiften.
- Du ska kunna förklara alla konstruktioner och satser som din lösning av uppgiften innehåller.

***


###Introduktion till uppgiften
Att arbeta med HTML är du säkert redan bekant med. Det finns olika så kallade ("html template engines")[https://en.wikipedia.org/wiki/Web_template_system] som används för att, helst på ett förenklat och mer dynamiskt sätt, skapa HTML-kod utifrån specifika mallar. Användningsfall för detta är t.ex. när man renderar ut HTML från en serverbaserad webbapplikation eller när man använder så kallade ["static site generators"](https://staticsitegenerators.net/).
Det finns en mängd [olika template-motorer](https://en.wikipedia.org/wiki/Comparison_of_web_template_engines) t.ex. Jade, handlebars och liquid.

Oftast skriver utvecklaren mallarna och sedan genereras HTML-kod utifrån dessa. I denna uppgift ska du dock gå andra hållet genom att läsa in
ett HTML-dokument, generera ett javascript-objekt som beskriver dokumentets uppbyggnad (detta steg är redan genomfört) och utifrån detta komplexa javascriptobjekt skapa en enkel [Jade-mall](http://jade-lang.com/). Hur mallen ska se ut definieras av de tester som medföljer.
Vi kommer skriva en enklare variant av Jade där vi inte tar hänsyn till t.ex. html-attribut. Denna förenklade version visas i exemplet nedan.


####Exempel på konvertering från HTML till Jade

Låt säga att vi har ett HTML-dokument enligt nedan:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Detta är en titel</title>
  </head>
  <body>
    <h1>Detta är en rubrik</h1>
    <div>
      <ul>
        <li>Hem</li>
        <li>Kontakt</li>
        <li>Kontakt</li>
        <li>Kontakt</li>
        <li>Kontakt</li>
      </ul>
    </div>
    <div>
      <p>Detta är ett stycke<span>Som innehåller ett element</span></p>
      <h1>Detta är en rubrik</h1>
      <p>
        Detta är ett stycke
        med
        många
        rader
      </p>
    </div>
  </body>
</html>
```

ett motsvarande Jade-dokument kan då se ut som följer
```
doctype html
html
    head
        title Detta är en titel
    body
        h1 Detta är en rubrik
        div
            ul
                li Hem
                li Kontakt
                li Kontakt
                li Kontakt
                li Kontakt
        div
            p Detta är ett stycke
                span Som innehåller ett element
            h1 Detta är en rubrik
            p.
                Detta är ett stycke
                med
                många
                rader
```

Följande syntaxregler kan vi se och ska vi ta fasta på i denna uppgift:

* Ett element skapas genom att skriva ut elementnamnet och placera det på rätt nivå (intabbning `\t`)
* Har ett element text i sig skrivs texten ut efter elementnamnet
* I de fall elementet är skrivet på ett indenterat sätt och har flera textrader (flera `\n`) ska elementnamnet följas av en punkt och
textraderna indenteras en nivå. (se p.)

Uppgiften går alltså ut på att TreeViews toString-metod ska returnera en motsvarande textsträng utifrån ett komplext javascript-objekt som skickas in som argument till metoden generateNodeObjects.


###Repositoriet
Det repositorie du får består av ett antal filer. Dels har vi såklart testfilerna, precis som vanligt.
Dock kanske vi inte testar all funktionalitet denna gång utan ger er viss frihet till er implementation.
Vi har också en fil, `app.js`, som fungerar som själva applikationsfilen. Den är fördefinerad och kommer anropa din kod och i slutändan skriva ut resultatet. Du kan använda den som en fil att testa/laborera i om du vill. `app.js` läser in html-filer från katalogen `html` och du kan själv lägga till egna html-filer om du vill eller använda de fördefinierade.

Studerar man koden i app.js så ser man att den skapar ett objekt av typen `TreeView` och skickar med ett javascriptobjekt ("det komplexa javascriptobjektet" se nedan) som argument till dess konstruktorn. Du ska sedan i konstruktorn för `TreeView` skicka detta vidare till en funktion (exempelvis döpt till `generateNodeObjects`). Metoden bör kunna anropas med två argument, dels det förberedda javascriptobjektet som Du ska arbeta vidare med i din kod och dels en level/nivå. Med "level" menas den nivå i dokumentstrukturen man befinner sig på.

```
<html>
    <head>
        <title>Titel</title>
```
I exemplet ovan är  html på nivå 0, head på nivå 1 och title på nivå 2. Som du ser motsvarar detta tabtecken i jade.

#### Mellansteget, ett komplext javascriptobjekt
Du kommer inte få ren text i form av HTML utan för att kunna hantera detta i vårt javascript så är uppgiften förenklad och du får tillgång till ett komplext javascriptobjekt som beskriver HTML-dokumentet och dess struktur. Det är det javascriptobjekt du bör skicka som argument när du instansierar ett objekt av typen TreeView och senare skickar vidare till `generateNodeObjects`.
Din uppgift blir att skapa metoden och där analysera detta objekt (debuggern är ett hett tips!).

Betrakta följande dump gjord med debuggern i webstorm:
![Beskrivning av det komplexa objektet](https://raw.githubusercontent.com/1dv021/examination-2/master/pic/complexobject.png)

1. Detta är grundobjektet som är det vi börjar arbeta med. Första nivån. *name* är en egenskap på objektet tillsammans exempelvis arrayen *children* och *type* (type syns inte i bilden). 
2. Arrayen children beskriver vilka noder som finns under den överliggande noden. I detta fall ser vi att *head* och *body* är barn till *html*.
3. *name* är tagnamnet på ett element.
4. *type* beskriver om elementet är en *tag* (html-tag) eller *text* (en textnod, se 6).
5. I detta fall är elementet av typen *text*. Observera att det då inte finns ett name-attribut och att texten ligger lagrad i attributet *data*. I just denna p-tag (se html-exemplet ovan) finns det många radbrytningar. Detta ska hanteras på ett speciellt sätt.

Detta skulle även, lite förenklat (många egenskaper vi inte kommer att använda är borttagna och ... markerar att här finns det saker som vi hoppat över av presentationstekniska skäl), kunna ses som ett objekt skrivet på formen:
```
var result = {
  name: "html",
  children: [
    {
      name: "head",
      children: [...],
      type: "tag"
    },
    {
      name: "body",
      children: [
        ...
        {
            name: "div",
            children: [
              ...
              {
                name: "p",
                children: [
                   {
                   data: "\n       Detta är ett stycke\n      med\n        många\n      rader\n ",
                   type: "text"
                   }
                ],
                type: "tag"
              }
            ],
            type: "tag"
        },
      ],
      type: "tag"
    }
  ],
  type: "tag"
}
```

Om du analyserar objektet så kommer du att finna att många html-element har textelement som enbart innehåller `\n  ` (radbrytning följt av en eller flera mellanslag). Detta beror på att html-dokumentet är skrivet på flera rader och att utvecklaren tryckt enter efter elementet och sedan använder mellanslag som indentering på nästa kodrad. I html-koden:
```
<head>
  <title>Titel</title>
```
Så finns det `\n` efter `<head>` följt av två mellanslag på nästa rad. Detta kommer att bli ett element i det komplexa javascriptobjektet, men vi vill inte skriva ut detta i vår Jade-representation. Därför måste vi filtrera bort dessa element när vi går igenom det komplexa javascriptobjektet. För att göra detta kan det vara bra att titta på funktionen [`trim()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim).

Din uppgift blir alltså främst att skriva koden i filerna node.js och treeview.js. Hur du väljer att strukturera upp det
är upp till dig men vissa saker kommer de tester som finns styra. I exemplet ovan har vi en stryktur som är 7 nivåer djup. I HTML kan vi dock göra oändligt djupa strukturer så för att lösa denna laborationsuppgift kommer du att behöva använda konstruktionen [rekursion](http://eloquentjavascript.net/03_functions.html#h_jxl1p970Fy).

####Node.js
I denna fil ska du skriva kod som ger möjlighet att skapa objekt av typen *Node*. Konstruktorn ska ta tre olika parametrar,
*name, level, text*. Name är namnet på elementet, level är på vilken nivå i dokumentet den befinner sig och text är
eventuell text elementet innehåller.

Objektet ska ha en metod *toString* som returnerar noden beskrivet som en textsträng i jade-format, med korrekt elementnamn,
rätt nivå(intabbning) och eventuell text.

####Treeview.js
Om Node representerar den enskilda noden i dokumentet så representerar TreeView själva dokumentet. Typen TreeViews uppgift
är att handha *en array innehållande objekt av typen Node* (sorterade i den ordning de förekommer i dokumentet). Dessa noder skapas via typen Node
och detta görs i metoden *generateNodeObjects* som tar ett objekt som beskriver HTML-sturkturen samt en nivå som argument och utifrån detta skapar Node-instanser.

Objektet ska också ha metoden *toString* som returnerar en sträng som representerar hela jadedokumentet tillskillnad från toString i Node som enbart representerade en node.

##tl;dr
Givet är ett objekt N som motsvarar en HTML-struktur. Objektet innehåller bland annat *name* (string), *type* (string) och en array *children* där varje element är av typen N. Skapa en sträng som motsvarar Jade-strukturen av detta objekt. Typen Node ska motsvara ett objekt N och TreeView ska ge outputen av samtliga (undantaget "tomma" `\n   `) N.
