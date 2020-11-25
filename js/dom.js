let container = document.querySelector("#rand");

let latinQuote = [
    "Consuetudo est altera natura",
    "Nota bene",
    "Nulla calamitas sola",
    "Per aspera ad astra"
];

let translation = [
    "Привычка - вторая натура",
    "Заметьте хорошо!",
    "Беда не приходит одна",
    "Через тернии к звёздам"
];

let order = [];
for (i = 0; i < latinQuote.length; i++) {
    order[i] = i;
}
shuffle(order);

let curId = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function showNewQuote() {
    if (curId == latinQuote.length) {
        alert("Фразы закончились!");
        return;
    }
    else {
        let p = document.createElement("p");
        (curId % 2 == 0) ? p.classList.add("class2") : p.classList.add("class1");
        
        let id = document.createElement("span");
        id.classList.add("underlined");
        id.appendChild(document.createTextNode(`n=${curId}`));

        let quote = document.createElement("span");
        quote.classList.add("italic");
        quote.appendChild(document.createTextNode(`  "${latinQuote[order[curId]]}"  `));

        let trans = document.createElement("span");
        trans.appendChild(document.createTextNode(`"${translation[order[curId]]}"`));

        p.appendChild(id);
        p.appendChild(quote);
        p.appendChild(trans);
        container.appendChild(p);
        curId++;
    }
}

function changeEvenQuotes() {
    let evenQuotes = document.querySelectorAll("#rand .class1");
    evenQuotes.forEach(el => {
        el.classList.add("bold");
    });
}