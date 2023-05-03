import { v4 as uuidv4 } from "uuid";

import { formEl, containerEl } from "./refs/index.js";

import { onSaveData, onGetData, createArrayObj } from "./api/index.js";
import { createCard } from './markup'

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

formEl.addEventListener("submit", onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  // const { name, number, email } = e.target.elements;

  // const objectForm = {
  //     name: name.value,
  //     number: number.value,
  //     email: email.value,
  // }

  const objectForm = Object.fromEntries(new FormData(e.target));

    objectForm.id = uuidv4();

    objectForm.createdAt = Date.now();
    createArrayObj(objectForm);

const markup = createCard([objectForm]);
    addMarkup(markup);
    
  e.target.reset();
}

function addMarkup(markup) {
    containerEl.insertAdjacentHTML('beforeend', markup);
}
init();
 
function init() {
   const arrayObj =  onGetData();
    
    if (!arrayObj.length) {
        return;
    } 

    const markup = createCard(arrayObj);
    addMarkup(markup);
}

// 1. получить данные с локал сторадж 2. проверить данные на пустоту 3. если массив пустой - выходим из функции
// 4. если данные есть, то создаем размерку и добавляем данные в дом дерево

containerEl.addEventListener('click', onDeleteCard);

function onDeleteCard(e) {
    if (!e.target.classList.contains("btn-close")) {
        return;
    }

    const cardEl = e.target.closest('.js-wrap-card');
    cardEl.remove();
    const arrayObj = onGetData();

    const filterId = arrayObj.filter(({ id }) => {
        return id !== cardEl.dataset.cardid;
    });

    onSaveData(filterId);
}

containerEl.addEventListener("input", onChangeCard);

function onChangeCard(e) {
    const cardEl = e.target.closest(".js-wrap-card");

    const idCard = cardEl.dataset.cardid;
    const arrayObj = onGetData();
    
    const obj = arrayObj.find(({ id }) => {
        return id === idCard;
    });
    obj.name = e.target.textContent.trim();

    onSaveData(arrayObj);
}