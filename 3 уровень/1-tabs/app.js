'use strict';
const texts = {
    text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    text2: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.',
    text3: 'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил.'
};

/*
1. Получите ссылку на .text, например с помощью querySelector
2. Получите коллекцию, в которой хранятся все .nav-link, например с помощью querySelectorAll
2.1 Переберите полученную коллекцию, например с помощью forEach, и каждой ссылке назначьте
обработчик клика функцию clickHandler.
*/
let txt = document.querySelector('.text');
const navTexts = document.querySelectorAll('.nav-link');
navTexts.forEach((navL) => { navL.addEventListener('click', clickHandler) });
/**
* Обработчик клика по .nav-link
* @param {MouseEvent} event
*/
function clickHandler(event) {
    // здесь вызывайте changeText и changeActiveClass, и передавайте
    // им объект события.
    let elem = event.target;
    //alert('Работает');
    //console.log(elem);
    changeActiveClass(elem);
    changeText(elem);
}

/**
* Эта функция должна убирать .active у предыдущего .nav-link и ставить его
* на тот, по которому кликнули.
* @param {MouseEvent} event
*/
function changeActiveClass(elem) {
    let lastActiveElem = document.querySelector('.active');
    lastActiveElem.classList.remove('active');
    elem.classList.add('active');
    //console.log(elem.classList);
    //console.log(lastActiveElem.classList);
}

/**
* Эта фукнция должна читать текст (например через textContent) из
* .nav-link по которому кликнули и в зависимости от этого в .text
* ставить соответствующий текст из texts.
* @param {MouseEvent} event
*/
function changeText(elem) {
    let text = elem.textContent;
    //console.log(text);
    switch (text) {
        case 'Link 1':
            txt.textContent = texts.text1;
            //console.log(texts.text1);
            break;

        case 'Link 2':
            txt.textContent = texts.text2;
            //console.log(texts.text2);
            break;

        case 'Link 3':
            txt.textContent = texts.text3;
            //console.log(texts.text3);
            break;
    }
}