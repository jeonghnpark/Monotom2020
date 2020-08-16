const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");
toDoList = document.querySelector(".js-toDoList");
doneTodoList = document.querySelector(".js-doneTodoList");

const TODOS_LS = "toDos";
const DONETODOS_LS = "doneTodos";

let toDos = [];
let doneTodos = [];

function filterFn(toDo) {
  return toDo.id === 1;
}

function deleteTodo(event) {
  //console.dir(event.target); //해당 object의 멤버를 다 볼수 있음
  //console.log(event.target.parentNode) //  삭제한 부모 노드
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  //local storage에서 삭제하기
  //filter는 해당 object를 돌아가면서 실행하되
  //true를 반납하는 요소만 리턴함.
  //여기서는 toDos를 필터링하여 cleanToDos로 리턴함
  const cleanToDos = toDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteDoneTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  doneTodoList.removeChild(li);
  const cleanDoneToDos = doneTodos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  doneTodos = cleanDoneToDos;
  saveDoneToDos();
}

function paintDoneTodos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  // const doneBtn = document.createElement("button");
  const newID = doneTodos.length + 1;

  delBtn.innerText = "❌"; //https://emojipedia.org/cross-mark/
  delBtn.addEventListener("click", deleteDoneTodo);
  // doneBtn.innerText = "✅";
  // doneBtn.addEventListener("click", doneTodo);
  span.innerText = text;
  li.appendChild(span);
  // li.appendChild(doneBtn);
  li.appendChild(delBtn);
  li.id = newID;
  doneTodoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newID,
  }; //; 빼먹지말것

  doneTodos.push(toDoObj);
  saveDoneToDos();
}

function doneTodo(event) {
  //   const btn = event.target;
  //   const li = btn.parentNode;
  //   toDoList.removeChild(li);
  //   doneTodoList.appendChild(li);
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span").innerText;
  deleteTodo(event);
  paintDoneTodos(text);
}

function saveToDos() {
  // localStorage.setItem(TODOS_LS, toDos);
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // local storage에는 string으로 저장된다. 또는 string으로변환할수 잇으면 하고.
}

function saveDoneToDos() {
  localStorage.setItem(DONETODOS_LS, JSON.stringify(doneTodos));
}

function paintTodos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const doneBtn = document.createElement("button");
  const newID = toDos.length + 1;

  delBtn.innerText = "❌"; //https://emojipedia.org/cross-mark/
  delBtn.addEventListener("click", deleteTodo);
  doneBtn.innerText = "✅";
  doneBtn.addEventListener("click", doneTodo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  li.id = newID;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newID,
  }; //; 빼먹지말것

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodos(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedDoneToDos = localStorage.getItem(DONETODOS_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDoObj) {
      paintTodos(toDoObj.text);
    });
  }

  if (loadedDoneToDos !== null) {
    const parsedDoneToDos = JSON.parse(loadedDoneToDos);
    parsedDoneToDos.forEach(function (obj) {
      paintDoneTodos(obj.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
