document.getElementById("text").innerHTML = "Let's connect Js to html";
document.getElementById("time").innerHTML = "Date:" + Date();
const btn = document.getElementById("btn");
let c = 0;
let fs = 10;
btn.addEventListener("click",onclick);
function onclick()  {
const countEle = document.getElementById("count");
    c = c + 1;
    fs = fs + 1;
    countEle.innerHTML = c;
    countEle.style.fontsize = `${fs}px`;
    c % 2 == 0 ?
        countEle.style.color = "pink": countEle.style.color = "blue";
}

// const ele = getElementById("font");
// ele.addEventListener('click', onclick)
// let fs = 10;
// function onclick(){
//     fs = fs + 1;
//     ele.style.fontsize =
// }





   