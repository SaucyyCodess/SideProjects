"use strict";
(() => {

function addItem(text, done) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('button');
  label.textContent = text;
  input.type = "checkbox";
  input.checked = done;
  input.id = `towatch${towatch.querySelectorAll('li').length + 1}`;
  button.addEventListener('click', ev => {
    item.remove();
    saveToStorage();
  })
  label.htmlFor = input.id;
  button.textContent = "x";
  input.addEventListener('input', ev =>{
    saveToStorage();
  });
  item.appendChild(input);
  item.appendChild(label);
  item.appendChild(button);
  towatch.appendChild(item);
}

function clearList() {
  while(towatch.firstChild) {
    towatch.removeChild(towatch.firstChild);
  }
}

clear.addEventListener('click', ev => {
  if(confirm("Are you sure you want to delete the entire list?")) {
  clearList();
  saveToStorage();
}
});

add.addEventListener('click', ev => {
  if(text.value) {
    addItem(text.value);
    text.value = null;
    text.focus();
    saveToStorage();
  }
});

text.addEventListener('keydown', ev => {
  if(ev.key == "Enter") {
    add.click();
  }
});

function saveToStorage() {
  const elements = Array.from(towatch.querySelectorAll('li'));
  const data = elements.map(el => {
    return {
  text: el.querySelector('label').textContent,
                    done: el.querySelector('input').checked
            }
  });
  localStorage.setItem(towatch.id, JSON.stringify(data));
}

function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem(towatch.id));
  if(data) {
    clearList();
    for (const item of data) {
              addItem(item.text, item.done);
    }
  }
}

loadFromStorage();
})()
