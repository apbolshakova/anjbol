function getDiag (a, b) {
    return Math.sqrt(a*a + b*b);
}

function getRad(D) {
    return D/2;
}

function getDiam(r) {
    return 2*r;
}

function getPerim(r) {
    return 2*Math.PI*r;
}

function getSquare(r) {
    return Math.PI*r*r;
}

function showParams() {
    let a = parseInt(prompt("Введите длину стороны a:", 0));
    let b = parseInt(prompt("Введите длину стороны b:", 0));
    if (isNaN(a) || isNaN(b)) {
        console.log("Обе стороны должны быть числом.");
        return;
    }
    let D = getDiag(a, b);
    let r = getRad(D);

    console.log("Для сторон " + a + " и " + b + ":"
        + "\nДиагональ: " + D
        + "\nРадиус: " + r
        + "\nДиаметр: " + getDiam(r)
        + "\nПериметр: " + getPerim(r)
        + "\nПлощадь: " + getSquare(r));
}

showParams();