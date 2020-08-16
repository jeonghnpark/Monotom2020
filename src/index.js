//console.log("console works");
//console.log(document)
//const title=document.getElementById("title");
//const title=document.querySelector("#title");
/* 관찰: document.querySelector("#title") 로 받는경우 
title.style.color가 잘 안먹히는 듯 */

const BASE_COLOR="rgb(52, 73, 94)";
const OHTER_COLOR="rgb(41, 128, 185)";

const CLICKED_CLASS="clicked";
const MOUSE_ENTER_CLASS="mouseentered";


//console.dir(document);
// title.innerHTML="innter HTML";
// title.style.color="red";

function init(){
    //title.style.color=BASE_COLOR;
}
init();

function handleClick(){
    const currentColor=title.style.color;
    console.log(currentColor);    
    if(currentColor===BASE_COLOR){
        title.style.color=OHTER_COLOR;
    }else{
        title.style.color=BASE_COLOR;
        // console.log("other color"+title.style.color);
    }
    // title.style.color="blue"; 
       
}
//title.addEventListener("click",handleClick);
/* 클릭하면서 브라우져의 검사>Elements에서 html소스가 
어떻게 바뀌는지 확인할것 */


/*잘못된 class 변경함수 */
function false_handleMouseEnter(){
    const currentClass=title.className;
    if(currentClass !==MOUSE_ENTER_CLASS){
        title.className=MOUSE_ENTER_CLASS; /* 이것의 문제는 기존 클래스 list를 없애버린다!! */
    }else{
        title.className="";
    }
    // title.style.color="blue";        
}

function without_toggle_handleMouseEnter(){
    const hasClass= title.classList.contains(MOUSE_ENTER_CLASS);
    if(hasClass){
        title.classList.remove(MOUSE_ENTER_CLASS);
    }else{
        title.classList.add(MOUSE_ENTER_CLASS); /*만약 기존 class="btn" 이라면 class="btn clicked" 로 바뀐다.*/
    }
}

// function handleMouseEnter(){
//     title.classList.toggle(MOUSE_ENTER_CLASS);
// }
// //마우스 올려놓기
// title.addEventListener("mouseenter", handleMouseEnter);



/* Java scripts DOM event MDN -> 이벤트 찾기 */
function handleOffline(){
    console.log("offline lalala ");
}
window.addEventListener("offline", handleOffline);
