const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greetings = document.querySelector(".js-greetings"),
      todo_section=document.querySelector(".todo-section");

const USER_LS = "currentUser", //
  SHOWING_CN = "showing";
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greetings.classList.add(SHOWING_CN);
  todo_section.classList.add(SHOWING_CN);
  //   toDoForm.add(SHOWING_CN);
  const d = new Date();
  const h = d.getHours;
  let ment = "";
  if (h < 12) {
    ment = "좋은 아침입니다, ";
  } else if (h < 18) {
    ment = "즐거운 오후 되세요, ";
  } else {
    ment = "행복한 저녁 시간되세요, ";
  }

  greetings.innerHTML = `${ment} ${text}님`;
}
function handleSubmit(event) {
  //인수로 받는 event는 document까지 올라감
  event.preventDefault(); //submit event의 default는 텍스트를 없앰
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();
