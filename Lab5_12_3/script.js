
// 1. Поміняйте місцями тексти, позначені «2» та «6».

function changeText(){
    const secondBlock = document.querySelector("#footer_text")
    const sixthBlock = document.querySelector("#secondBlock")
    const temp = sixthBlock.innerHTML
    sixthBlock.innerHTML = secondBlock.innerHTML
    secondBlock.innerHTML = temp
}

changeText()

// 2. Напишіть функцію, яка обчислює площу ромба,
// беручи необхідні значення із відповідних змінних у
// скрипті, і виводить отриманий результат в кінці
// контенту в блоці «5».

function findAreaOfRhombus(diagonal1, diagonal2){
    const block = document.querySelector("#fifth")
    const additionalBlock = document.createElement("p")
    additionalBlock.innerHTML = "Area of rhombus: " + `${0.5 * diagonal1 * diagonal2}`
    block.appendChild(additionalBlock)
}

findAreaOfRhombus(10, 10)

/*
3. Напишіть скрипт, який визначає мінімальне і
максимальне числа із 10 значень, беручи необхідні
значення із відповідної форми в блоці «5», а
отриманий результат виводить за допомогою
діалогового вікна і зберігає в cookies, причому:
а) при оновленні веб-сторінки в броузері
користувачу за допомогою діалогового вікна виводиться інформація,
збережена в cookies, із питанням про необхідність видалити дані із cookies, і не
виводиться згадана вище форма;
б) при підтвердженні питання відповідні cookies видаляються, і веб-сторінка
оновлюється з початковим станом із наявною формою для введення даних;
в) при відмові виводиться наступне діалогове вікно із інформуванням
користувача про наявність cookies і потребу перезавантажити веб-сторінку.
*/

function findMinAndMax(values){
    let min = values[0]
    let max = values[0]
    values.forEach((value) => {
        if(value > max){
            max = value
        }
        if(value < min) {
            min = value
        }
    })
    const oldElement = document.querySelector("#newElement")
    if(oldElement){
        document.querySelector("#fifth").removeChild(oldElement)
    }
    document.cookie = `max=${max};`
    document.cookie = `min=${min};`
    const newElement = document.createElement("p")
    newElement.id = "newElement"
    newElement.innerHTML = `${document.cookie}`
    document.querySelector("#fifth").appendChild(newElement)
}

document.addEventListener("DOMContentLoaded", e => {
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    console.log(document.cookie)
    if(getCookie("max") && getCookie("min")){
        if(confirm("Cookies: " + document.cookie + "\n Do you want to delete cookies? ")){
            document.cookie = "max=;"
            document.cookie = "min=;"
            console.log(document.cookie)
        } else {
            alert("Page needs to be reloaded")
            document.querySelector("#fifth").removeChild(document.querySelector("#minmax"))
        }
    }
})

document.querySelector("#minmax_button").addEventListener("click", e => {
    const stringValue = document.querySelector("#minmax_input").value
    let values = stringValue.split(" ").map(value => {return parseFloat(value)})
    console.log(values)
    findMinAndMax(values)
    e.preventDefault()
})

/*
4. Напишіть скрипт, який при настанні події blur змінює колір фону блоку «2» на
вказаний користувачем і зберігає відповідне значення кольору в localStorage
броузера так, щоб при наступному відкриванні веб-сторінки значення кольору
фону блоку «2» встановлювалось із збереженого значення в localStorage.
 */
new Array("#first", "#second", "#third", "#forth", "#fifth", "#sixth").forEach(element => {
    document.querySelector(element).addEventListener("focus", e => {
        console.log("Focus")
        e.target.style.borderColor = localStorage.getItem("color")
    })
    document.querySelector(element).addEventListener("blur", e => {
        console.log("Blur")
        e.target.style.borderColor = ''
    })
})

document.querySelector("#colors_button").addEventListener("click", e => {
    e.preventDefault()
    localStorage.setItem("color", document.querySelector("#colors_input").value)
})

/*
5. Напишіть скрипт додавання зображень в блок «1»:
а) необхідні елементи форми появляються у блоці «5» внаслідок виділення
тексту в блоці «у» одразу після наявного в блоці «5» контенту;
б) кількість зображень необмежена, використовуйте зображення з інтернету;
в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
зображення зберігаються в localStorage броузера (структуровано на ваш
розсуд), а саме зображення додається в кінці початкового вмісту блока «4»;
г) поруч розміщується кнопка, внаслідок натискання на яку всі нові зображення
видаляються із localStorage броузера і припиняється їхнє відображення у блоці
«1» без перезавантаження веб-сторінки.
 */
let counter = 0
document.querySelector("#y").addEventListener("dblclick", e => {
    console.log("Selected");
    e.preventDefault()
    if(!document.querySelector("#image_form")){
        const fifth = document.querySelector("#fifth");
        const div = document.createElement("div");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const button1 = document.createElement("button");
        button.innerHTML = "Click me!"
        button1.innerHTML = "Delete everything!"
        div.id = "image_form"
        input.id = "image_input"
        button.id = "image_button"
        button1.id = "image_delete"
        div.appendChild(input)
        div.appendChild(button)
        div.appendChild(button1)
        fifth.appendChild(div)

        button.addEventListener("click", e => {
            e.preventDefault()

            const values = input.value.split(";")
            const block = document.querySelector("#forth")
            values.forEach(value => {
                localStorage.setItem(`image${counter}`, value)
                let image = document.createElement("img")
                image.src = value
                image.style.height = "100px";
                block.appendChild(image)
                counter++;
            })
        })

        button1.addEventListener("click", e => {
            e.preventDefault()
            let counter1 = 0
            const block = document.querySelector("#forth")
            const images = block.querySelectorAll("img")
            images.forEach(image => block.removeChild(image))
            localStorage.clear();
            /*
            while(localStorage.getItem(`image${counter1}`)){
                localStorage.removeItem(`image${counter1}`)
                counter1++;
            }
            */
        })
    }
})

/*
document.querySelector("#second").

 */