const inaccuracy = 20; // максимальное отклонение между точками соединения в пикселях
let isCompleted = false;
const shapesNum = 5; // количество частей
const shapesDivs = []; // части
const joints = [ // соединение: 2 id частей, точки для сопоставления
    {
        firstId: 0,
        secondId: 1,
        firstJointPoint: {x: 2, y: 66},
        secondJointPoint: {x: 41, y: 177},
    },
    {
        firstId: 0,
        secondId: 2,
        firstJointPoint: {x: 2, y: 67},
        secondJointPoint: {x: 122, y: 3},
    },
    {
        firstId: 0,
        secondId: 3,
        firstJointPoint: {x: 143, y: 5},
        secondJointPoint: {x: 15, y: 15},
    },
    {
        firstId: 0,
        secondId: 4,
        firstJointPoint: {x: 45, y: 168},
        secondJointPoint: {x: 101, y: 0}
    },
];
const dragDropContainer = window.document.querySelector('#dragAndDrop');
initShapes();

function initShapes() {
    let shapeId = 0;

    function initNextShape() {
        const img = new Image();
        img.src = getImgSrc(shapeId);

        img.onload = function() {
            const shapeDiv = document.createElement("div");

            // генерация начальных абсолютных координат и поворота
            const pos = generatePos(this.width, this.height);

            // задание стилей
            //shapeDiv.style.height = this.height / 25 + 'em';
            //shapeDiv.style.width = this.width / 25 + 'em';
            shapeDiv.style.height = this.height + 'px';
            shapeDiv.style.width = this.width + 'px';
            shapeDiv.style.backgroundImage = 'url(' + img.src + ')';
            shapeDiv.style.backgroundSize = 'contain'
            shapeDiv.style.position = 'absolute';
            shapeDiv.style.left = pos.x + 'px';
            shapeDiv.style.top = pos.y + 'px';
            shapeDiv.style.transformOrigin = 'center center';
            shapeDiv.style.transform = 'rotate(' + 90 * pos.rotation + 'deg)';

            dragDropContainer.append(shapeDiv);

            // инициализация события сдвига
            shapeDiv.onmousedown = function(event) {

                shapeDiv.style.zIndex = 1000;

                function moveAt(pageX, pageY) {
                    shapeDiv.style.left = pageX - shapeDiv.offsetWidth / 2 - dragDropContainer.getBoundingClientRect().left + 'px';
                    shapeDiv.style.top = pageY - shapeDiv.offsetHeight / 2 - dragDropContainer.getBoundingClientRect().top + 'px';
                }

                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY);
                }

                document.addEventListener('mousemove', onMouseMove);

                document.onmouseup = function() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.onmouseup = null;

                    // после сдвига элемента проверяем, не собрала ли картинка
                    // если она собрана, то показываем анимацию и отключаем возможность двигать части
                    isCompleted = checkForCompletion();
                    console.log(isCompleted);
                    if (isCompleted) {
                        showAnimation();
                        disableMoving();
                    }
                };

                shapeDiv.ondragstart = function() {
                    return false;
                };
            };

            // инициализация поворота по двойному клику мышки
            shapeDiv.ondblclick = function (event) {
                const rotation = +shapeDiv.style.transform.match(/\d+/g)[0];
                shapeDiv.style.transform = 'rotate(' + (rotation + 90 === 360 ? '0' : rotation + 90) + 'deg)';
            }

            // добавления части в массив shapes и переход на обработку следующей
            shapesDivs[shapeId] = shapeDiv;
            shapeId++;
            if (shapeId < shapesNum) initNextShape();
        }
    }

    // запуск рекурсивной инициализации
    initNextShape();
}

function generatePos() {
    const pos = {};
    pos.x = randomInteger(50, dragDropContainer.clientWidth - 300);
    pos.y = randomInteger(100, dragDropContainer.clientHeight - 300);
    pos.rotation = randomInteger(0, 3);
    return pos;
}

function getImgSrc(id = null) {
    return 'img/drag-drop/shape' + id + '.png';
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function checkForCompletion() {
    for (let joint of joints) {
        // первый элемент не повёрнут
        if (shapesDivs[joint.firstId].style.transform !== 'rotate(0deg)') return false;
        // второй элемент не повёрнут
        if (shapesDivs[joint.secondId].style.transform !== 'rotate(0deg)') return false;
        // |первый_элемент.топ + первый_элемент.точка-соед.x - второй_элемент.топ + второй_элемент.точка-соед.x| < погрешность
        if (Math.abs((parseInt(shapesDivs[joint.firstId].style.top) + joint.firstJointPoint.y) - (parseInt(shapesDivs[joint.secondId].style.top) + joint.secondJointPoint.y)) > inaccuracy) return false;
        if (Math.abs((parseInt(shapesDivs[joint.firstId].style.left) + joint.firstJointPoint.x) - (parseInt(shapesDivs[joint.secondId].style.left) + joint.secondJointPoint.x)) > inaccuracy) return false;
    }
    return true;
}

function showAnimation() {
    alert('Вы собрали котю');
}

function disableMoving() {
    for (let shapeDiv of shapesDivs) {
        shapeDiv.onmousedown = false;
        shapeDiv.ondblclick = false;
    }
}
