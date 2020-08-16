const clockContainer = document.querySelector(".js-clock"); //.은 클래스를 의미
const clockTitle = clockContainer.querySelector("h1"); // querySelector멤버는 해당 객체의 자식 tag에서 검색

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // clockTitle.innerHTML=`${hours}:${minutes}:${seconds}`;
  // clockTitle.innerHTML=`${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`:seconds}`;
  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 500);
}

init();
