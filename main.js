function goToEdit() {
  document.getElementById("edit").style.display = "block";
  document.getElementById("list").style.display = "none";
  initEdit();
}

function goToList() {
  document.getElementById("list").style.display = "block";
  document.getElementById("edit").style.display = "none";
  document.getElementById("add").style.display = "none";
  window.location.reload();
}

function goToAdd() {
  document.getElementById("add").style.display = "block";
  document.getElementById("list").style.display = "none";
  initEdit();
}

function init() {
  const buttonAdd = document.getElementById("go-add");
  buttonAdd.addEventListener("click", goToAdd);
  const buttonList = document.getElementById("go-from-edit-to-list");
  buttonList.addEventListener("click", goToList);
  const buttonList1 = document.getElementById("go-from-add-to-list");
  buttonList1.addEventListener("click", goToList);
  const buttonSave = document.getElementById("save");
  buttonSave.addEventListener("click", editSave);
  const buttonFavorites = document.getElementById("add-favorites");
  buttonFavorites.addEventListener("click", favorites);
  initList();
}

window.onload = init;

let editItem = {
  text: "",
  date: "",
};

let favoritesItem = {
  text: "",
  date: "",
};
// инициализация страницы редактирования
function initEdit() {
  const inputEdit = document.getElementById("edit-text");//инпут со страницы редактирования
  inputEdit.addEventListener("change", onChange);

  const input = document.getElementById("note-text");//инпут со страницы добавления заметок
  input.addEventListener("change", onChange);

  const saveButton = document.getElementById("add-button");
  saveButton.addEventListener("click", onSave);

  const buttonSave = document.getElementById("save");
  buttonSave.addEventListener("click", editSave);
}

// инициализация страницы списка
function initList() {
  // здесь нужно доставать список заметок из Localstorage и выводить их на экране списка (innerText или InnerHTML)
  const listContainer = document.getElementById("notes-list"); //контейнер ul список
  let noteHTML = "";
  let i = 1;
  for (let key in localStorage) {
    if (key.indexOf("note") === 0 && classFavorites.className == "add-favorites") {
      const note = JSON.parse(localStorage.getItem(key));
      const editButton = "<button class='edit' data-buttonkey="+0+" data-key="+key+"></button>";
      const deleteButton = "<button class='delete' data-buttonkey="+1+" data-key="+key+"></button>";
      const favoritesButton = "<button class='add-favorites' data-buttonkey="+2+" data-key="+key+"></button>";
       noteHTML += "<li>" + note.text + editButton + deleteButton + favoritesButton + "</li>";
    } else if (key.indexOf("favorites") === 0){
      const note = JSON.parse(localStorage.getItem(key));
      const editButton = "<button class='edit' data-buttonkey="+0+" data-key="+key+"></button>";
      const deleteButton = "<button class='delete' data-buttonkey="+1+" data-key="+key+"></button>";
      const favoritesButton = "<button class='favorites' data-buttonkey="+3+" data-key="+key+"></button>";
       noteHTML += "<li>" + note.text + editButton + deleteButton + favoritesButton + "</li>";
    }
  
    console.log(listContainer);
    
  }

  listContainer.innerHTML = noteHTML;
}
let $ul = document.querySelector('ul');
let editData;
$ul.addEventListener('click', function(e) {
  let y = e.target.dataset.buttonkey;
  console.log(y);
  if(y === '1') {
    localStorage.removeItem(e.target.dataset.key);
    window.location.reload();
  } else if(y === '2'){ 
    const noFavorites = JSON.parse(localStorage.getItem(e.target.dataset.key));
    favoritesItem.date = noFavorites.date;
    favoritesItem.text = noFavorites.text;
    localStorage.setItem("favorites" + favoritesItem.date, JSON.stringify(favoritesItem));
    localStorage.removeItem(e.target.dataset.key);
    window.location.reload();
  }else if(y === '3'){
    const favorites = JSON.parse(localStorage.getItem(e.target.dataset.key));
    editItem.date = favorites.date;
    editItem.text = favorites.text;
    localStorage.setItem("note" + editItem.date, JSON.stringify(editItem));
    localStorage.removeItem(e.target.dataset.key);
    window.location.reload();
  } else {
  goToEdit();
  const noteEdit = JSON.parse(localStorage.getItem(e.target.dataset.key));
  document.getElementById("edit-text").value = noteEdit.text;
  editData = noteEdit.date;}
})


function editSave() {
  editItem.date = editData;
  localStorage.setItem("note" + editData, JSON.stringify(editItem));
  goToList();
}

// обработчик ввода текста в инпут
function onChange(event) {
  const text = event.target.value;
  

  // записываем в объект editItem информацию из unput
  editItem.date = new Date().getTime();
  editItem.text = text;
}

// сохранение заметки
function onSave() {
  // для каждой записи можешь сделать свой ключ
  // либо можешь создать масив с заметками и записывать в Localstorage весь массив с одним ключем
  
  localStorage.setItem("note" + editItem.date, JSON.stringify(editItem));
  goToList();
  // после сохранения заметки нужно по хорошему перейти обратно к экрану списка
}

let classFavorites = document.getElementById("add-favorites");

function favorites(){
  if(classFavorites.className == "add-favorites") {
  document.getElementById("add-favorites").className = "favorites";
  initList()
  }else if(classFavorites.className == "favorites") {
  document.getElementById("add-favorites").className = "add-favorites";
  initList()
  }

}